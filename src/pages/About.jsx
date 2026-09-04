function About() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="px-6 pb-32 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
            About Booksite
          </span>

          <div className="mt-6 max-w-5xl">
            <h1 className="text-5xl font-light leading-[0.95] tracking-[-0.045em] sm:text-7xl md:text-8xl">
              A place for
              <br />
              <span className="italic">good stories.</span>
            </h1>
          </div>

          <div className="mt-24 grid gap-12 border-t border-[var(--foreground)]/10 pt-10 md:grid-cols-[1fr_1.5fr]">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
              The idea
            </span>

            <div className="max-w-2xl">
              <p className="text-lg font-light leading-relaxed sm:text-2xl">
                Booksite is a quiet corner of the internet for discovering
                stories based on what you feel, what you want to explore,
                and the worlds you want to disappear into.
              </p>

              <p className="mt-8 text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base">
                Instead of endlessly searching for something to read,
                Booksite lets you browse by mood, genre, and curiosity.
                Find a story, save it for later, and settle in to read.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;