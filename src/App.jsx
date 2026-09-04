import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import MoodResults from "./pages/MoodResults";
import BookDetails from "./pages/BookDetails";
import Reader from "./pages/Reader";
import Genres from "./pages/Genres";
import GenreResults from "./pages/GenreResults";
import About from "./pages/About";
import SavedBooks from "./pages/SavedBooks";

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

        {/* Genres / Library */}
        <Route
          path="/genres"
          element={<Genres />}
        />

        <Route
          path="/genres/:genreName"
          element={<GenreResults />}
        />

        {/* Saved Books */}
        <Route
          path="/saved"
          element={<SavedBooks />}
        />

        {/* About */}
        <Route
          path="/about"
          element={<About />}
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