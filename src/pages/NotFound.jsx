import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center px-6 py-20 sm:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
          404
        </p>

        <h1 className="mt-5 max-w-2xl text-5xl font-medium tracking-tight text-[var(--foreground)] sm:text-7xl">
          This page seems to have wandered off.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
          The page you're looking for doesn't exist, or it may have moved
          somewhere else.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80"
          >
            <Home size={16} strokeWidth={1.8} />
            Back to Discover
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
          >
            <ArrowLeft size={16} strokeWidth={1.8} />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}

export default NotFound;