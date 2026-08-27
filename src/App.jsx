
import { useState } from "react";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";

import MoodResults from "./pages/MoodResults";

import BookDetails from "./pages/BookDetails";

import Reader from "./pages/Reader";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <div
      className={theme === "light" ? "light" : ""}
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <ScrollToTop />

      <Navbar
        theme={theme}
        setTheme={setTheme}
      />

      <Routes>
        {/* Home */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* Genre */}

        <Route
          path="/genre"
          element={
            <div className="px-6 py-32">
              <h1 className="text-5xl font-light">
                Genre
              </h1>
            </div>
          }
        />

        {/* About */}

        <Route
          path="/about"
          element={
            <div className="px-6 py-32">
              <h1 className="text-5xl font-light">
                About
              </h1>
            </div>
          }
        />

        {/* Mood Results */}

        <Route
          path="/mood/:mood"
          element={<MoodResults />}
        />

        {/* Book Details */}

        <Route
          path="/book/:id"
          element={<BookDetails />}
        />

        {/* Reader */}

        <Route
          path="/read/:id"
          element={<Reader />}
        />
      </Routes>
    </div>
  );
}

export default App;

