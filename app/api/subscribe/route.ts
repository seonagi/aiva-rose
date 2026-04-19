import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/subscribe
 *
 * Accepts: { name?: string, email: string, source?: string }
 *
 * Current behaviour: validates email is present, logs the submission, and
 * returns { success: true }.
 *
 * TODO: Wire in Mailchimp or ConvertKit here.
 *
 * Mailchimp integration sketch:
 *   const res = await fetch(
 *     `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
 *     {
 *       method: "POST",
 *       headers: {
 *         Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
 *         "Content-Type": "application/json",
 *       },
 *       body: JSON.stringify({
 *         email_address: email,
 *         status: "subscribed",
 *         merge_fields: { FNAME: name },
 *         tags: [source].filter(Boolean),
 *       }),
 *     }
 *   );
 *
 * ConvertKit integration sketch:
 *   await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({
 *       api_key: process.env.CONVERTKIT_API_KEY,
 *       email,
 *       first_name: name,
 *       tags: [source],
 *     }),
 *   });
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { name, email, source } = body as {
      name?: unknown;
      email?: unknown;
      source?: unknown;
    };

    if (typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const submission = {
      name: typeof name === "string" ? name.trim() : "",
      email: email.trim().toLowerCase(),
      source: typeof source === "string" ? source : "unknown",
      receivedAt: new Date().toISOString(),
    };

    // For now: log. Swap this for Mailchimp/ConvertKit call (see header comment).
    console.log("[subscribe] new submission:", submission);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
