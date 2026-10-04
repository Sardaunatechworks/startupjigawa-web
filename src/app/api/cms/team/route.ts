import { NextRequest, NextResponse } from "next/server";
import { getCmsTeam, saveCmsTeam } from "@/lib/cms-store";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const team = await getCmsTeam();
    return NextResponse.json({ success: true, data: team, team });
  } catch (error) {
    console.error("GET team error:", error);
    return NextResponse.json({ error: "Failed to fetch team members." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const team = body.team || body.data;
    if (!Array.isArray(team)) {
      return NextResponse.json({ error: "Invalid team data payload." }, { status: 400 });
    }

    await saveCmsTeam(team);

    // Revalidate public routes in real time
    try {
      revalidatePath("/about");
      revalidatePath("/");
      revalidatePath("/admin/team");
    } catch (e) {
      console.warn("Revalidation warning:", e);
    }

    return NextResponse.json({ success: true, message: "Team updated and synced in real time." });
  } catch (error) {
    console.error("POST team error:", error);
    return NextResponse.json({ error: "Failed to save team." }, { status: 500 });
  }
}
