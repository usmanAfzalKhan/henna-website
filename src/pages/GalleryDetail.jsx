// src/pages/GalleryDetail.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import galleryData from "../data/galleryData";
import styles from "./Gallery.module.css";

function useKey(key, handler) {
  useEffect(() => {
    const onKey = (e) => e.key === key && handler(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, handler]);
}

export default function GalleryDetail() {
  const { slug } = useParams();
  const entry = galleryData[slug];
  const [active, setActive] = useState(null); // index for modal

  const title = entry ? `${entry.title} | Mehndi by Simra` : "Not Found | Mehndi by Simra";
  useEffect(() => {
    document.title = title;
  }, [title]);

  const items = useMemo(() => (entry ? entry.items : []), [entry]);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => {
    setActive((i) => (i == null ? null : (i + items.length - 1) % items.length));
  }, [items.length]);
  const next = useCallback(() => {
    setActive((i) => (i == null ? null : (i + 1) % items.length));
  }, [items.length]);

  useKey("Escape", close);
  useKey("ArrowLeft", prev);
  useKey("ArrowRight", next);

  if (!entry) {
    return (
      <main className={styles.container}>
        <div className={styles.notFound}>
          <h1 className={styles.title}>Gallery not found</h1>
          <p className={styles.lede}>Try Bridal, Festival, or Party.</p>
          <div className={styles.footerNav}>
            <Link to="/gallery" className={styles.galleryBtn}>Back to Gallery</Link>
            <Link to="/" className={styles.galleryBtnAlt}>Back to Home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{entry.title}</h1>
        <p className={styles.lede}>
          Click any item to view it in the lightbox. Use &lt; and &gt; to navigate.
        </p>
      </header>

      <section className={styles.masonry} aria-label={`${entry.title} thumbnails`}>
        {items.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
              color: "#ffd700",
              opacity: 0.9,
              padding: "1rem",
            }}
          >
            Content coming soon.
          </div>
        )}

        {items.map((it, i) => (
          <button
            key={i}
            className={styles.thumbBtn}
            onClick={() => setActive(i)}
            aria-label={`Open ${it.type === "video" ? "video" : "image"} ${i + 1}`}
          >
            {it.type === "video" ? (
              <video
                className={styles.thumbMedia}
                src={it.src}
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                className={styles.thumbMedia}
                src={it.src}
                alt={it.alt || entry.title}
                loading="lazy"
              />
            )}
          </button>
        ))}
      </section>

      <nav className={styles.footerNav}>
        <Link to="/gallery" className={styles.galleryBtn}>Back to Gallery</Link>
        <Link to="/" className={styles.galleryBtnAlt}>Back to Home</Link>
      </nav>

      {/* Lightbox */}
      {active !== null && items[active] && (
        <div className={styles.modal} role="dialog" aria-modal="true" onClick={close}>
          <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} aria-label="Close" onClick={close}>
              ✕
            </button>

            <button className={`${styles.navBtn} ${styles.left}`} aria-label="Previous" onClick={prev}>
              ‹
            </button>

            <div className={styles.stage}>
              {items[active].type === "video" ? (
                <video
                  src={items[active].src}
                  className={styles.stageMedia}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={items[active].src}
                  alt={items[active].alt || entry.title}
                  className={styles.stageMedia}
                />
              )}
            </div>

            <button className={`${styles.navBtn} ${styles.right}`} aria-label="Next" onClick={next}>
              ›
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
