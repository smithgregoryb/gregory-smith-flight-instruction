import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const action = url.searchParams.get("action");
  const secret = url.searchParams.get("secret");

  const moderationSecret = process.env.MODERATION_SECRET;
  if (!moderationSecret || secret !== moderationSecret) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!id || !action || !["approve", "deny"].includes(action)) {
    return new NextResponse("Invalid moderation request", { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !serviceKey) {
    return new NextResponse("Review moderation is not configured", {
      status: 503,
    });
  }

  // Initialize only when a request arrives, not during the Next.js build.
  const supabase = createClient(supabaseUrl, serviceKey);
  const newStatus = action === "approve" ? "approved" : "denied";

  const { error } = await supabase
    .from("reviews")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) {
    console.error("Moderation error:", error);
    return new NextResponse("Unable to update review", { status: 500 });
  }

  return new NextResponse(
    action === "approve"
      ? "Review approved. It will now appear on the website."
      : "Review denied. It will not appear on the website."
  );
}
