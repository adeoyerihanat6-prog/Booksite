import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";


function App() {
  const [theme, setTheme] = useState("dark");

  return (
   <div className={theme === "light" ? "light" : ""}
  style={{ minHeight: "100vh",  background: "var(--background)", color: "var(--foreground)",}}>
      <Navbar  theme={theme} setTheme={setTheme}/>
     <Home/>
    </div>
  );
}

export default App;