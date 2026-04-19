import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-white/5 py-10 text-center text-sm text-parchment/50">
      <div className="mx-auto max-w-3xl px-6">
        <p className="font-serif text-lg tracking-wide text-gold">Aiva Rose</p>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/" className="hover:text-parchment transition-colors">
            Home
          </Link>
          <Link
            href="/bonus"
            className="hover:text-parchment transition-colors"
          >
            Bonus Scene
          </Link>
          <a
            href="mailto:hello@aiva-rose.com"
            className="hover:text-parchment transition-colors"
          >
            Contact
          </a>
        </nav>
        <p className="mt-6 text-xs">
          &copy; {year} Aiva Rose. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
