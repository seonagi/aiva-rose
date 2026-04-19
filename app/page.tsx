import Link from "next/link";
import SubscribeForm from "@/components/SubscribeForm";
import Footer from "@/components/Footer";

interface Book {
  number: number;
  title: string;
  hook: string;
  amazonUrl: string;
}

const books: Book[] = [
  {
    number: 1,
    title: "Bound by Betrayal",
    hook: "She came to audit his empire. She didn't plan on becoming part of it.",
    amazonUrl: "#",
  },
  {
    number: 2,
    title: "Bound by Shadows",
    hook: "The contract said one year. Neither of them planned on more.",
    amazonUrl: "#",
  },
  {
    number: 3,
    title: "Bound by Secrets",
    hook: "Someone inside the family is a traitor. She's the only one he trusts to find them.",
    amazonUrl: "#",
  },
  {
    number: 4,
    title: "Bound by Blood",
    hook: "She has the map that could bring down a senator. And one secret that could bring down her marriage.",
    amazonUrl: "#",
  },
  {
    number: 5,
    title: "Bound by Forever",
    hook: "The life she chose was built for her. Now she has to decide what to do with that.",
    amazonUrl: "#",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-soft to-ink" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(201,169,110,1)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 sm:py-36 text-center animate-fade-in">
          <p className="text-xs uppercase tracking-[0.35em] text-gold/80">
            Author
          </p>
          <h1 className="mt-4 font-serif text-6xl sm:text-7xl md:text-8xl text-parchment">
            Aiva Rose
          </h1>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/60" />
          <p className="mt-8 font-serif text-xl sm:text-2xl italic text-parchment/85">
            Dark romance. Dangerous men. Women who are more dangerous still.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#bound-hearts"
              className="rounded-sm border border-gold/60 px-6 py-3 text-sm uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-ink transition"
            >
              The Series
            </Link>
            <Link
              href="#newsletter"
              className="rounded-sm bg-gold px-6 py-3 text-sm uppercase tracking-[0.2em] text-ink hover:bg-gold-soft transition"
            >
              Join the List
            </Link>
          </div>
        </div>
      </section>

      {/* Series */}
      <section id="bound-hearts" className="py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center animate-fade-in">
            <p className="text-xs uppercase tracking-[0.35em] text-gold/80">
              The Series
            </p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-parchment">
              Bound Hearts
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-parchment/70">
              A five-book dark mafia romance series. Read in order for the full
              arc — each book stands alone, but together they tell one story.
            </p>
            <div className="mx-auto mt-8 h-px w-16 bg-gold/40" />
          </div>

          <ol className="mt-16 space-y-10">
            {books.map((book) => (
              <li
                key={book.number}
                className="group grid grid-cols-[auto_1fr] gap-6 sm:gap-8 border-b border-white/5 pb-10 last:border-b-0 animate-fade-in-slow"
              >
                <div className="pt-1">
                  <span className="font-serif text-5xl sm:text-6xl text-gold/70 group-hover:text-gold transition-colors">
                    {String(book.number).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-parchment">
                    {book.title}
                  </h3>
                  <p className="mt-3 text-parchment/75 sm:text-lg italic font-serif">
                    {book.hook}
                  </p>
                  <a
                    href={book.amazonUrl}
                    className="mt-5 inline-flex items-center gap-2 rounded-sm border border-gold/50 px-5 py-2.5 text-sm uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-ink transition"
                  >
                    Get it on Amazon
                    <span aria-hidden>&rarr;</span>
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Author bio */}
      <section className="py-20 sm:py-24 bg-ink-soft/60">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold/80">
            About
          </p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-parchment">
            The Author
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
          <p className="mt-8 text-lg text-parchment/80 leading-relaxed">
            Aiva Rose writes dark romance about dangerous men and the women who
            are more dangerous still. Her characters are morally complicated,
            her love stories are hard-won, and her heroines never wait to be
            rescued.
          </p>
          <p className="mt-4 text-lg text-parchment/80 leading-relaxed">
            She lives in Europe and drinks too much coffee.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-24 sm:py-28">
        <div className="mx-auto max-w-xl px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gold/80">
              Newsletter
            </p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-parchment">
              Stay close to the story.
            </h2>
            <p className="mt-4 text-parchment/70">
              New releases, bonus scenes, and the occasional letter from behind
              the scenes. No spam, ever.
            </p>
          </div>

          <div className="mt-10">
            <SubscribeForm
              source="home"
              submitLabel="Join the list"
              successMessage="You're on the list. Welcome to the family."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
