import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  Clock3,
  Languages,
  LibraryBig,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { books } from "../data/books";

function BookDetails() {
  const { id } = useParams();

  const book = books.find((book) => book.id === id);

  const [saved, setSaved] = useState(() => {
    const savedBooks = JSON.parse(
      localStorage.getItem("savedBooks") || "[]"
    );

    return savedBooks.includes(id);
  });

  const handleSave = () => {
    const savedBooks = JSON.parse(
      localStorage.getItem("savedBooks") || "[]"
    );

    if (saved) {
      const updatedBooks = savedBooks.filter((bookId) => bookId !== id);

      localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
      setSaved(false);
    } else {
      const updatedBooks = [...savedBooks, id];

      localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
      setSaved(true);
    }
  };

  if (!book) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-32 text-[var(--foreground)]">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-[var(--muted)]">
            We couldn't find that book.
          </p>

          <Link
            to="/"
            className="group mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Discover
          </Link>
        </div>
      </main>
    );
  }

  const relatedBooks = books
    .filter(
      (item) =>
        item.id !== book.id &&
        (item.genre === book.genre ||
          item.moods.some((mood) => book.moods.includes(mood)))
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}

      <section className="px-6 pb-28 pt-32 sm:px-10 sm:pb-36 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          {/* BACK */}

          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back to Discover
            </Link>
          </motion.div>

          {/* HERO CONTENT */}

          <div className="mt-16 grid items-center gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-28">
            {/* COVER */}

            <motion.div
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-8 rounded-full bg-[var(--foreground)]/[0.04] blur-3xl"
                />

                <motion.img
                  src={book.cover}
                  alt={book.title}
                  draggable={false}
                  whileHover={{
                    y: -10,
                    rotate: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 20,
                  }}
                  className="relative z-10 max-h-[650px] w-auto max-w-full object-cover shadow-[0_35px_80px_rgba(0,0,0,0.28)]"
                />
              </div>
            </motion.div>

            {/* DETAILS */}

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-3xl"
            >
              {/* CATEGORY */}

              <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                <span>{book.genre}</span>

                <span className="h-1 w-1 rounded-full bg-[var(--foreground)]/25" />

                <span>{book.year}</span>
              </div>

              {/* TITLE */}

              <h1 className="mt-6 max-w-3xl text-5xl font-light leading-[0.92] tracking-[-0.055em] sm:text-7xl md:text-8xl">
                {book.title}
              </h1>

              {/* AUTHOR */}

              <p className="mt-7 text-sm font-light text-[var(--muted)]">
                Written by{" "}
                <span className="text-[var(--foreground)]">
                  {book.author}
                </span>
              </p>

              {/* DESCRIPTION */}

              <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[var(--muted)] sm:text-lg">
                {book.description}
              </p>

              {/* MOODS */}

              <div className="mt-10">
                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[var(--muted)]">
                  Feels like
                </span>

                <div className="mt-4 flex flex-wrap gap-2">
                  {book.moods.map((mood) => (
                    <Link
                      key={mood}
                      to={`/mood/${mood}`}
                      className="border border-[var(--foreground)]/10 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-[var(--muted)] transition-all duration-300 hover:border-[var(--foreground)]/30 hover:text-[var(--foreground)]"
                    >
                      {mood}
                    </Link>
                  ))}
                </div>
              </div>

              {/* ACTIONS */}

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link
                  to={`/read/${book.id}`}
                  className="group inline-flex items-center gap-3 border border-[var(--foreground)] px-6 py-3 text-[9px] font-medium uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                >
                  <BookOpen size={14} strokeWidth={1.3} />

                  Start reading

                  <ArrowRight
                    size={13}
                    strokeWidth={1.3}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <button
                  type="button"
                  onClick={handleSave}
                  className="group inline-flex items-center gap-2 px-3 py-3 text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {saved ? (
                    <>
                      <Check size={14} strokeWidth={1.4} />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark
                        size={14}
                        strokeWidth={1.3}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5"
                      />
                      Save for later
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOOK INFORMATION */}

      <section className="px-6 pb-32 sm:px-10 sm:pb-40">
        <div className="mx-auto max-w-7xl">
          <div className="border-t border-[var(--foreground)]/10 pt-6">
            <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
              <span>Inside the book</span>
              <span>01</span>
            </div>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="max-w-sm text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                Some stories are meant to be{" "}
                <span className="italic text-[var(--muted)]">
                  felt.
                </span>
              </p>
            </div>

            <div className="max-w-2xl">
              <p className="text-base font-light leading-[1.9] text-[var(--muted)]">
                {book.about}
              </p>

              <p className="mt-6 text-base font-light leading-[1.9] text-[var(--muted)]">
                Find a quiet moment, turn the page, and let this story take
                you somewhere unexpected.
              </p>
            </div>
          </div>

          {/* METADATA */}

          <div className="mt-24 grid border-y border-[var(--foreground)]/10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-[var(--foreground)]/10 px-5 py-7 sm:border-r lg:border-b-0">
              <Clock3
                size={17}
                strokeWidth={1.2}
                className="text-[var(--muted)]"
              />

              <p className="mt-5 text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                Reading time
              </p>

              <p className="mt-2 text-sm font-light">
                {book.readingTime}
              </p>
            </div>

            <div className="border-b border-[var(--foreground)]/10 px-5 py-7 lg:border-b-0 lg:border-r">
              <LibraryBig
                size={17}
                strokeWidth={1.2}
                className="text-[var(--muted)]"
              />

              <p className="mt-5 text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                Length
              </p>

              <p className="mt-2 text-sm font-light">
                {book.pages} pages
              </p>
            </div>

            <div className="border-b border-[var(--foreground)]/10 px-5 py-7 sm:border-r lg:border-b-0">
              <Languages
                size={17}
                strokeWidth={1.2}
                className="text-[var(--muted)]"
              />

              <p className="mt-5 text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                Language
              </p>

              <p className="mt-2 text-sm font-light">
                {book.language}
              </p>
            </div>

            <div className="px-5 py-7">
              <Sparkles
                size={17}
                strokeWidth={1.2}
                className="text-[var(--muted)]"
              />

              <p className="mt-5 text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                Published
              </p>

              <p className="mt-2 text-sm font-light">
                {book.year}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY READ */}

      <section className="px-6 pb-32 sm:px-10 sm:pb-40">
        <div className="mx-auto max-w-7xl">
          <div className="border-t border-[var(--foreground)]/10 pt-6">
            <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
              <span>Why this one</span>
              <span>02</span>
            </div>
          </div>

          <div className="mt-16 grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <p className="max-w-md text-sm font-light leading-relaxed text-[var(--muted)]">
              Every book leaves a different kind of feeling behind. Here's
              what makes this one worth opening.
            </p>

            <div>
              {book.whyRead.map((reason, index) => (
                <motion.div
                  key={reason}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className="group flex items-start gap-6 border-b border-[var(--foreground)]/10 py-7 first:border-t"
                >
                  <span className="pt-1 text-[9px] text-[var(--muted)]">
                    0{index + 1}
                  </span>

                  <p className="text-xl font-light tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl">
                    {reason}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED BOOKS */}

      {relatedBooks.length > 0 && (
        <section className="px-6 pb-32 sm:px-10 sm:pb-40">
          <div className="mx-auto max-w-7xl">
            <div className="border-t border-[var(--foreground)]/10 pt-6">
              <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                <span>You might also like</span>
                <span>03</span>
              </div>
            </div>

            <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBooks.map((relatedBook, index) => (
                <motion.div
                  key={relatedBook.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                  }}
                >
                  <Link
                    to={`/book/${relatedBook.id}`}
                    className="group block"
                  >
                    <div className="overflow-hidden bg-[var(--foreground)]/[0.025]">
                      <motion.img
                        src={relatedBook.cover}
                        alt={relatedBook.title}
                        className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-5">
                      <div>
                        <p className="text-lg font-light tracking-[-0.02em]">
                          {relatedBook.title}
                        </p>

                        <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
                          {relatedBook.genre}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.2}
                        className="mt-1 text-[var(--muted)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}

      <section className="px-6 pb-32 sm:px-10 sm:pb-44">
        <div className="mx-auto max-w-7xl border-t border-[var(--foreground)]/10 pt-20">
          <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                Keep exploring
              </p>

              <h2 className="mt-5 max-w-xl text-4xl font-light leading-tight tracking-[-0.04em] sm:text-6xl">
                There are more stories waiting for you.
              </h2>
            </div>

            <Link
              to="/"
              className="group inline-flex w-fit items-center gap-3 border-b border-[var(--foreground)]/20 pb-2 text-[9px] font-medium uppercase tracking-[0.25em] transition-colors hover:border-[var(--foreground)]"
            >
              Discover more

              <ArrowRight
                size={13}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* AMBIENT DETAIL */}

      <div className="pointer-events-none fixed -bottom-40 left-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-x-1/2 rounded-full bg-[var(--foreground)]/[0.025] blur-[120px]" />
    </main>
  );
}

export default BookDetails;

