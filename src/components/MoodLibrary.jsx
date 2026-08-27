import {
  ArrowUpRight,
  Compass,
  Heart,
  Moon,
  Sparkles,
  Wind,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const moods = [
  {
    id: "dreamy",
    title: "Dreamy & Ethereal",
    description: "For when you want to disappear somewhere beautiful.",
    icon: Moon,
  },
  {
    id: "strange",
    title: "Strange & Wonderful",
    description: "For stories that make the impossible feel ordinary.",
    icon: Sparkles,
  },
  {
    id: "hopeful",
    title: "Quietly Hopeful",
    description: "For when you need a little light in the distance.",
    icon: Wind,
  },
  {
    id: "emotional",
    title: "Deeply Human",
    description: "For stories that stay with you long after the last page.",
    icon: Heart,
  },
  {
    id: "nostalgic",
    title: "Nostalgic & Tender",
    description: "For memories, old places, and things worth carrying home.",
    icon: Compass,
  },
];

function MoodLibrary() {
  return (
    <section
      id="moods"
      className="relative overflow-hidden bg-[var(--background)] px-6 py-32 text-[var(--foreground)] sm:px-10 sm:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--foreground)]/30" />

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--muted)]">
              Find your next story
            </span>
          </div>

          <h2 className="mt-7 text-5xl font-light leading-[0.94] tracking-[-0.045em] sm:text-6xl md:text-7xl">
            Read by
            <br />
            <span className="italic">feeling.</span>
          </h2>

          <p className="mt-7 max-w-md text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base">
            You don't always know what genre you want. Sometimes you just
            know how you want a story to make you feel.
          </p>
        </motion.div>

        {/* MOOD DISCOVERY */}
        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          {/* MOOD LIST */}
          <div className="border-t border-[var(--foreground)]/10">
            {moods.map((mood, index) => {
              const Icon = mood.icon;

              return (
                <motion.div
                  key={mood.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    to={`/mood/${mood.id}`}
                    className="group flex w-full items-center justify-between border-b border-[var(--foreground)]/10 py-7 text-left transition-transform duration-300 hover:translate-x-2 sm:py-8"
                  >
                    {/* LEFT CONTENT */}
                    <div className="flex items-center gap-5 sm:gap-7">
                      {/* ICON */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--foreground)]/10 transition-all duration-300 group-hover:border-[var(--foreground)]/30 group-hover:bg-[var(--foreground)]/[0.06]">
                        <Icon
                          size={17}
                          strokeWidth={1.3}
                          className="text-[var(--foreground)]/50 transition-all duration-300 group-hover:rotate-6 group-hover:text-[var(--foreground)]"
                        />
                      </div>

                      {/* TEXT */}
                      <div>
                        <h3 className="text-xl font-light tracking-[-0.02em] text-[var(--foreground)]/75 transition-colors duration-300 group-hover:text-[var(--foreground)] sm:text-3xl">
                          {mood.title}
                        </h3>

                        <p className="mt-1 text-xs font-light text-[var(--muted)] sm:text-sm">
                          {mood.description}
                        </p>
                      </div>
                    </div>

                    {/* ARROW */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--foreground)]/10 opacity-40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[var(--foreground)]/30 group-hover:opacity-100">
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.3}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* EDITORIAL MESSAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative hidden min-h-[500px] items-center justify-center overflow-hidden rounded-[2rem] border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.025] lg:flex"
          >
            {/* BACKGROUND TYPOGRAPHY */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="select-none text-[13rem] font-light leading-none tracking-[-0.09em] text-[var(--foreground)]/[0.025]">
                FEEL
              </span>
            </div>

            {/* DECORATIVE CIRCLES */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[var(--foreground)]/[0.06]" />

            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-[var(--foreground)]/[0.05]" />

            {/* MESSAGE */}
            <div className="relative z-10 max-w-xs text-center">
              <Sparkles
                size={22}
                strokeWidth={1.2}
                className="mx-auto mb-7 text-[var(--foreground)]/50"
              />

              <p className="text-3xl font-light leading-tight tracking-[-0.03em]">
                Start with a feeling.
                <br />
                <span className="italic text-[var(--muted)]">
                  We'll find the story.
                </span>
              </p>

              <p className="mt-6 text-xs font-light leading-relaxed text-[var(--muted)]">
                Explore stories gathered around moods, atmospheres, and the
                little feelings that make us reach for a book.
              </p>
            </div>
          </motion.div>
        </div>

        {/* MOBILE EDITORIAL NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 flex items-center gap-4 border-t border-[var(--foreground)]/10 pt-8 lg:hidden"
        >
          <Sparkles
            size={18}
            strokeWidth={1.2}
            className="shrink-0 text-[var(--foreground)]/50"
          />

          <p className="text-sm font-light leading-relaxed text-[var(--muted)]">
            Start with a feeling. We'll find the story.
          </p>
        </motion.div>
      </div>

      {/* AMBIENT TEXTURE */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--foreground)]/[0.025] blur-[120px]" />
    </section>
  );
}

export default MoodLibrary;