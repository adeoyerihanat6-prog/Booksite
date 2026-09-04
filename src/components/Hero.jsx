import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

import quietBetweenStars from "../assets/books/quiet-between-stars.png";
import thingsWeNeverSaid from "../assets/books/things-we-never-said.png";
import mapOfSomewhere from "../assets/books/map-of-somewhere.png";
import lastSunday from "../assets/books/last-sunday.png";
import lettersToTheMoon from "../assets/books/letters-to-the-moon.png";

const books = [
  {
    id: 1,
    title: "Quiet Between Stars",
    author: "Cosmic Sci-Fi",
    cover: quietBetweenStars,
    description:
      "A breathtaking journey across galaxies, looking for home in the quietest corners of the universe.",
  },
  {
    id: 2,
    title: "Things We Never Said",
    author: "Contemporary Romance",
    cover: thingsWeNeverSaid,
    description:
      "An emotional exploration of words left unspoken and the healing power of raw vulnerability.",
  },
  {
    id: 3,
    title: "A Map of Somewhere",
    author: "Magical Realism",
    cover: mapOfSomewhere,
    description:
      "Lose yourself in streets that change overnight and maps that lead straight to your deepest memories.",
  },
  {
    id: 4,
    title: "The Last Sunday",
    author: "Historical Fiction",
    cover: lastSunday,
    description:
      "A poignant window into a bygone era where a single afternoon alters generations.",
  },
  {
    id: 5,
    title: "Letters to the Moon",
    author: "Poetry & Epistolary",
    cover: lettersToTheMoon,
    description:
      "Midnight thoughts and delicate verses written to the only witness of our quietest longings.",
  },
];

function Hero() {
  const targetRef = useRef(null);
  const galleryRef = useRef(null);
  const [travelDistance, setTravelDistance] = useState(0);

  useEffect(() => {
    const calculateDistance = () => {
      if (!galleryRef.current) return;

      const galleryWidth = galleryRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      const distance = Math.max(
        0,
        galleryWidth - viewportWidth + viewportWidth * 0.1
      );

      setTravelDistance(distance);
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.12],
    [1, 0]
  );

  const introScale = useTransform(
    scrollYProgress,
    [0, 0.12],
    [1, 0.96]
  );

  const x = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    ["8vw", `-${travelDistance}px`]
  );

  return (
    <section
      ref={targetRef}
      className="relative h-[400vh] bg-[var(--background)] text-[var(--foreground)]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* INTRO */}
        <motion.div
          style={{
            opacity: introOpacity,
            scale: introScale,
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--background)] px-6 text-center"
        >
          <span className="mb-5 text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
            A Curated Library
          </span>

          <h1 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.04em] sm:text-7xl md:text-8xl">
            Stories for every{" "}
            <span className="font-normal italic">
              version of you.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            A quiet collection of stories, ideas, and worlds waiting
            to be discovered.
          </p>

          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="absolute bottom-10 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--muted)]"
          >
            Scroll to explore
            <ArrowRight size={13} strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* BOOK GALLERY */}
        <motion.div
          ref={galleryRef}
          style={{ x }}
          className="relative z-10 flex shrink-0 items-center gap-20 px-[10vw] sm:gap-28"
        >
          {books.map((book) => (
            <motion.article
              key={book.id}
              whileHover={{ y: -10 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}
              className="group relative flex h-[520px] w-[290px] shrink-0 flex-col items-center justify-between sm:h-[570px] sm:w-[360px]"
            >
              {/* NUMBER */}
              <div className="flex w-full items-center justify-between border-b border-[var(--foreground)]/10 pb-4 text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                <span>
                  {String(book.id).padStart(2, "0")} / 05
                </span>

                <span>{book.author}</span>
              </div>

              {/* COVER */}
              <div className="relative flex flex-1 items-center justify-center py-10">
                <div className="absolute h-64 w-40 rounded-full bg-black/10 blur-3xl transition-all duration-700 group-hover:scale-110 dark:bg-black/40" />

                <motion.img
                  src={book.cover}
                  alt={book.title}
                  draggable={false}
                  loading={book.id === 1 ? "eager" : "lazy"}
                  className="relative z-10 h-72 w-auto select-none rounded-[2px] object-cover shadow-[0_25px_50px_rgba(0,0,0,0.22)] transition-transform duration-700 ease-out group-hover:-rotate-1 group-hover:scale-[1.03] sm:h-80"
                />
              </div>

              {/* DETAILS */}
              <div className="w-full text-center">
                <h2 className="text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
                  {book.title}
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-xs font-light leading-relaxed text-[var(--muted)] sm:text-sm">
                  {book.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* EDGE FADES */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[10vw] bg-gradient-to-r from-[var(--background)] to-transparent" />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[10vw] bg-gradient-to-l from-[var(--background)] to-transparent" />
      </div>
    </section>
  );
}

export default Hero;