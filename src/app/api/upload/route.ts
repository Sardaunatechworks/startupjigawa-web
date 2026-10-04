import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json(
        { error: "No file was provided in the request." },
        { status: 400 }
      );
    }

    // Validate mime type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/gif",
    ];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Supported formats: JPG, PNG, WEBP, SVG, GIF." },
        { status: 400 }
      );
    }

    // Limit size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File exceeds 5MB size limit." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${Date.now()}_${sanitizedFileName}`;

    // 1. Try uploading to Supabase Storage if configured
    if (supabase) {
      try {
        const bucket = "startup-jigawa-assets";
        const storagePath = `${folder}/${uniqueFileName}`;

        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(storagePath, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!error && data) {
          const { data: publicData } = supabase.storage
            .from(bucket)
            .getPublicUrl(storagePath);

          return NextResponse.json({
            url: publicData.publicUrl,
            fileName: uniqueFileName,
            size: file.size,
            storage: "supabase",
          });
        }
      } catch (err) {
        console.warn("Supabase storage upload failed, saving to local public folder:", err);
      }
    }

    // 2. Local filesystem storage in /public/uploads/<folder>
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads", folder);
      await mkdir(uploadsDir, { recursive: true });

      const filePath = path.join(uploadsDir, uniqueFileName);
      await writeFile(filePath, buffer);

      const publicUrl = `/uploads/${folder}/${uniqueFileName}`;

      return NextResponse.json({
        url: publicUrl,
        fileName: uniqueFileName,
        size: file.size,
        storage: "local",
      });
    } catch (fsErr) {
      // Resilient fallback for serverless environments (e.g. Vercel) where /public is read-only
      console.warn("Read-only filesystem detected, serving uploaded image via base64 data URL:", fsErr);
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${file.type};base64,${base64}`;

      return NextResponse.json({
        url: dataUrl,
        fileName: uniqueFileName,
        size: file.size,
        storage: "base64",
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process image upload." },
      { status: 500 }
    );
  }
}
