import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function addToKit(
  email: string,
  firstName: string,
  source: string
): Promise<void> {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  const sequenceId = process.env.KIT_SEQUENCE_ID;

  if (!apiKey) {
    console.warn("[subscribe] KIT_API_KEY not set — skipping Kit integration");
    return;
  }

  // Kit API keys use X-Kit-Api-Key header (not Bearer token)
  const headers = {
    "X-Kit-Api-Key": apiKey,
    "Content-Type": "application/json",
  };

  // Step 1: Create/update subscriber with name and source field
  const subRes = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers,
    body: JSON.stringify({
      email_address: email,
      first_name: firstName || undefined,
      fields: source ? { source } : undefined,
    }),
  });
  if (!subRes.ok) {
    const body = await subRes.text();
    throw new Error(`Kit subscriber create failed ${subRes.status}: ${body}`);
  }

  // Step 2: Add to form (records signup source)
  if (formId) {
    const formRes = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email_address: email }),
    });
    if (!formRes.ok) {
      const body = await formRes.text();
      console.warn(`Kit form subscribe failed ${formRes.status}: ${body}`);
    }
  }

  // Step 3: Enroll in welcome sequence — delivers the bonus scene email
  if (sequenceId) {
    const seqRes = await fetch(`https://api.kit.com/v4/sequences/${sequenceId}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email_address: email }),
    });
    if (!seqRes.ok) {
      const body = await seqRes.text();
      throw new Error(`Kit sequence enroll failed ${seqRes.status}: ${body}`);
    }
  }

  console.log(`[subscribe] added to Kit: ${email}`);
}

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

    console.log("[subscribe] new submission:", submission);

    try {
      await addToKit(submission.email, submission.name, submission.source);
    } catch (kitErr) {
      // Don't fail the user-facing request if Kit is having a bad day
      console.error("[subscribe] Kit error (non-fatal):", kitErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
