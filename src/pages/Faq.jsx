// src/pages/Faq.jsx
import React, { useEffect, useRef, useState } from "react";
import faq from "../data/faq";
import styles from "./Faq.module.css";

function FaqItem({ item, index, isOpen, onToggle }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isOpen) {
      const full = inner.scrollHeight;
      wrap.style.height = "0px";
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      wrap.offsetHeight;
      wrap.style.transition = reduceMotion ? "none" : "height 220ms cubic-bezier(.28,1.28,.35,.97)";
      wrap.style.height = full + "px";

      const done = () => {
        if (isOpen) {
          wrap.style.transition = "none";
          wrap.style.height = "auto";
        }
        wrap.removeEventListener("transitionend", done);
      };
      wrap.addEventListener("transitionend", done);
    } else {
      const current = wrap.offsetHeight;
      wrap.style.transition = "none";
      wrap.style.height = current + "px";
      requestAnimationFrame(() => {
        wrap.style.transition = reduceMotion ? "none" : "height 200ms ease";
        wrap.style.height = "0px";
      });
    }
  }, [isOpen]);

  return (
    <article className={`${styles.item} ${styles.appear}`} style={{ animationDelay: `${index * 60}ms` }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        className={styles.question}
      >
        <span className={styles.qText}>{item.question}</span>
        <span aria-hidden="true" className={`${styles.symbol} ${isOpen ? styles.open : ""}`}>
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div id={`faq-panel-${index}`} role="region" ref={wrapRef} className={styles.answerWrap}>
        <div ref={innerRef} className={styles.answerInner}>
          <p className={styles.answerText}>{item.answer}</p>
        </div>
      </div>
    </article>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    document.title = "FAQ | Mehndi by Simra";
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>
            Answers to common questions about our mehndi services, care, and booking.
          </p>
        </header>

        <section aria-label="FAQ list" className={styles.list}>
          {faq.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
            />
          ))}
        </section>

        {/* NEW: Reviews CTA at bottom */}
        <div className={styles.reviewsCta}>
          <p className={styles.reviewsText}>Want to see what clients say?</p>
          <a href="/reviews" className={styles.reviewsBtn}>Read Our Reviews →</a>
        </div>
      </div>
    </main>
  );
}
