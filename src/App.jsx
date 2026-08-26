import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
   <div
  className={theme === "light" ? "light" : ""}
  style={{
    minHeight: "100vh",
    background: "var(--background)",
    color: "var(--foreground)",
  }}>
      <h1>Our Book Website</h1>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
  Switch Theme
</button>
    </div>
  );
}

export default App;