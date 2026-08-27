import { ArrowLeft, ArrowRight, Sparkles, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Keyboard, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";

import quietBetweenStars from "../assets/books/quiet-between-stars.png";
import thingsWeNeverSaid from "../assets/books/things-we-never-said.png";
import mapOfSomewhere from "../assets/books/map-of-somewhere.png";

const picks = [
  {
    id: 1,
    title: "Quiet Between Stars",
    genre: "Cosmic Sci-Fi",
    cover: quietBetweenStars,
    note: "A story about distance, belonging, and the strange places we call home.",
    readTime: "4.5 hrs read",
    rating: "4.9 / 5.0",
  },
  {
    id: 2,
    title: "Things We Never Said",
    genre: "Contemporary Romance",
    cover: thingsWeNeverSaid,
    note: "For the words that stayed in our heads long after the moment had passed.",
    readTime: "3.8 hrs read",
    rating: "4.8 / 5.0",
  },
  {
    id: 3,
    title: "A Map of Somewhere",
    genre: "Magical Realism",
    cover: mapOfSomewhere,
    note: "A strange little journey through places that feel familiar for reasons you can't explain.",
    readTime: "5.1 hrs read",
    rating: "5.0 / 5.0",
  },
];

function EditorsPicks() {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeBook = picks[activeIndex];

  return (
    <section className="relative overflow-hidden bg-[var(--background)] px-4 py-16 text-[var(--foreground)] sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Text Details */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center space-y-6 z-20 text-center lg:text-left">
            <div>
              <span className="inline-flex items-center justify-center lg:justify-start gap-2 text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
                <Sparkles size={12} className="text-amber-400" />
                Editor's Curated Selection
              </span>

              <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.08] tracking-[-0.03em]">
                Stories worth <span className="italic font-normal">lingering over.</span>
              </h2>
            </div>

            {/* Dynamic Content Panel */}
            <div className="min-h-[170px] relative flex flex-col items-center lg:items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBook.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs tracking-wider text-[var(--muted)] font-light">
                    <span className="px-3 py-1 rounded-full border border-[var(--foreground)]/10 text-[9px] uppercase tracking-widest">
                      {activeBook.genre}
                    </span>
                    <span>•</span>
                    <span>{activeBook.readTime}</span>
                    <span>•</span>
                    <span>★ {activeBook.rating}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[var(--foreground)]">
                    {activeBook.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-light leading-relaxed text-[var(--muted)] max-w-md mx-auto lg:mx-0">
                    {activeBook.note}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress & Navigation */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--foreground)]/10">
              <div className="flex items-center gap-3 w-36 sm:w-48">
                <span className="text-[10px] tracking-[0.25em] text-[var(--muted)]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <div className="relative h-[2px] flex-1 bg-[var(--foreground)]/10 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-[var(--foreground)]"
                    animate={{
                      width: `${((activeIndex + 1) / picks.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className="text-[10px] tracking-[0.25em] text-[var(--muted)]">
                  0{picks.length}
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

          {/* RIGHT COLUMN: Swiper Carousel with Side Arrows Overlay for Mobile */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative w-full flex items-center justify-center">
            
            {/* Left Mobile Arrow Overlay (Tucked tightly beside the book image) */}
            <button
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous book"
              className="absolute left-0 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--background)]/80 backdrop-blur-md border border-[var(--foreground)]/15 text-[var(--foreground)] shadow-lg lg:hidden"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>

            {/* Right Mobile Arrow Overlay */}
            <button
              onClick={() => swiper?.slideNext()}
              aria-label="Next book"
              className="absolute right-0 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--background)]/80 backdrop-blur-md border border-[var(--foreground)]/15 text-[var(--foreground)] shadow-lg lg:hidden"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>

            {/* Swiper track */}
            <div className="w-full px-12 sm:px-16 lg:px-0">
              <Swiper
                modules={[EffectCreative, Keyboard, Mousewheel]}
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
                onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
                className="w-full py-4 overflow-visible"
              >
                {picks.map((book, index) => (
                  <SwiperSlide key={book.id}>
                    <div className="flex h-[340px] sm:h-[440px] items-center justify-center">
                      <motion.div
                        animate={{
                          scale: activeIndex === index ? 1 : 0.92,
                          rotate: activeIndex === index ? -1 : 0,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative group cursor-grab active:cursor-grabbing"
                      >
                        <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/20 blur-[60px] dark:bg-black/60 pointer-events-none" />

                        <div className="relative rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-white/10 bg-stone-900">
                          <img
                            src={book.cover}
                            alt={book.title}
                            draggable={false}
                            className="h-[280px] sm:h-[380px] lg:h-[420px] w-auto select-none object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default EditorsPicks;