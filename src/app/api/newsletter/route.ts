import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let email = "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      email = body.email;
    } else {
      const formData = await req.formData();
      email = (formData.get("email") as string) || "";
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid official or personal email address is required." },
        { status: 400 }
      );
    }

    if (supabase) {
      const { error } = await supabase.from("newsletter_subscribers").insert([
        {
          email: email.toLowerCase().trim(),
          consent_given: true,
          status: "ACTIVE",
          subscribed_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase newsletter insert error:", error);
      }
    } else {
      console.log("Newsletter subscription recorded:", email);
    }

    // Redirect to home with query flag if submitted via standard HTML form
    return NextResponse.redirect(new URL("/?subscribed=true", req.url));
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
