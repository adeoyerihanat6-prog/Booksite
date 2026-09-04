import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Returning from a Mood Results page
    if (
      location.pathname === "/" &&
      location.state?.restoreMoods
    ) {
      const moodsSection = document.getElementById("moods");

      if (moodsSection) {
        requestAnimationFrame(() => {
          moodsSection.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        });
      }

      return;
    }

    // Returning to a specific section using a URL hash
    if (location.hash) {
      const section = document.getElementById(
        location.hash.replace("#", "")
      );

      if (section) {
        requestAnimationFrame(() => {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });

        return;
      }
    }

    // Normal page navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname, location.hash, location.state]);

  return null;
}

export default ScrollToTop;