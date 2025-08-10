import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();
  const { pathname, hash, key } = location;

  // Prevent the browser from restoring scroll for SPA nav
  useEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = prev || "auto";
    };
  }, []);

  useEffect(() => {
    const scrollMainAndWindowTop = () => {
      // If there’s a hash, jump to that element
      if (hash) {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }

      // Otherwise, force top on all likely scroll containers
      const main = document.querySelector("main");
      if (main) {
        main.scrollTop = 0;
      }
      document.documentElement.scrollTop = 0; // <html>
      document.body.scrollTop = 0;            // <body>
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Run after paint to ensure layout is ready
    requestAnimationFrame(() => {
      // extra frame helps when content loads async
      requestAnimationFrame(scrollMainAndWindowTop);
    });
  }, [pathname, hash, key]);

  return null;
}
