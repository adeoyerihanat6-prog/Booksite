import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { books } from "../data/books";

function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const savedIds = JSON.parse(
      localStorage.getItem("savedBooks") || "[]"
    );

    const saved = books.filter((book) =>
      savedIds.includes(book.id)
    );

    setSavedBooks(saved);
  }, []);

  const removeBook = (id) => {
    const savedIds = JSON.parse(
      localStorage.getItem("savedBooks") || "[]"
    );

    const updatedIds = savedIds.filter(
      (bookId) => bookId !== id
    );

    localStorage.setItem(
      "savedBooks",
      JSON.stringify(updatedIds)
    );

    setSavedBooks((current) =>
      current.filter((book) => book.id !== id)
    );
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="px-6 pb-24 pt-32 sm:px-10 sm:pb-32 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          {/* BACK */}
          <Link
            to="/"
            className="group mb-16 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] sm:mb-20"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.3}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Discover
          </Link>

          {/* HEADER */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
              <Bookmark size={13} strokeWidth={1.3} />
              Your collection
            </div>

            <h1 className="mt-5 text-5xl font-light leading-[0.95] tracking-[-0.045em] sm:text-7xl md:text-8xl">
              Stories you
              <br />
              <span className="italic">want to remember.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base">
              Books you've saved for later, waiting whenever you're
              ready to return to them.
            </p>
          </div>

          {/* COUNT */}
          <div className="mt-20 border-y border-[var(--foreground)]/10 py-5 sm:mt-28">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                Saved books
              </span>

              <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                {savedBooks.length}{" "}
                {savedBooks.length === 1 ? "book" : "books"}
              </span>
            </div>
          </div>

          {/* EMPTY STATE */}
          {savedBooks.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center border-b border-[var(--foreground)]/10 text-center">
              <Bookmark
                size={28}
                strokeWidth={1}
                className="text-[var(--muted)]"
              />

              <h2 className="mt-7 text-2xl font-light tracking-[-0.025em]">
                Nothing saved yet.
              </h2>

              <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-[var(--muted)]">
                When a story catches your attention, save it here
                and come back whenever you're ready.
              </p>

              <Link
                to="/genres"
                className="group mt-8 inline-flex items-center gap-3 border-b border-[var(--foreground)]/20 pb-2 text-[9px] uppercase tracking-[0.25em] transition-colors hover:border-[var(--foreground)]"
              >
                Browse the library

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          ) : (
            /* SAVED BOOKS */
            <div className="grid gap-x-8 gap-y-16 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {savedBooks.map((book, index) => (
                <article key={book.id} className="group">
                  {/* COVER */}
                  <Link
                    to={`/book/${book.id}`}
                    className="relative block overflow-hidden bg-[var(--surface)]"
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      draggable={false}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />

                    {/* OPEN BUTTON */}
                    <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[var(--background)]/90 text-[var(--foreground)] opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.3}
                      />
                    </div>

                    {/* NUMBER */}
                    <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.25em] text-white/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>

                  {/* INFO */}
                  <div className="mt-5 flex items-start justify-between gap-5">
                    <Link
                      to={`/book/${book.id}`}
                      className="min-w-0"
                    >
                      <h2 className="text-xl font-light tracking-[-0.025em] transition-opacity duration-300 group-hover:opacity-60 sm:text-2xl">
                        {book.title}
                      </h2>

                      <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
                        {book.genre}
                      </p>

                      <p className="mt-3 max-w-sm text-xs font-light leading-relaxed text-[var(--muted)]">
                        {book.description}
                      </p>
                    </Link>

                    {/* REMOVE */}
                    <button
                      type="button"
                      onClick={() => removeBook(book.id)}
                      aria-label={`Remove ${book.title} from saved books`}
                      className="mt-1 shrink-0 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    >
                      <Trash2
                        size={15}
                        strokeWidth={1.2}
                      />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* BOTTOM CTA */}
          {savedBooks.length > 0 && (
            <div className="mt-24 border-t border-[var(--foreground)]/10 pt-8 sm:mt-32">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                    Keep exploring
                  </p>

                  <p className="mt-3 text-sm font-light text-[var(--muted)]">
                    There might be another story waiting for you.
                  </p>
                </div>

                <Link
                  to="/genres"
                  className="group inline-flex w-fit items-center gap-3 text-[9px] uppercase tracking-[0.25em]"
                >
                  Browse the library

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.3}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default SavedBooks;