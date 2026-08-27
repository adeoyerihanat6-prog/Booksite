import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
   <div className={theme === "light" ? "light" : ""}
  style={{ minHeight: "100vh",  background: "var(--background)", color: "var(--foreground)",}}>
      <Navbar  theme={theme} setTheme={setTheme}/>
    </div>
  );
}

export default App;