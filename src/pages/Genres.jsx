import { ArrowLeft, ArrowUpRight, Check, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import { books } from "../data/books";

const genres = [
  "All",
  "Science Fiction",
  "Romance",
  "Magical Realism",
  "Historical Fiction",
  "Poetry",
];

function Genres() {
  const [activeGenre, setActiveGenre] = useState("All");

  const filteredBooks = useMemo(() => {
    if (activeGenre === "All") {
      return books;
    }

    return books.filter((book) => book.genre === activeGenre);
  }, [activeGenre]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="px-6 pb-24 pt-32 sm:px-10 sm:pb-32 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          {/* BACK TO EDITOR'S PICKS */}
          <Link
            to="/#editors-picks"
            className="group mb-16 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] sm:mb-20"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.3}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Editor's Picks
          </Link>

          {/* HEADER */}
          <div className="max-w-4xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
              The Library
            </span>

            <h1 className="mt-5 text-5xl font-light leading-[0.95] tracking-[-0.045em] sm:text-7xl md:text-8xl">
              Find your
              <br />
              <span className="italic">next world.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base">
              Five stories, five different worlds. Browse the collection,
              follow a feeling, and find something worth staying up late for.
            </p>
          </div>

          {/* FILTER HEADER */}
          <div className="mt-20 border-y border-[var(--foreground)]/10 py-5 sm:mt-28">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              {/* LABEL */}
              <div className="flex items-center gap-3">
                <Filter
                  size={14}
                  strokeWidth={1.3}
                  className="text-[var(--muted)]"
                />

                <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                  Filter collection
                </span>
              </div>

              {/* FILTERS */}
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => {
                  const isActive = activeGenre === genre;

                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => setActiveGenre(genre)}
                      className={`inline-flex items-center gap-2 border px-3 py-2 text-[9px] uppercase tracking-[0.18em] transition-all duration-300 ${
                        isActive
                          ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                          : "border-[var(--foreground)]/10 text-[var(--muted)] hover:border-[var(--foreground)]/30 hover:text-[var(--foreground)]"
                      }`}
                    >
                      {isActive && (
                        <Check
                          size={11}
                          strokeWidth={1.5}
                        />
                      )}

                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RESULTS HEADER */}
          <div className="mt-12 flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
              {activeGenre === "All" ? "All books" : activeGenre}
            </p>

            <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
              {filteredBooks.length}{" "}
              {filteredBooks.length === 1 ? "book" : "books"}
            </p>
          </div>

          {/* BOOK GRID */}
          <div className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book, index) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="group"
              >
                {/* COVER */}
                <div className="relative overflow-hidden bg-[var(--surface)]">
                  <img
                    src={book.cover}
                    alt={book.title}
                    draggable={false}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />

                  {/* HOVER OVERLAY */}
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                  {/* ARROW */}
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
                </div>

                {/* BOOK INFO */}
                <div className="mt-5 flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-xl font-light tracking-[-0.025em] transition-opacity duration-300 group-hover:opacity-60 sm:text-2xl">
                      {book.title}
                    </h2>

                    <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
                      {book.genre}
                    </p>

                    <p className="mt-3 max-w-sm text-xs font-light leading-relaxed text-[var(--muted)]">
                      {book.description}
                    </p>
                  </div>

                  <span className="mt-1 shrink-0 text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
                    Open
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredBooks.length === 0 && (
            <div className="border-y border-[var(--foreground)]/10 py-24 text-center">
              <p className="text-sm font-light text-[var(--muted)]">
                No books found in this collection yet.
              </p>

              <button
                type="button"
                onClick={() => setActiveGenre("All")}
                className="mt-5 text-[9px] uppercase tracking-[0.25em] underline underline-offset-4"
              >
                View all books
              </button>
            </div>
          )}

          {/* BOTTOM CTA */}
          <div className="mt-24 border-t border-[var(--foreground)]/10 pt-8 sm:mt-32">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                  Still deciding?
                </p>

                <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-[var(--muted)]">
                  Let your mood choose the story for you.
                </p>
              </div>

              <Link
                to="/"
                state={{ restoreMoods: true }}
                className="group inline-flex w-fit items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-[var(--foreground)]"
              >
                Explore by mood

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Genres;