import { useEffect, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

import { books } from "../data/books";
import { bookContent } from "../data/bookContent";

function ContinueReading() {
  const [readingBooks, setReadingBooks] = useState([]);

  useEffect(() => {
    const savedProgress = JSON.parse(
      localStorage.getItem("readingProgress") || "{}"
    );

    const activeBooks = Object.entries(savedProgress)
      .map(([id, progress]) => {
        const book = books.find((book) => book.id === id);
        const content = bookContent[id];

        if (!book || !content) return null;

        const totalChapters = content.chapters?.length || 1;

        const chapterIndex = progress.chapterIndex || 0;
        const chapterProgress = progress.chapterProgress || 0;

        const bookProgress =
          ((chapterIndex + chapterProgress / 100) / totalChapters) * 100;

        const hasStarted =
          chapterIndex > 0 ||
          chapterProgress > 2 ||
          progress.completedChapters?.length > 0;

        if (!hasStarted) return null;

        const safeProgress = Math.min(
          100,
          Math.max(0, Math.round(bookProgress))
        );

        const currentChapter =
          content.chapters?.[chapterIndex] ||
          content.chapters?.[content.chapters.length - 1];

        return {
          ...book,
          progress: safeProgress,
          chapterIndex,
          chapterTitle: currentChapter?.title || "Continue reading",
          updatedAt: progress.updatedAt || 0,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.updatedAt - a.updatedAt);

    setReadingBooks(activeBooks);
  }, []);

  if (!readingBooks.length) return null;

  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="flex flex-col gap-5 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Continue reading
            </p>

            <h2 className="max-w-xl text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl">
              Pick up where you left off.
            </h2>
          </div>

          <p className="text-sm text-[var(--muted)]">
            {readingBooks.length}{" "}
            {readingBooks.length === 1 ? "book" : "books"} in progress
          </p>
        </div>

        {/* Books */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {readingBooks.slice(0, 2).map((book) => (
            <Link
              key={book.id}
              to={`/read/${book.id}`}
              className="group flex flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors duration-300 hover:border-[var(--muted)] sm:flex-row sm:p-5"
            >
              {/* Cover */}
              <div className="w-full shrink-0 overflow-hidden rounded-xl sm:w-40">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="aspect-[2/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-xs text-[var(--muted)]">
                    <BookOpen size={14} strokeWidth={1.7} />
                    <span>{book.genre}</span>
                  </div>

                  <h3 className="text-2xl font-medium tracking-tight text-[var(--foreground)]">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {book.chapterTitle}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-[var(--muted)]">
                      {book.progress}% read
                    </span>

                    <span className="flex items-center gap-1.5 text-[var(--foreground)]">
                      Continue
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>

                  <div className="h-1 overflow-hidden rounded-full bg-[var(--border)]">
                    <div
                      className="h-full rounded-full bg-[var(--foreground)] transition-all duration-500"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContinueReading;