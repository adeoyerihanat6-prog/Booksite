import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  List,
  X,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { books } from "../data/books";
import { bookContent } from "../data/bookContent";

function Reader() {
  const { id } = useParams();

  const book = books.find((book) => book.id === id);
  const content = bookContent[id];

  const [chapterIndex, setChapterIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState(0);

  const chapter = content?.chapters[chapterIndex];

  /* -----------------------------
     RESTORE READING PROGRESS
  ----------------------------- */

  useEffect(() => {
    if (!id) return;

    const savedProgress = JSON.parse(
      localStorage.getItem("readingProgress") || "{}"
    );

    if (savedProgress[id]) {
      setChapterIndex(savedProgress[id].chapterIndex || 0);
    }

    const savedBooks = JSON.parse(
      localStorage.getItem("savedBooks") || "[]"
    );

    setSaved(savedBooks.includes(id));
  }, [id]);

  /* -----------------------------
     SAVE CURRENT CHAPTER
  ----------------------------- */

  useEffect(() => {
    if (!id) return;

    const savedProgress = JSON.parse(
      localStorage.getItem("readingProgress") || "{}"
    );

    savedProgress[id] = {
      chapterIndex,
      updatedAt: Date.now(),
    };

    localStorage.setItem(
      "readingProgress",
      JSON.stringify(savedProgress)
    );
  }, [chapterIndex, id]);

  /* -----------------------------
     READING PROGRESS
  ----------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const currentProgress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [chapterIndex]);

  /* -----------------------------
     SAVE BOOK
  ----------------------------- */

  const handleSave = () => {
    const savedBooks = JSON.parse(
      localStorage.getItem("savedBooks") || "[]"
    );

    if (saved) {
      const updatedBooks = savedBooks.filter(
        (bookId) => bookId !== id
      );

      localStorage.setItem(
        "savedBooks",
        JSON.stringify(updatedBooks)
      );

      setSaved(false);
    } else {
      const updatedBooks = [...savedBooks, id];

      localStorage.setItem(
        "savedBooks",
        JSON.stringify(updatedBooks)
      );

      setSaved(true);
    }
  };

  /* -----------------------------
     CHAPTER NAVIGATION
  ----------------------------- */

  const goToChapter = (index) => {
    setChapterIndex(index);
    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const nextChapter = () => {
    if (chapterIndex < content.chapters.length - 1) {
      goToChapter(chapterIndex + 1);
    }
  };

  const previousChapter = () => {
    if (chapterIndex > 0) {
      goToChapter(chapterIndex - 1);
    }
  };

  /* -----------------------------
     BOOKMARK LABEL
  ----------------------------- */

  const progressLabel = useMemo(() => {
    if (!content) return "";

    if (chapterIndex === content.chapters.length - 1) {
      return "Final chapter";
    }

    return `Chapter ${chapterIndex + 1} of ${content.chapters.length}`;
  }, [chapterIndex, content]);

  /* -----------------------------
     NOT FOUND
  ----------------------------- */

  if (!book || !content) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-32 text-[var(--foreground)]">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-[var(--muted)]">
            This story isn't available yet.
          </p>

          <Link
            to="/"
            className="group mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.3}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Discover
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* READING PROGRESS */}

      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-[var(--foreground)]/[0.06]">
        <motion.div
          className="h-full bg-[var(--foreground)]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.15 }}
        />
      </div>

      {/* READER HEADER */}

      <header className="sticky top-0 z-40 border-b border-[var(--foreground)]/[0.08] bg-[var(--background)]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6 sm:px-10">
          {/* EXIT */}

          <Link
            to={`/book/${book.id}`}
            className="group flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.3}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            <span className="hidden sm:inline">
              Exit reader
            </span>
          </Link>

          {/* BOOK */}

          <div className="hidden text-center sm:block">
            <p className="text-[8px] uppercase tracking-[0.3em] text-[var(--muted)]">
              {book.title}
            </p>

            <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[var(--foreground)]/50">
              {progressLabel}
            </p>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              aria-label={
                saved ? "Remove bookmark" : "Save book"
              }
              className="flex h-9 w-9 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {saved ? (
                <Check size={16} strokeWidth={1.3} />
              ) : (
                <Bookmark size={16} strokeWidth={1.3} />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open chapters"
              className="flex h-9 w-9 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <List size={17} strokeWidth={1.3} />
            </button>
          </div>
        </div>
      </header>

      {/* READING AREA */}

      <section className="px-6 pb-28 pt-20 sm:px-10 sm:pb-40 sm:pt-28">
        <AnimatePresence mode="wait">
          <motion.article
            key={chapter.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto max-w-2xl"
          >
            {/* CHAPTER INTRO */}

            <div className="mb-16 sm:mb-20">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                Chapter {String(chapter.id).padStart(2, "0")}
              </p>

              <h1 className="mt-5 text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-6xl">
                {chapter.title}
              </h1>

              <div className="mt-8 h-px w-12 bg-[var(--foreground)]/20" />
            </div>

            {/* STORY */}

            <div className="space-y-7">
              {chapter.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={`${chapter.id}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.025, 0.2),
                  }}
                  className={
                    index === 0
                      ? "text-xl font-light leading-[1.9] tracking-[-0.01em] sm:text-2xl"
                      : "text-base font-light leading-[2] text-[var(--foreground)]/80 sm:text-lg"
                  }
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </section>

      {/* CHAPTER NAVIGATION */}

      <section className="border-t border-[var(--foreground)]/[0.08] px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between gap-6">
            <button
              type="button"
              onClick={previousChapter}
              disabled={chapterIndex === 0}
              className="group flex items-center gap-3 text-left text-[9px] uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] disabled:pointer-events-none disabled:opacity-20"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              <span className="hidden sm:block">
                Previous
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {chapterIndex + 1} / {content.chapters.length}
            </button>

            <button
              type="button"
              onClick={nextChapter}
              disabled={
                chapterIndex === content.chapters.length - 1
              }
              className="group flex items-center gap-3 text-right text-[9px] uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] disabled:pointer-events-none disabled:opacity-20"
            >
              <span className="hidden sm:block">
                Next chapter
              </span>

              <ArrowRight
                size={14}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>

      {/* END OF BOOK */}

      {chapterIndex === content.chapters.length - 1 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-6 pb-32 pt-10 sm:px-10 sm:pb-44"
        >
          <div className="mx-auto max-w-2xl border-t border-[var(--foreground)]/[0.08] pt-14 text-center">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
              The end
            </p>

            <h2 className="mt-5 text-3xl font-light tracking-[-0.03em] sm:text-4xl">
              Thank you for reading.
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-[var(--muted)]">
              Some stories end on the page. Others stay with us a
              little longer.
            </p>

            <Link
              to={`/book/${book.id}`}
              className="mt-8 inline-flex items-center gap-3 border border-[var(--foreground)] px-6 py-3 text-[9px] font-medium uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
            >
              Back to book
              <ArrowRight size={13} strokeWidth={1.3} />
            </Link>
          </div>
        </motion.section>
      )}

      {/* CHAPTER DRAWER */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* BACKDROP */}

            <motion.button
              type="button"
              aria-label="Close chapters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 cursor-default bg-black/20 backdrop-blur-sm"
            />

            {/* DRAWER */}

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-sm flex-col border-l border-[var(--foreground)]/10 bg-[var(--background)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--foreground)]/10 px-6 py-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                    Contents
                  </p>

                  <p className="mt-2 text-sm font-light">
                    {book.title}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close chapters"
                  className="flex h-9 w-9 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  <X size={17} strokeWidth={1.3} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-1">
                  {content.chapters.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goToChapter(index)}
                      className={`group flex w-full items-start gap-5 border-b border-[var(--foreground)]/[0.07] px-2 py-6 text-left transition-colors ${
                        chapterIndex === index
                          ? "text-[var(--foreground)]"
                          : "text-[var(--muted)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      <span className="pt-1 text-[9px]">
                        {String(item.id).padStart(2, "0")}
                      </span>

                      <span className="text-sm font-light">
                        {item.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[var(--foreground)]/10 px-6 py-6">
                <p className="text-[9px] leading-relaxed text-[var(--muted)]">
                  Your reading progress is saved automatically on
                  this device.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Reader;

