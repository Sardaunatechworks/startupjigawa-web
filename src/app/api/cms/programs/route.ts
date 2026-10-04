import { NextRequest, NextResponse } from "next/server";
import { getCmsPrograms, saveCmsPrograms } from "@/lib/cms-store";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const programs = await getCmsPrograms();
    return NextResponse.json({ success: true, data: programs, programs });
  } catch (error) {
    console.error("GET programs error:", error);
    return NextResponse.json({ error: "Failed to fetch programs." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const programs = body.programs || body.data;
    if (!Array.isArray(programs)) {
      return NextResponse.json({ error: "Invalid programs data payload." }, { status: 400 });
    }

    await saveCmsPrograms(programs);

    // Revalidate public routes in real time
    try {
      revalidatePath("/programs");
      revalidatePath("/");
      revalidatePath("/admin/programs");
      revalidatePath("/admin/dashboard");
    } catch (e) {
      console.warn("Revalidation warning:", e);
    }

    return NextResponse.json({ success: true, message: "Programmes updated and synced in real time." });
  } catch (error) {
    console.error("POST programs error:", error);
    return NextResponse.json({ error: "Failed to save programs." }, { status: 500 });
  }
}
