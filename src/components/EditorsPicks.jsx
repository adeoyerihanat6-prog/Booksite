import { ArrowLeft, ArrowRight, Compass, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCreative,
  Keyboard,
  Mousewheel,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";

import quietBetweenStars from "../assets/books/quiet-between-stars.png";
import thingsWeNeverSaid from "../assets/books/things-we-never-said.png";
import mapOfSomewhere from "../assets/books/map-of-somewhere.png";
import lastSunday from "../assets/books/last-sunday.png";
import lettersToTheMoon from "../assets/books/letters-to-the-moon.png";

const picks = [
  {
    id: "quiet-between-stars",
    title: "Quiet Between Stars",
    genre: "Cosmic Sci-Fi",
    cover: quietBetweenStars,
    note: "A story about distance, belonging, and the strange places we call home.",
    readTime: "4.5 hrs read",
    rating: "4.9 / 5.0",
  },
  {
    id: "things-we-never-said",
    title: "Things We Never Said",
    genre: "Contemporary Romance",
    cover: thingsWeNeverSaid,
    note: "For the words that stayed in our heads long after the moment had passed.",
    readTime: "3.8 hrs read",
    rating: "4.8 / 5.0",
  },
  {
    id: "map-of-somewhere",
    title: "A Map of Somewhere",
    genre: "Magical Realism",
    cover: mapOfSomewhere,
    note: "A strange little journey through places that feel familiar for reasons you can't explain.",
    readTime: "5.1 hrs read",
    rating: "5.0 / 5.0",
  },
  {
    id: "the-last-sunday",
    title: "The Last Sunday",
    genre: "Historical Fiction",
    cover: lastSunday,
    note: "A family reunion, an old secret, and one Sunday that changes what they thought they knew.",
    readTime: "4.2 hrs read",
    rating: "4.9 / 5.0",
  },
  {
    id: "letters-to-the-moon",
    title: "Letters to the Moon",
    genre: "Poetry & Epistolary",
    cover: lettersToTheMoon,
    note: "A collection of letters that slowly reveals a story about love, choice, and leaving home.",
    readTime: "3.6 hrs read",
    rating: "4.9 / 5.0",
  },
];

function EditorsPicks() {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBook = picks[activeIndex];

  return (
    <section
      id="editors-picks"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--background)] px-4 py-16 text-[var(--foreground)] sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">

          {/* LEFT COLUMN */}
          <div className="z-20 order-2 flex flex-col justify-center space-y-6 text-center lg:order-1 lg:col-span-6 lg:text-left">
            <div>
              <span className="inline-flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--muted)] lg:justify-start">
                <Sparkles size={12} className="text-amber-400" />
                Editor's Curated Selection
              </span>

              <h2 className="mt-3 text-3xl font-light leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Stories worth{" "}
                <span className="italic font-normal">
                  lingering over.
                </span>
              </h2>
            </div>

            {/* DYNAMIC BOOK INFO */}
            <div className="relative flex min-h-[170px] flex-col items-center lg:items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBook.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-light tracking-wider text-[var(--muted)] lg:justify-start">
                    <span className="rounded-full border border-[var(--foreground)]/10 px-3 py-1 text-[9px] uppercase tracking-widest">
                      {activeBook.genre}
                    </span>

                    <span>•</span>

                    <span>{activeBook.readTime}</span>

                    <span>•</span>

                    <span>★ {activeBook.rating}</span>
                  </div>

                  <h3 className="text-2xl font-light tracking-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl">
                    {activeBook.title}
                  </h3>

                  <p className="mx-auto max-w-md text-xs font-light leading-relaxed text-[var(--muted)] sm:text-sm lg:mx-0">
                    {activeBook.note}
                  </p>

                  {/* READ BOOK */}
                  <Link
                    to={`/book/${activeBook.id}`}
                    className="inline-flex items-center gap-2 pt-2 text-[10px] uppercase tracking-[0.25em] text-[var(--foreground)] transition-opacity hover:opacity-60"
                  >
                    Explore book
                    <ArrowRight size={13} strokeWidth={1.5} />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* PROGRESS + NAVIGATION */}
            <div className="flex items-center justify-between gap-4 border-t border-[var(--foreground)]/10 pt-4">
              <div className="flex w-36 items-center gap-3 sm:w-48">
                <span className="text-[10px] tracking-[0.25em] text-[var(--muted)]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-[var(--foreground)]/10">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-[var(--foreground)]"
                    animate={{
                      width: `${((activeIndex + 1) / picks.length) * 100}%`,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  />
                </div>

                <span className="text-[10px] tracking-[0.25em] text-[var(--muted)]">
                  {String(picks.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => swiper?.slidePrev()}
                  aria-label="Previous book"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--foreground)]/15 transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                >
                  <ArrowLeft size={16} strokeWidth={1.5} />
                </button>

                <button
                  onClick={() => swiper?.slideNext()}
                  aria-label="Next book"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--foreground)]/15 transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                >
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative order-1 flex w-full items-center justify-center lg:order-2 lg:col-span-6">

            {/* MOBILE ARROWS */}
            <button
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous book"
              className="absolute left-0 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--foreground)]/15 bg-[var(--background)]/80 text-[var(--foreground)] shadow-lg backdrop-blur-md lg:hidden"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => swiper?.slideNext()}
              aria-label="Next book"
              className="absolute right-0 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--foreground)]/15 bg-[var(--background)]/80 text-[var(--foreground)] shadow-lg backdrop-blur-md lg:hidden"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>

            {/* SWIPER */}
            <div className="w-full px-12 sm:px-16 lg:px-0">
              <Swiper
                modules={[
                  EffectCreative,
                  Keyboard,
                  Mousewheel,
                ]}
                effect="creative"
                creativeEffect={{
                  prev: {
                    translate: ["-14%", 0, -100],
                    rotate: [0, 0, -3],
                    opacity: 0.3,
                  },
                  next: {
                    translate: ["14%", 0, -100],
                    rotate: [0, 0, 3],
                    opacity: 0.3,
                  },
                }}
                centeredSlides
                slidesPerView={1}
                speed={900}
                keyboard={{ enabled: true }}
                mousewheel={{ forceToAxis: true }}
                onSwiper={setSwiper}
                onSlideChange={(instance) =>
                  setActiveIndex(instance.realIndex)
                }
                className="w-full overflow-visible py-4"
              >
                {picks.map((book, index) => (
                  <SwiperSlide key={book.id}>
                    <div className="flex h-[340px] items-center justify-center sm:h-[440px]">
                      <motion.div
                        animate={{
                          scale:
                            activeIndex === index ? 1 : 0.92,
                          rotate:
                            activeIndex === index ? -1 : 0,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative cursor-grab active:cursor-grabbing"
                      >
                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/20 blur-[60px] dark:bg-black/60" />

                        <Link to={`/book/${book.id}`}>
                          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-stone-900 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                            <img
                              src={book.cover}
                              alt={book.title}
                              draggable={false}
                              className="h-[280px] w-auto select-none object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[380px] lg:h-[420px]"
                            />
                          </div>
                        </Link>
                      </motion.div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* VIEW ALL BOOKS */}
        <div className="mt-16 flex justify-center lg:mt-20">
          <Link
            to="/genres"
            className="group inline-flex items-center gap-3 border-b border-[var(--foreground)]/30 pb-2 text-[10px] uppercase tracking-[0.3em] text-[var(--foreground)] transition-all hover:border-[var(--foreground)]"
          >
            <Compass size={14} strokeWidth={1.5} />

            View all five books

            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default EditorsPicks;