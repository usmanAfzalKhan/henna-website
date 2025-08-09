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
    <section className={styles.hero} aria-label="Hero">
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
        return (
          <div className={`${styles.content} ${side}`}>
            <h1>{s.title}</h1>
            <p>{s.subtitle}</p>
            <a className={styles.cta} href={s.link}>
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
