import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { books } from "../data/books";

function GenreResults() {
  const { genreName } = useParams();

  const decodedGenre = decodeURIComponent(genreName);

  const matchingBooks = books.filter(
    (book) => book.genre === decodedGenre
  );

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="px-6 pb-20 pt-32 sm:px-10 sm:pb-28 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/genre"
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Genres
          </Link>

          <div className="mt-16 max-w-3xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
              Genre
            </span>

            <h1 className="mt-5 text-5xl font-light leading-[0.95] tracking-[-0.045em] sm:text-7xl md:text-8xl">
              {decodedGenre}
            </h1>

            <p className="mt-7 max-w-lg text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base">
              Stories collected from the {decodedGenre.toLowerCase()}
              corner of the library.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32 sm:px-10 sm:pb-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between border-b border-[var(--foreground)]/10 pb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Books in this genre
            </span>

            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
              {matchingBooks.length}{" "}
              {matchingBooks.length === 1 ? "book" : "books"}
            </span>
          </div>

          {matchingBooks.length > 0 ? (
            <div className="grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
              {matchingBooks.map((book) => (
                <article
                  key={book.id}
                  className="group"
                >
                  <Link
                    to={`/book/${book.id}`}
                    className="relative block overflow-hidden bg-[var(--foreground)]/[0.03]"
                  >
                    <div className="flex aspect-[3/4] items-center justify-center p-10">
                      <img
                        src={book.cover}
                        alt={book.title}
                        draggable={false}
                        className="h-full w-auto max-w-full object-cover shadow-[0_25px_50px_rgba(0,0,0,0.2)] transition-transform duration-700 ease-out group-hover:-rotate-1 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--foreground)]/10 bg-[var(--background)]/70 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.3}
                      />
                    </div>
                  </Link>

                  <div className="mt-6">
                    <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                      <span>{book.genre}</span>

                      <span className="h-1 w-1 rounded-full bg-[var(--foreground)]/25" />

                      <span>{book.author}</span>
                    </div>

                    <h2 className="mt-3 text-2xl font-light tracking-[-0.025em]">
                      {book.title}
                    </h2>

                    <p className="mt-2 max-w-sm text-xs font-light leading-relaxed text-[var(--muted)]">
                      {book.description}
                    </p>

                    <Link
                      to={`/book/${book.id}`}
                      className="group/link mt-5 inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.28em]"
                    >
                      Explore book

                      <ArrowUpRight
                        size={12}
                        strokeWidth={1.3}
                        className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border-t border-[var(--foreground)]/10 py-20">
              <p className="text-sm font-light text-[var(--muted)]">
                We&apos;re still gathering stories for this genre.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default GenreResults;