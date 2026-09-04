import { BookOpen, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[var(--foreground)]"
            >
              <BookOpen size={18} strokeWidth={1.7} />

              <span className="text-sm font-medium tracking-tight">
                Booksite
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              A quiet place for good stories, thoughtful reading, and books
              worth getting lost in.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                Explore
              </p>

              <div className="flex flex-col gap-3 text-sm">
                <Link
                  to="/"
                  className="text-[var(--foreground)] transition-opacity hover:opacity-60"
                >
                  Discover
                </Link>

                <Link
                  to="/genres"
                  className="text-[var(--foreground)] transition-opacity hover:opacity-60"
                >
                  Library
                </Link>

                <Link
                  to="/saved"
                  className="text-[var(--foreground)] transition-opacity hover:opacity-60"
                >
                  Saved Books
                </Link>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                About
              </p>

              <div className="flex flex-col gap-3 text-sm">
                <Link
                  to="/about"
                  className="text-[var(--foreground)] transition-opacity hover:opacity-60"
                >
                  About Booksite
                </Link>

                <Link
                  to="/#moods"
                  className="text-[var(--foreground)] transition-opacity hover:opacity-60"
                >
                  Browse by Mood
                </Link>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                Contact
              </p>

              <a
                href="mailto:adeoyerihanat6@gmail.com"
                aria-label="Email Booksite"
                className="inline-flex items-center gap-2 text-sm text-[var(--foreground)] transition-opacity hover:opacity-60"
              >
                <Mail size={17} strokeWidth={1.7} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Booksite</p>

          <p>Made for people who still love getting lost in books.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;