import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import quietBetweenStars from "../assets/books/quiet-between-stars.png";
import thingsWeNeverSaid from "../assets/books/things-we-never-said.png";
import mapOfSomewhere from "../assets/books/map-of-somewhere.png";
import lastSunday from "../assets/books/last-sunday.png";
import lettersToTheMoon from "../assets/books/letters-to-the-moon.png";

const moods = [
  {
    id: 1,
    title: "Something soft",
    book: "Letters to the Moon",
    genre: "Poetry & Epistolary",
    cover: lettersToTheMoon,
  },
  {
    id: 2,
    title: "Something strange",
    book: "A Map of Somewhere",
    genre: "Magical Realism",
    cover: mapOfSomewhere,
  },
  {
    id: 3,
    title: "Something hopeful",
    book: "Quiet Between Stars",
    genre: "Cosmic Sci-Fi",
    cover: quietBetweenStars,
  },
  {
    id: 4,
    title: "Something bittersweet",
    book: "Things We Never Said",
    genre: "Contemporary Romance",
    cover: thingsWeNeverSaid,
  },
  {
    id: 5,
    title: "Something that stays with you",
    book: "The Last Sunday",
    genre: "Historical Fiction",
    cover: lastSunday,
  },
];

function MoodLibrary() {
  const [activeMood, setActiveMood] = useState(moods[0]);

  return (
    <section className="relative min-h-screen bg-[var(--background)] px-6 py-32 text-[var(--foreground)] sm:px-10 sm:py-40">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-20 flex flex-col gap-5 sm:mb-28">
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
            02 — Mood Library
          </span>

          <h2 className="max-w-3xl text-4xl font-light leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            What are you{" "}
            <span className="italic">in the mood for?</span>
          </h2>

          <p className="max-w-md text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base">
            Sometimes you don't need a genre. You just need a feeling.
          </p>
        </div>

        {/* MOOD AREA */}

        <div className="grid gap-16 md:grid-cols-[1fr_360px] md:items-center lg:grid-cols-[1fr_420px] lg:gap-24">

          {/* MOOD LIST */}

          <div className="border-t border-[var(--foreground)]/10">
            {moods.map((mood) => {
              const isActive = activeMood.id === mood.id;

              return (
                <div key={mood.id}>

                  <motion.button
                    onMouseEnter={() => setActiveMood(mood)}
                    onFocus={() => setActiveMood(mood)}
                    onClick={() => setActiveMood(mood)}
                    className="group flex w-full items-center justify-between border-b border-[var(--foreground)]/10 py-7 text-left sm:py-9"
                  >
                    <div className="flex items-center gap-5 sm:gap-8">
                      <span className="text-[9px] tracking-[0.2em] text-[var(--muted)]">
                        {String(mood.id).padStart(2, "0")}
                      </span>

                      <motion.span
                        animate={{
                          x: isActive ? 8 : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className={`text-2xl font-light tracking-[-0.02em] transition-opacity duration-300 sm:text-4xl ${
                          isActive
                            ? "opacity-100"
                            : "opacity-45 group-hover:opacity-80"
                        }`}
                      >
                        {mood.title}
                      </motion.span>
                    </div>

                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.35,
                        x: isActive ? 0 : -4,
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.3}
                      />
                    </motion.div>
                  </motion.button>

                  {/* MOBILE BOOK PREVIEW */}

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden md:hidden"
                      >
                        <div className="flex items-center gap-6 py-8 pl-8">

                          <motion.img
                            initial={{
                              opacity: 0,
                              x: -15,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              duration: 0.4,
                              delay: 0.05,
                            }}
                            src={mood.cover}
                            alt={mood.book}
                            draggable={false}
                            className="h-40 w-auto shrink-0 object-cover shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                          />

                          <div>
                            <p className="text-sm font-normal">
                              {mood.book}
                            </p>

                            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                              {mood.genre}
                            </p>

                            <button className="mt-5 inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.25em]">
                              View book
                              <ArrowUpRight
                                size={12}
                                strokeWidth={1.3}
                              />
                            </button>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* DESKTOP BOOK PREVIEW */}

          <div className="relative hidden md:block">
            <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden">

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMood.id}
                  initial={{
                    opacity: 0,
                    y: 25,
                    rotate: 2,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: -1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -25,
                    rotate: -2,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute flex flex-col items-center"
                >
                  <img
                    src={activeMood.cover}
                    alt={activeMood.book}
                    draggable={false}
                    className="h-[360px] w-auto select-none object-cover shadow-[0_30px_60px_rgba(0,0,0,0.2)] lg:h-[420px]"
                  />

                  <p className="mt-6 text-center text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                    {activeMood.book}
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]/70">
                    {activeMood.genre}
                  </p>

                  <button className="mt-5 inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.3em]">
                    View book
                    <ArrowUpRight
                      size={12}
                      strokeWidth={1.3}
                    />
                  </button>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default MoodLibrary;