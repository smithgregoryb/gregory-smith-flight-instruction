import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const replacements: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return replacements[character];
  });
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const moderationEmail = process.env.MODERATION_EMAIL;
  const moderationSecret = process.env.MODERATION_SECRET;

  // Never attempt a database write when review moderation cannot be notified.
  if (!supabaseUrl || !serviceKey || !resendKey || !moderationEmail || !moderationSecret) {
    return NextResponse.json(
      { error: "Review submissions are temporarily unavailable" },
      { status: 503 }
    );
  }

  try {
    const { name, rating, comment } = await request.json();

    if (
      typeof name !== "string" ||
      typeof comment !== "string" ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5 ||
      !name.trim() ||
      !comment.trim()
    ) {
      return NextResponse.json(
        { error: "Please enter a name, rating, and comment" },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const resend = new Resend(resendKey);
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        name: name.trim(),
        rating,
        comment: comment.trim(),
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    const siteUrl =
      process.env.SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://gregorysmithcfi.com";

    const reviewId = encodeURIComponent(String(data.id));
    const approveUrl = `${siteUrl}/api/reviews/moderate?id=${reviewId}&action=approve&secret=${encodeURIComponent(moderationSecret)}`;
    const denyUrl = `${siteUrl}/api/reviews/moderate?id=${reviewId}&action=deny&secret=${encodeURIComponent(moderationSecret)}`;

    const { error: emailError } = await resend.emails.send({
      from: "Gregory Smith Flight Instruction <reviews@gregorysmithcfi.com>",
      to: moderationEmail,
      subject: "New Student Review Awaiting Approval",
      html: `
        <h2>New Student Review</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Rating:</strong> ${rating}/5</p>
        <p><strong>Comment:</strong> ${escapeHtml(comment.trim())}</p>
        <p><a href="${approveUrl}">APPROVE</a></p>
        <p><a href="${denyUrl}">DENY</a></p>
      `,
    });

    if (emailError) {
      console.error("Review notification error:", emailError);
      return NextResponse.json(
        { error: "Review was saved but notification failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Review API error:", error);
    return NextResponse.json(
      { error: "Unable to submit review" },
      { status: 500 }
    );
  }
}
