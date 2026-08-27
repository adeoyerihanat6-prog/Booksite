import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { motion } from "framer-motion";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { books } from "../data/books";

const moodDetails = {
  dreamy: {
    title: "Dreamy & Ethereal",
    description:
      "For when you want to disappear somewhere beautiful.",
  },

  strange: {
    title: "Strange & Wonderful",
    description:
      "For stories that make the impossible feel ordinary.",
  },

  hopeful: {
    title: "Quietly Hopeful",
    description:
      "For when you need a little light in the distance.",
  },

  emotional: {
    title: "Deeply Human",
    description:
      "For stories that stay with you long after the last page.",
  },

  nostalgic: {
    title: "Nostalgic & Tender",
    description:
      "For memories, old places, and things worth carrying home.",
  },
};

function MoodResults() {
  const { mood } = useParams();
  const navigate = useNavigate();

  const currentMood = moodDetails[mood];

  const matchingBooks = books.filter((book) =>
    book.moods.includes(mood)
  );

  const handleBack = () => {
    navigate("/", {
      state: {
        restoreMoods: true,
      },
    });
  };

  if (!currentMood) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-32 text-[var(--foreground)]">
        <div className="mx-auto max-w-6xl">

          <p className="text-sm text-[var(--muted)]">
            We couldn't find that mood.
          </p>

          <button
            type="button"
            onClick={handleBack}
            className="mt-6 inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.4}
            />

            Back to Discover
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* HEADER */}
      <section className="px-6 pb-20 pt-32 sm:px-10 sm:pb-28 sm:pt-40">
        <div className="mx-auto max-w-6xl">

          {/* BACK */}
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Discover
          </button>

          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-16 max-w-3xl"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
              Reading by feeling
            </span>

            <h1 className="mt-5 text-5xl font-light leading-[0.95] tracking-[-0.045em] sm:text-7xl md:text-8xl">
              {currentMood.title}
            </h1>

            <p className="mt-7 max-w-lg text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base">
              {currentMood.description}
            </p>
          </motion.div>

        </div>
      </section>

      {/* BOOKS */}
      <section className="px-6 pb-32 sm:px-10 sm:pb-40">
        <div className="mx-auto max-w-6xl">

          {/* SECTION LABEL */}
          <div className="mb-10 flex items-end justify-between border-b border-[var(--foreground)]/10 pb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Stories waiting for you
            </span>

            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
              {matchingBooks.length}{" "}
              {matchingBooks.length === 1 ? "book" : "books"}
            </span>
          </div>

          {/* BOOK GRID */}
          {matchingBooks.length > 0 ? (
            <div className="grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">

              {matchingBooks.map((book, index) => (
                <motion.article
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group"
                >

                  {/* COVER */}
                  <a
                    href={`/book/${book.id}`}
                    className="relative block overflow-hidden bg-[var(--foreground)]/[0.03]"
                  >
                    <div className="flex aspect-[3/4] items-center justify-center p-10">

                      <motion.img
                        whileHover={{
                          y: -8,
                          rotate: 1,
                          scale: 1.025,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 20,
                        }}
                        src={book.cover}
                        alt={book.title}
                        draggable={false}
                        className="h-full w-auto max-w-full object-cover shadow-[0_25px_50px_rgba(0,0,0,0.2)]"
                      />

                    </div>

                    <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--foreground)]/10 bg-[var(--background)]/70 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.3}
                      />
                    </div>
                  </a>

                  {/* BOOK INFO */}
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

                    {/* EXPLORE */}
                    <a
                      href={`/book/${book.id}`}
                      className="group/link mt-5 inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.28em]"
                    >
                      Explore book

                      <ArrowUpRight
                        size={12}
                        strokeWidth={1.3}
                        className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </a>

                  </div>

                </motion.article>
              ))}

            </div>
          ) : (
            /* EMPTY STATE */
            <div className="border-t border-[var(--foreground)]/10 py-20">
              <p className="text-sm font-light text-[var(--muted)]">
                We're still gathering stories for this feeling.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* AMBIENT DETAIL */}
      <div className="pointer-events-none fixed -bottom-40 left-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--foreground)]/[0.025] blur-[120px]" />

    </main>
  );
}

export default MoodResults;