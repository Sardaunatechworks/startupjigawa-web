import { NextRequest, NextResponse } from "next/server";
import { getCmsPartners, saveCmsPartners } from "@/lib/cms-store";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const partners = await getCmsPartners();
    return NextResponse.json({ success: true, data: partners, partners });
  } catch (error) {
    console.error("GET partners error:", error);
    return NextResponse.json({ error: "Failed to fetch partners." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const partners = body.partners || body.data;
    if (!Array.isArray(partners)) {
      return NextResponse.json({ error: "Invalid partners data payload." }, { status: 400 });
    }

    await saveCmsPartners(partners);

    // Revalidate public routes in real time
    try {
      revalidatePath("/partners");
      revalidatePath("/");
      revalidatePath("/admin/partners");
    } catch (e) {
      console.warn("Revalidation warning:", e);
    }

    return NextResponse.json({ success: true, message: "Partners updated and synced in real time." });
  } catch (error) {
    console.error("POST partners error:", error);
    return NextResponse.json({ error: "Failed to save partners." }, { status: 500 });
  }
}
