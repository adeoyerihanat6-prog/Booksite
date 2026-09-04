import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import EditorsPicks from "../components/EditorsPicks";
import Hero from "../components/Hero";
import MoodLibrary from "../components/MoodLibrary";
import ContinueReading from "../components/ContinueReading";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#moods") {
      const timer = setTimeout(() => {
        document.getElementById("moods")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <MoodLibrary />
      <ContinueReading/>
      <EditorsPicks />
    </>
  );
}

export default Home;