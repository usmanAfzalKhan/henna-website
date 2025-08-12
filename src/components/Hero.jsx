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
  const onMove  = (x) => { if (dragging) setDragOffset(x - startX.current); };
  const onEnd   = () => {
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

  // --- helpers for CTA ---
  const findServicesList = () => {
    // Prefer the UL with aria-label (stable with CSS Modules)
    let el = document.querySelector('[aria-label="Services overview"]');
    if (el) return el;

    // Else look inside the next element sibling after hero (Description wrapper)
    const getNextElement = (node) => {
      let n = node?.nextSibling;
      while (n && n.nodeType !== 1) n = n.nextSibling;
      return n || null;
    };
    const desc = getNextElement(heroRef.current);
    if (desc) {
      el = desc.querySelector('[aria-label="Services overview"]') || desc.querySelector("ul");
      if (el) return el;
    }
    return null;
  };

  const smoothScrollTo = (target, offset = 120) => {
    if (!target) return false;
    try {
      // try scrollIntoView first (respects scroll containers)
      const prev = target.style.scrollMarginTop;
      target.style.scrollMarginTop = `${offset}px`;
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // restore after a tick
      setTimeout(() => { target.style.scrollMarginTop = prev || ""; }, 700);
      return true;
    } catch {
      // fallback to window scroll
      const rect = target.getBoundingClientRect();
      window.scrollTo({ top: rect.top + window.scrollY - offset, behavior: "smooth" });
      return true;
    }
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
        const isFirstSlide = s.id === 1 || current === 0;

        // robust activation for mobile (pointer covers mouse+touch)
        const onCtaActivate = (e) => {
          if (!isFirstSlide) return; // let non-first slides navigate normally
          e.preventDefault();
          e.stopPropagation();

          // wait one frame so any layout shifts settle (mobile)
          requestAnimationFrame(() => {
            const list = findServicesList();
            if (list) {
              // double rAF to avoid Safari race after lazy image decode
              requestAnimationFrame(() => { smoothScrollTo(list, 120); });
            } else {
              // fallback to the next section
              const nextEl = heroRef.current?.nextElementSibling;
              if (nextEl) smoothScrollTo(nextEl, 0);
            }
          });
        };

        return (
          <div className={`${styles.content} ${side}`}>
            <h1>{s.title}</h1>
            <p>{s.subtitle}</p>
            <a
              className={styles.cta}
              href={s.link}               // keep original link; we intercept only on slide 1
              onPointerUp={onCtaActivate} // mobile + desktop reliable
              onClick={(e) => isFirstSlide && (e.preventDefault(), onCtaActivate(e))}
            >
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
