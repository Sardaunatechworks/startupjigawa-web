import { NextRequest, NextResponse } from "next/server";
import { getCmsInquiries, saveCmsInquiries } from "@/lib/cms-store";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const inquiries = await getCmsInquiries();
    return NextResponse.json({ success: true, data: inquiries, inquiries });
  } catch (error) {
    console.error("GET inquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!Array.isArray(body.inquiries)) {
      return NextResponse.json({ error: "Invalid inquiries data payload." }, { status: 400 });
    }

    await saveCmsInquiries(body.inquiries);

    try {
      revalidatePath("/admin/inquiries");
      revalidatePath("/admin/dashboard");
    } catch (e) {
      console.warn("Revalidation warning:", e);
    }

    return NextResponse.json({ success: true, message: "Inquiries updated." });
  } catch (error) {
    console.error("POST inquiries error:", error);
    return NextResponse.json({ error: "Failed to update inquiries." }, { status: 500 });
  }
}
