import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, organization, subject, message, type } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Save into CMS store for real-time admin sync
    const { addCmsInquiry } = await import("@/lib/cms-store");
    const { revalidatePath } = await import("next/cache");

    await addCmsInquiry({
      id: `inq-${Date.now()}`,
      sender: name,
      org: organization || undefined,
      email,
      phone: phone || undefined,
      type: type || "GENERAL",
      subject: subject || "Website Enquiry",
      message,
      date: new Date().toLocaleDateString("en-NG", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "NEW",
    });

    try {
      revalidatePath("/admin/dashboard");
      revalidatePath("/admin/inquiries");
    } catch (e) {
      console.warn("Revalidation warning:", e);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
