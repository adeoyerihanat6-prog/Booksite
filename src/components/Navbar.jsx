import {
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useState } from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

function Navbar({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const isReader = location.pathname.startsWith("/read/");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Hide navbar completely inside the reader
  if (isReader) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border border-[var(--border)] bg-[color:var(--surface)]/80 px-5 py-3 shadow-lg backdrop-blur-xl md:px-7"
    >
      {/* Brand */}
      <Link to="/">
        <span className="text-lg font-semibold tracking-tight text-[var(--foreground)] transition-opacity duration-200 hover:opacity-70">
          Booksite
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden items-center gap-8 md:flex">
        <Link
          to="/"
          className="text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
        >
          Discover
        </Link>

        <Link
          to="/genres"
          className="text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
        >
          Genres
        </Link>

        <Link
          to="/about"
          className="text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
        >
          About
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          aria-label={
            theme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--muted)] transition-colors duration-200 hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]"
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.span
              key={theme}
              initial={{
                opacity: 0,
                rotate: -45,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: 45,
                scale: 0.7,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              {theme === "dark" ? (
                <Sun
                  size={18}
                  strokeWidth={1.8}
                />
              ) : (
                <Moon
                  size={18}
                  strokeWidth={1.8}
                />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
          className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--muted)] transition-colors duration-200 hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)] md:hidden"
        >
          {menuOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-3xl border border-[var(--border)] bg-[color:var(--surface)]/95 p-4 shadow-xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-2xl px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]"
              >
                Discover
              </Link>

              <Link
                to="/genres"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-2xl px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]"
              >
                Genres
              </Link>

              <Link
                to="/about"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-2xl px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]"
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;