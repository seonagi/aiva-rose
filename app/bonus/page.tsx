import type { Metadata } from "next";
import Link from "next/link";
import SubscribeForm from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Your Free Bonus Scene",
  description:
    "A free bonus scene from Aiva Rose's Bound Hearts series — an extended moment told from Dante's point of view.",
};

export default function BonusPage() {
  return (
    <main className="min-h-screen bg-[#1a1625] text-parchment-warm">
      <div className="relative mx-auto max-w-2xl px-6 py-20 sm:py-28 animate-fade-in">
        {/* Masthead */}
        <div className="text-center">
          <Link
            href="/"
            className="font-serif text-sm tracking-[0.3em] uppercase text-gold hover:text-gold-soft transition-colors"
          >
            Aiva Rose
          </Link>
        </div>

        <div className="mx-auto mt-10 h-px w-16 bg-gold/50" />

        {/* Intimate intro */}
        <div className="mt-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold/80">
            A gift for you
          </p>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl text-parchment-warm leading-tight">
            Your Free Bonus Scene
          </h1>
          <p className="mt-6 font-serif text-xl italic text-parchment-warm/85">
            Thank you for reading the Bound Hearts series.
          </p>
        </div>

        {/* Body — warmer, letter-like */}
        <div className="mt-12 space-y-6 text-lg leading-relaxed text-parchment-warm/90">
          <p>
            As a thank you for reading, I have a free bonus scene for you — an
            extended moment from the series, told from{" "}
            <span className="text-gold">Dante&apos;s point of view</span>.
          </p>
          <p>
            Enter your details below and I&apos;ll send it straight to your
            inbox.
          </p>
        </div>

        {/* Form — lighter card inside the dark page */}
        <div className="mt-12 rounded-sm border border-gold/20 bg-parchment-warm/95 p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          <SubscribeForm
            source="bonus"
            variant="bonus"
            submitLabel="Send me the bonus scene"
            successMessage="Check your inbox — your bonus scene is on its way."
          />
        </div>

        {/* Fine print */}
        <p className="mt-8 text-center text-sm text-parchment-warm/55">
          I&apos;ll also let you know when new books are in the series. No spam,
          ever. Unsubscribe any time.
        </p>

        {/* Closing signature */}
        <div className="mt-16 text-center">
          <div className="mx-auto h-px w-16 bg-gold/40" />
          <p className="mt-6 font-serif italic text-gold">— Aiva</p>
        </div>
      </div>
    </main>
  );
}
