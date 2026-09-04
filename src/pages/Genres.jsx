import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { books } from "../data/books";

const genres = [
  {
    name: "Science Fiction",
    description:
      "Other worlds, distant galaxies, and impossible futures.",
  },
  {
    name: "Romance",
    description:
      "Love, longing, vulnerability, and everything between.",
  },
  {
    name: "Magical Realism",
    description:
      "Where ordinary life quietly bends into something strange.",
  },
  {
    name: "Historical Fiction",
    description:
      "Stories rooted in the past, reimagined through fiction.",
  },
  {
    name: "Poetry",
    description:
      "Quiet words, fragments, feelings, and midnight thoughts.",
  },
];

function Genres() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="px-6 pb-24 pt-32 sm:px-10 sm:pb-32 sm:pt-40">
        <div className="mx-auto max-w-6xl">

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
          <div className="max-w-3xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
              Browse by genre
            </span>

            <h1 className="mt-5 text-5xl font-light leading-[0.95] tracking-[-0.045em] sm:text-7xl md:text-8xl">
              Find your
              <br />
              <span className="italic">next world.</span>
            </h1>

            <p className="mt-7 max-w-lg text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base">
              Explore stories by the worlds they create, the feelings
              they hold, and the places they take you.
            </p>
          </div>

          {/* GENRES */}
          <div className="mt-24 border-t border-[var(--foreground)]/10">
            {genres.map((genre, index) => {
              const genreBooks = books.filter(
                (book) => book.genre === genre.name
              );

              return (
                <Link
                  key={genre.name}
                  to={`/genres/${encodeURIComponent(genre.name)}`}
                  className="group flex items-center justify-between gap-6 border-b border-[var(--foreground)]/10 py-8 transition-opacity duration-300 hover:opacity-60 sm:py-10"
                >
                  <div className="flex items-start gap-6 sm:gap-10">

                    {/* NUMBER */}
                    <span className="pt-2 text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* GENRE INFO */}
                    <div>
                      <h2 className="text-2xl font-light tracking-[-0.025em] sm:text-4xl">
                        {genre.name}
                      </h2>

                      <p className="mt-2 max-w-md text-xs font-light leading-relaxed text-[var(--muted)] sm:text-sm">
                        {genre.description}
                      </p>
                    </div>
                  </div>

                  {/* COUNT + ARROW */}
                  <div className="flex shrink-0 items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                    <span>
                      {genreBooks.length}{" "}
                      {genreBooks.length === 1 ? "book" : "books"}
                    </span>

                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.3}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>
    </main>
  );
}

export default Genres;