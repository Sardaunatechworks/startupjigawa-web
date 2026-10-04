import { NextRequest, NextResponse } from "next/server";
import { getCmsOpportunities, saveCmsOpportunities } from "@/lib/cms-store";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const opportunities = await getCmsOpportunities();
    return NextResponse.json({ success: true, data: opportunities, opportunities });
  } catch (error) {
    console.error("GET opportunities error:", error);
    return NextResponse.json({ error: "Failed to fetch opportunities." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const opportunities = body.opportunities || body.data;
    if (!Array.isArray(opportunities)) {
      return NextResponse.json({ error: "Invalid opportunities data payload." }, { status: 400 });
    }

    await saveCmsOpportunities(opportunities);

    // Revalidate public routes in real time
    try {
      revalidatePath("/opportunities");
      revalidatePath("/");
      revalidatePath("/admin/opportunities");
    } catch (e) {
      console.warn("Revalidation warning:", e);
    }

    return NextResponse.json({ success: true, message: "Opportunities updated and synced in real time." });
  } catch (error) {
    console.error("POST opportunities error:", error);
    return NextResponse.json({ error: "Failed to save opportunities." }, { status: 500 });
  }
}
