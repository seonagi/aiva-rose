"use client";

import { useState, FormEvent } from "react";

type Variant = "default" | "bonus";

interface SubscribeFormProps {
  source: string;
  variant?: Variant;
  submitLabel?: string;
  successMessage?: string;
}

export default function SubscribeForm({
  source,
  variant = "default",
  submitLabel = "Join the list",
  successMessage = "You're on the list. Check your inbox.",
}: SubscribeFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName("");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  const isBonus = variant === "bonus";
  const inputClass = isBonus
    ? "w-full rounded-sm border border-gold/30 bg-parchment-warm/40 px-4 py-3 text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/60 transition"
    : "w-full rounded-sm border border-white/15 bg-ink-soft px-4 py-3 text-parchment placeholder:text-parchment/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/60 transition";

  const buttonClass = isBonus
    ? "w-full bg-ink text-parchment hover:bg-ink-soft"
    : "w-full bg-gold text-ink hover:bg-gold-soft";

  if (status === "success") {
    return (
      <div
        className={
          isBonus
            ? "rounded-sm border border-gold/40 bg-parchment-warm/60 p-6 text-center text-ink"
            : "rounded-sm border border-gold/40 bg-ink-soft p-6 text-center text-parchment"
        }
        role="status"
        aria-live="polite"
      >
        <p className="font-serif text-xl text-gold">Thank you.</p>
        <p className="mt-2 text-base">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor={`name-${source}`} className="sr-only">
          First name
        </label>
        <input
          id={`name-${source}`}
          type="text"
          autoComplete="given-name"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          required
        />
      </div>
      <div>
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className={`${buttonClass} rounded-sm px-6 py-3 font-medium tracking-wide transition disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {status === "loading" ? "Sending..." : submitLabel}
      </button>
      {status === "error" && (
        <p
          className={
            isBonus
              ? "text-sm text-red-700"
              : "text-sm text-red-300"
          }
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
