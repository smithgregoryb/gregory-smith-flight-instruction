import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, rating, comment } = await request.json();

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        name,
        rating,
        comment,
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
  "http://localhost:3000";
    const moderationEmail = process.env.MODERATION_EMAIL;

    await resend.emails.send({
      from: "Gregory Smith Flight Instruction <reviews@gregorysmithcfi.com>",
      to: moderationEmail!,
      subject: "New Student Review Awaiting Approval",
      html: `
        <h2>New Student Review</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Rating:</strong> ${rating}/5</p>
        <p><strong>Comment:</strong> ${comment}</p>

        <p>
          <a href="${siteUrl}/api/reviews/moderate?id=${data.id}&action=approve&secret=${process.env.MODERATION_SECRET}">
            APPROVE
          </a>
        </p>

        <p>
          <a href="${siteUrl}/api/reviews/moderate?id=${data.id}&action=deny&secret=${process.env.MODERATION_SECRET}">
            DENY
          </a>
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Review API error:", error);

    return NextResponse.json(
      { error: "Unable to submit review" },
      { status: 500 }
    );
  }
}