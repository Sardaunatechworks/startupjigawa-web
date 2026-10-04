import { NextRequest, NextResponse } from "next/server";
import { getCmsSettings, saveCmsSettings } from "@/lib/cms-store";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getCmsSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await saveCmsSettings(body);

    // Revalidate paths that display organizational details
    try {
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/contact");
      revalidatePath("/admin/settings");
    } catch (e) {
      console.warn("Revalidation warning:", e);
    }

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save settings" },
      { status: 500 }
    );
  }
}
