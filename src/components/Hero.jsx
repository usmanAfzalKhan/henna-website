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

  // refs
  const heroRef = useRef(null);
  const ctaRef = useRef(null); // ← native listeners for reliability

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

  // ---- scrolling helpers ----
  const findServicesList = () => {
    let el = document.querySelector('[aria-label="Services overview"]');
    if (el) return el;

    // next element sibling after hero (Description wrapper)
    let n = heroRef.current?.nextSibling;
    while (n && n.nodeType !== 1) n = n.nextSibling;
    const desc = n || null;
    if (desc) {
      el = desc.querySelector('[aria-label="Services overview"]') || desc.querySelector("ul");
      if (el) return el;
    }
    return null;
  };

  const smoothScrollTo = (target, offset = 120) => {
    if (!target) return false;
    const prev = target.style.scrollMarginTop;
    target.style.scrollMarginTop = `${offset}px`;
    try {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      setTimeout(() => { target.style.scrollMarginTop = prev || ""; }, 700);
    }
    return true;
  };

  // Attach **native** listeners to the CTA when slide 1 is active
  useEffect(() => {
    const a = ctaRef.current;
    const s = slides[current];
    const isFirst = s?.id === 1 || current === 0;
    if (!a || !isFirst) return;

    let downX = 0, downY = 0, downT = 0, moved = false;

    const onPointerDown = (ev) => {
      // capture start to distinguish tap vs swipe
      downX = ev.clientX ?? (ev.touches && ev.touches[0]?.clientX) ?? 0;
      downY = ev.clientY ?? (ev.touches && ev.touches[0]?.clientY) ?? 0;
      downT = performance.now();
      moved = false;
      ev.stopPropagation(); // keep slider from stealing the gesture
    };

    const onPointerMove = (ev) => {
      const x = ev.clientX ?? (ev.touches && ev.touches[0]?.clientX) ?? downX;
      const y = ev.clientY ?? (ev.touches && ev.touches[0]?.clientY) ?? downY;
      if (Math.abs(x - downX) > 8 || Math.abs(y - downY) > 8) moved = true;
    };

    const activate = (ev) => {
      // treat as click only if not a swipe
      const dt = performance.now() - downT;
      if (moved && dt < 800) return; // likely a swipe; ignore

      ev.preventDefault();
      ev.stopPropagation();

      // use double-rAF to avoid mobile lazy-layout races
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const list = findServicesList();
          if (list) smoothScrollTo(list, 120);
          else {
            const nextEl = (() => {
              let n = heroRef.current?.nextSibling;
              while (n && n.nodeType !== 1) n = n.nextSibling;
              return n || null;
            })();
            if (nextEl) smoothScrollTo(nextEl, 0);
          }
        });
      });
    };

    // Add listeners (pointer covers mouse+touch on modern browsers)
    a.addEventListener("pointerdown", onPointerDown, { passive: true });
    a.addEventListener("pointermove", onPointerMove, { passive: true });
    a.addEventListener("pointerup", activate, { passive: false });
    a.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); }, { passive: false });

    return () => {
      a.removeEventListener("pointerdown", onPointerDown);
      a.removeEventListener("pointermove", onPointerMove);
      a.removeEventListener("pointerup", activate);
    };
  }, [current]);

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
              style={{ backgroundImage: `url(${img})`, backgroundPosition: bgPos }}
              aria-hidden={i !== current}
            />
          );
        })}
      </div>

      <div className={styles.gradient} />

      {(() => {
        const s = slides[current];
        const side = s.contentSide === "right" ? styles.contentRight : styles.contentLeft;
        const isFirst = s.id === 1 || current === 0;

        return (
          <div className={`${styles.content} ${side}`}>
            <h1>{s.title}</h1>
            <p>{s.subtitle}</p>
            <a
              ref={ctaRef}
              className={styles.cta}
              href={isFirst ? "#" : s.link}  // prevent navigation on first slide
              style={{ touchAction: "manipulation" }} // reduce touch delays
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
