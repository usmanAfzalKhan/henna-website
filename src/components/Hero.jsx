// src/components/Hero.jsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import slides from "../data/slides";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  // ref to the hero section so we can find the next section (Description)
  const heroRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const THRESHOLD = 60;

  const onStart = (x) => { setDragging(true); startX.current = x; };
  const onMove = (x) => { if (dragging) setDragOffset(x - startX.current); };
  const onEnd = () => {
    if (!dragging) return;
    const dx = dragOffset;
    setDragging(false);
    setDragOffset(0);
    if (dx > THRESHOLD) prev();
    else if (dx < -THRESHOLD) next();
  };

  const handleTouchStart = (e) => onStart(e.touches[0].clientX);
  const handleTouchMove  = (e) => onMove(e.touches[0].clientX);
  const handleTouchEnd   = () => onEnd();

  const handleMouseDown  = (e) => onStart(e.clientX);
  const handleMouseMove  = (e) => onMove(e.clientX);
  const handleMouseUp    = () => onEnd();
  const handleMouseLeave = () => onEnd();

  const base = -current * 100;
  const offsetPct = (dragOffset / Math.max(window.innerWidth, 1)) * 100;
  const trackStyle = {
    transform: `translateX(calc(${base}% + ${dragging ? offsetPct : 0}%))`,
    transition: dragging ? "none" : "transform 400ms ease",
  };

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Hero">
      <div
        className={`${styles.track} ${dragging ? styles.dragging : ""}`}
        style={trackStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {slides.map((s, i) => {
          const img = isMobile ? s.imageMobile : s.imageDesktop;
          const bgPos = s.bgPosition || "center";
          return (
            <div
              key={s.id ?? i}
              className={styles.slide}
              style={{
                backgroundImage: `url(${img})`,
                backgroundPosition: bgPos,
              }}
              aria-hidden={i !== current}
            />
          );
        })}
      </div>

      <div className={styles.gradient} />

      {(() => {
        const s = slides[current];
        const side = s.contentSide === "right" ? styles.contentRight : styles.contentLeft;

        // First slide CTA → scroll to Description's Services overview <ul aria-label="Services overview">
        const onCtaClick = (e) => {
          if (s.id === 1 || current === 0) {
            e.preventDefault();

            // 1) Find the services list by aria-label (stable with CSS Modules)
            let listEl = document.querySelector('[aria-label="Services overview"]');

            // 2) If not found, prefer the next section after hero (Description) and look inside it
            if (!listEl) {
              const getNextElement = (el) => {
                let n = el?.nextSibling;
                while (n && n.nodeType !== 1) n = n.nextSibling;
                return n || null;
              };
              const descSection = getNextElement(heroRef.current);
              if (descSection) {
                listEl =
                  descSection.querySelector('[aria-label="Services overview"]') ||
                  descSection.querySelector("ul");
              }
            }

            // 3) Scroll into view with a margin so cards sit nicely under the header/lede
            if (listEl && typeof listEl.scrollIntoView === "function") {
              const prevMargin = listEl.style.scrollMarginTop;
              listEl.style.scrollMarginTop = "120px"; // adjust if you want more/less gap
              listEl.scrollIntoView({ behavior: "smooth", block: "start" });

              // Clean up the temporary margin after the scroll finishes
              setTimeout(() => {
                listEl.style.scrollMarginTop = prevMargin || "";
              }, 600);

              return;
            }

            // 4) Fallback: scroll to the section right after hero
            const fallback = heroRef.current?.nextElementSibling;
            if (fallback && typeof fallback.scrollIntoView === "function") {
              fallback.scrollIntoView({ behavior: "smooth", block: "start" });
              return;
            }

            // 5) Last resort: follow the link
            window.location.href = s.link;
          }
        };

        return (
          <div className={`${styles.content} ${side}`}>
            <h1>{s.title}</h1>
            <p>{s.subtitle}</p>
            <a className={styles.cta} href={s.link} onClick={onCtaClick}>
              {s.buttonText}
            </a>
          </div>
        );
      })()}

      <button className={styles.prev} onClick={prev} aria-label="Previous slide">‹</button>
      <button className={styles.next} onClick={next} aria-label="Next slide">›</button>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === current ? styles.dotActive : styles.dot}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <a href="/" className={styles.logoBadge} aria-label="Mehndi By Simra">
        <img src="/images/logo.png" alt="Mehndi By Simra logo" />
      </a>
    </section>
  );
}
