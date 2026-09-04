import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  List,
  Minus,
  Plus,
  Settings2,
  X,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { books } from "../data/books";
import { bookContent } from "../data/bookContent";

function Reader() {
  const { id } = useParams();

  const book = books.find((book) => book.id === id);
  const content = bookContent[id];

  const [chapterIndex, setChapterIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState(0);

  const [fontSize, setFontSize] = useState(() => {
    const settings = JSON.parse(
      localStorage.getItem("readerSettings") || "{}"
    );

    return settings.fontSize || 18;
  });

  const [readingWidth, setReadingWidth] = useState(() => {
    const settings = JSON.parse(
      localStorage.getItem("readerSettings") || "{}"
    );

    return settings.readingWidth || "medium";
  });

  const [lineHeight, setLineHeight] = useState(() => {
    const settings = JSON.parse(
      localStorage.getItem("readerSettings") || "{}"
    );

    return settings.lineHeight || 2;
  });

  const chapter = content?.chapters[chapterIndex];

  /* -----------------------------
     RESTORE READING PROGRESS
  ----------------------------- */

  useEffect(() => {
    if (!id) return;

    const savedProgress = JSON.parse(
      localStorage.getItem("readingProgress") || "{}"
    );

    const bookProgress = savedProgress[id];

    if (bookProgress) {
      setChapterIndex(bookProgress.chapterIndex || 0);

      requestAnimationFrame(() => {
        window.scrollTo({
          top: bookProgress.scrollPosition || 0,
          behavior: "instant",
        });
      });
    }

    const savedBooks = JSON.parse(
      localStorage.getItem("savedBooks") || "[]"
    );

    setSaved(savedBooks.includes(id));
  }, [id]);

  /* -----------------------------
     SAVE READING POSITION
  ----------------------------- */

  useEffect(() => {
    if (!id) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const chapterProgress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      const safeChapterProgress = Math.min(
        100,
        Math.max(0, chapterProgress)
      );

      const totalChapters = content?.chapters?.length || 1;

      const bookProgress =
        ((chapterIndex + safeChapterProgress / 100) /
          totalChapters) *
        100;

      setProgress(
        Math.min(100, Math.max(0, bookProgress))
      );

      const savedProgress = JSON.parse(
        localStorage.getItem("readingProgress") || "{}"
      );

      savedProgress[id] = {
        chapterIndex,
        scrollPosition: scrollTop,
        chapterProgress: safeChapterProgress,
        updatedAt: Date.now(),
      };

      localStorage.setItem(
        "readingProgress",
        JSON.stringify(savedProgress)
      );
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [chapterIndex, id, content]);

  /* -----------------------------
     SAVE READER SETTINGS
  ----------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "readerSettings",
      JSON.stringify({
        fontSize,
        readingWidth,
        lineHeight,
      })
    );
  }, [fontSize, readingWidth, lineHeight]);

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
      const updatedBooks = [
        ...savedBooks,
        id,
      ];

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
    if (!content?.chapters[index]) return;

    setChapterIndex(index);
    setMenuOpen(false);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  const nextChapter = () => {
    if (
      chapterIndex <
      content.chapters.length - 1
    ) {
      goToChapter(chapterIndex + 1);
    }
  };

  const previousChapter = () => {
    if (chapterIndex > 0) {
      goToChapter(chapterIndex - 1);
    }
  };

  /* -----------------------------
     CHAPTER COMPLETION
  ----------------------------- */

  const getCompletedChapters = () => {
    const savedProgress = JSON.parse(
      localStorage.getItem("readingProgress") || "{}"
    );

    return savedProgress[id]?.completedChapters || [];
  };

  const completedChapters = getCompletedChapters();

  const isChapterCompleted = (index) => {
    return completedChapters.includes(index);
  };

  const markChapterComplete = () => {
    const savedProgress = JSON.parse(
      localStorage.getItem("readingProgress") || "{}"
    );

    const currentCompleted =
      savedProgress[id]?.completedChapters || [];

    if (!currentCompleted.includes(chapterIndex)) {
      savedProgress[id] = {
        ...(savedProgress[id] || {}),
        chapterIndex,
        scrollPosition: window.scrollY,
        completedChapters: [
          ...currentCompleted,
          chapterIndex,
        ],
        updatedAt: Date.now(),
      };

      localStorage.setItem(
        "readingProgress",
        JSON.stringify(savedProgress)
      );
    }
  };

  /* -----------------------------
     PROGRESS LABEL
  ----------------------------- */

  const progressLabel = useMemo(() => {
    if (!content) return "";

    if (
      chapterIndex ===
      content.chapters.length - 1
    ) {
      return "Final chapter";
    }

    return `Chapter ${chapterIndex + 1} of ${content.chapters.length}`;
  }, [chapterIndex, content]);

  /* -----------------------------
     READING WIDTH
  ----------------------------- */

  const widthClasses = {
    narrow: "max-w-xl",
    medium: "max-w-2xl",
    wide: "max-w-3xl",
  };

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
      {/* -----------------------------
          READING PROGRESS
      ----------------------------- */}

      <div className="fixed left-0 top-0 z-[70] h-[2px] w-full bg-[var(--foreground)]/[0.06]">
        <motion.div
          className="h-full bg-[var(--foreground)]"
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.15,
          }}
        />
      </div>

      {/* -----------------------------
          READER HEADER
      ----------------------------- */}

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

          <div className="flex items-center gap-1">
            {/* SAVE */}

            <button
              type="button"
              onClick={handleSave}
              aria-label={
                saved
                  ? "Remove bookmark"
                  : "Save book"
              }
              className="flex h-9 w-9 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {saved ? (
                <Check
                  size={16}
                  strokeWidth={1.3}
                />
              ) : (
                <Bookmark
                  size={16}
                  strokeWidth={1.3}
                />
              )}
            </button>

            {/* SETTINGS */}

            <button
              type="button"
              onClick={() =>
                setSettingsOpen(true)
              }
              aria-label="Reading settings"
              className="flex h-9 w-9 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <Settings2
                size={16}
                strokeWidth={1.3}
              />
            </button>

            {/* CHAPTERS */}

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open chapters"
              className="flex h-9 w-9 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <List
                size={17}
                strokeWidth={1.3}
              />
            </button>
          </div>
        </div>
      </header>

      {/* -----------------------------
          READING AREA
      ----------------------------- */}

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
            className={`mx-auto w-full ${widthClasses[readingWidth]}`}
          >
            {/* CHAPTER INTRO */}

            <div className="mb-16 sm:mb-20">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                Chapter{" "}
                {String(chapter.id).padStart(
                  2,
                  "0"
                )}
              </p>

              <h1 className="mt-5 text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-6xl">
                {chapter.title}
              </h1>

              <div className="mt-8 h-px w-12 bg-[var(--foreground)]/20" />
            </div>

            {/* STORY */}

            <div
              className="space-y-7"
              style={{
                lineHeight,
              }}
            >
              {chapter.paragraphs.map(
                (paragraph, index) => (
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
                      delay: Math.min(
                        index * 0.025,
                        0.2
                      ),
                    }}
                    style={{
                      fontSize:
                        index === 0
                          ? `${fontSize + 2}px`
                          : `${fontSize}px`,
                    }}
                    className={
                      index === 0
                        ? "font-light tracking-[-0.01em]"
                        : "font-light text-[var(--foreground)]/80"
                    }
                  >
                    {paragraph}
                  </motion.p>
                )
              )}
            </div>

            {/* COMPLETE CHAPTER */}

            <div className="mt-20 border-t border-[var(--foreground)]/[0.08] pt-8">
              <button
                type="button"
                onClick={markChapterComplete}
                disabled={isChapterCompleted(
                  chapterIndex
                )}
                className="group inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] disabled:pointer-events-none"
              >
                {isChapterCompleted(
                  chapterIndex
                ) ? (
                  <>
                    <Check
                      size={14}
                      strokeWidth={1.3}
                    />

                    Chapter completed
                  </>
                ) : (
                  <>
                    <Check
                      size={14}
                      strokeWidth={1.3}
                    />

                    Mark chapter complete
                  </>
                )}
              </button>
            </div>
          </motion.article>
        </AnimatePresence>
      </section>

      {/* -----------------------------
          CHAPTER NAVIGATION
      ----------------------------- */}

      <section className="border-t border-[var(--foreground)]/[0.08] px-6 py-12 sm:px-10 sm:py-16">
        <div className={`mx-auto ${widthClasses[readingWidth]}`}>
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
              {chapterIndex + 1} /{" "}
              {content.chapters.length}
            </button>

            <button
              type="button"
              onClick={nextChapter}
              disabled={
                chapterIndex ===
                content.chapters.length - 1
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

      {/* -----------------------------
          END OF BOOK
      ----------------------------- */}

      {chapterIndex ===
        content.chapters.length - 1 && (
        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="px-6 pb-32 pt-10 sm:px-10 sm:pb-44"
        >
          <div
            className={`mx-auto border-t border-[var(--foreground)]/[0.08] pt-14 text-center ${widthClasses[readingWidth]}`}
          >
            <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
              The end
            </p>

            <h2 className="mt-5 text-3xl font-light tracking-[-0.03em] sm:text-4xl">
              Thank you for reading.
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-[var(--muted)]">
              Some stories end on the page. Others stay
              with us a little longer.
            </p>

            <Link
              to={`/book/${book.id}`}
              className="mt-8 inline-flex items-center gap-3 border border-[var(--foreground)] px-6 py-3 text-[9px] font-medium uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
            >
              Back to book

              <ArrowRight
                size={13}
                strokeWidth={1.3}
              />
            </Link>
          </div>
        </motion.section>
      )}

      {/* -----------------------------
          CHAPTER DRAWER
      ----------------------------- */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* BACKDROP */}

            <motion.button
              type="button"
              aria-label="Close chapters"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 cursor-default bg-black/20 backdrop-blur-sm"
            />

            {/* DRAWER */}

            <motion.aside
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
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
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  aria-label="Close chapters"
                  className="flex h-9 w-9 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  <X
                    size={17}
                    strokeWidth={1.3}
                  />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-1">
                  {content.chapters.map(
                    (item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          goToChapter(index)
                        }
                        className={`group flex w-full items-start gap-5 border-b border-[var(--foreground)]/[0.07] px-2 py-6 text-left transition-colors ${
                          chapterIndex === index
                            ? "text-[var(--foreground)]"
                            : "text-[var(--muted)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        <span className="pt-1 text-[9px]">
                          {String(item.id).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="flex-1 text-sm font-light">
                          {item.title}
                        </span>

                        {isChapterCompleted(
                          index
                        ) && (
                          <Check
                            size={14}
                            strokeWidth={1.3}
                            className="mt-0.5 shrink-0"
                          />
                        )}

                        {chapterIndex === index &&
                          !isChapterCompleted(
                            index
                          ) && (
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--foreground)]" />
                          )}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="border-t border-[var(--foreground)]/10 px-6 py-6">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] leading-relaxed text-[var(--muted)]">
                    {Math.round(progress)}% of the
                    book
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
                    {completedChapters.length}/
                    {content.chapters.length} complete
                  </p>
                </div>

                <div className="mt-4 h-px w-full bg-[var(--foreground)]/10">
                  <div
                    className="h-full bg-[var(--foreground)] transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* -----------------------------
          READING SETTINGS
      ----------------------------- */}

      <AnimatePresence>
        {settingsOpen && (
          <>
            {/* BACKDROP */}

            <motion.button
              type="button"
              aria-label="Close reading settings"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setSettingsOpen(false)
              }
              className="fixed inset-0 z-50 cursor-default bg-black/20 backdrop-blur-sm"
            />

            {/* SETTINGS PANEL */}

            <motion.aside
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-sm flex-col border-l border-[var(--foreground)]/10 bg-[var(--background)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--foreground)]/10 px-6 py-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                    Reading preferences
                  </p>

                  <p className="mt-2 text-sm font-light">
                    Make it comfortable.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSettingsOpen(false)
                  }
                  aria-label="Close settings"
                  className="flex h-9 w-9 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  <X
                    size={17}
                    strokeWidth={1.3}
                  />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                {/* FONT SIZE */}

                <div className="border-b border-[var(--foreground)]/10 pb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                        Text size
                      </p>

                      <p className="mt-2 text-xs text-[var(--muted)]">
                        {fontSize}px
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          setFontSize(
                            Math.max(
                              14,
                              fontSize - 1
                            )
                          )
                        }
                        aria-label="Decrease text size"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--foreground)]/10 text-[var(--muted)] transition-colors hover:border-[var(--foreground)]/30 hover:text-[var(--foreground)]"
                      >
                        <Minus
                          size={14}
                          strokeWidth={1.3}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setFontSize(
                            Math.min(
                              24,
                              fontSize + 1
                            )
                          )
                        }
                        aria-label="Increase text size"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--foreground)]/10 text-[var(--muted)] transition-colors hover:border-[var(--foreground)]/30 hover:text-[var(--foreground)]"
                      >
                        <Plus
                          size={14}
                          strokeWidth={1.3}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* READING WIDTH */}

                <div className="border-b border-[var(--foreground)]/10 py-8">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                    Reading width
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      {
                        id: "narrow",
                        label: "Narrow",
                      },
                      {
                        id: "medium",
                        label: "Comfort",
                      },
                      {
                        id: "wide",
                        label: "Wide",
                      },
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setReadingWidth(
                            option.id
                          )
                        }
                        className={`border px-3 py-3 text-[9px] uppercase tracking-[0.15em] transition-all duration-300 ${
                          readingWidth ===
                          option.id
                            ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                            : "border-[var(--foreground)]/10 text-[var(--muted)] hover:border-[var(--foreground)]/30"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* LINE HEIGHT */}

                <div className="border-b border-[var(--foreground)]/10 py-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                        Line spacing
                      </p>

                      <p className="mt-2 text-xs text-[var(--muted)]">
                        {lineHeight.toFixed(1)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          setLineHeight(
                            Math.max(
                              1.5,
                              Number(
                                (
                                  lineHeight -
                                  0.1
                                ).toFixed(1)
                              )
                            )
                          )
                        }
                        aria-label="Decrease line spacing"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--foreground)]/10 text-[var(--muted)] transition-colors hover:border-[var(--foreground)]/30 hover:text-[var(--foreground)]"
                      >
                        <Minus
                          size={14}
                          strokeWidth={1.3}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setLineHeight(
                            Math.min(
                              2.4,
                              Number(
                                (
                                  lineHeight +
                                  0.1
                                ).toFixed(1)
                              )
                            )
                          )
                        }
                        aria-label="Increase line spacing"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--foreground)]/10 text-[var(--muted)] transition-colors hover:border-[var(--foreground)]/30 hover:text-[var(--foreground)]"
                      >
                        <Plus
                          size={14}
                          strokeWidth={1.3}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* PREVIEW */}

                <div className="pt-8">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                    Preview
                  </p>

                  <div
                    className="mt-5 border border-[var(--foreground)]/10 p-5"
                    style={{
                      lineHeight,
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    <p className="font-light text-[var(--foreground)]/80">
                      Every story deserves a quiet place
                      to be read.
                    </p>
                  </div>
                </div>
              </div>

              {/* RESET */}

              <div className="border-t border-[var(--foreground)]/10 px-6 py-6">
                <button
                  type="button"
                  onClick={() => {
                    setFontSize(18);
                    setReadingWidth("medium");
                    setLineHeight(2);
                  }}
                  className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  Reset preferences
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Reader;