import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./GalleryDetail.module.css";
import galleryData from "../data/galleryData";

const ORDER = ["bridal", "festival", "party"];

export default function GalleryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const category = useMemo(() => {
    const bySlug = Object.values(galleryData).find((c) => c.slug === slug);
    return bySlug || { title: "Gallery", items: [], slug };
  }, [slug]);

  const items = category.items || [];

  const nextInfo = useMemo(() => {
    const idx = ORDER.indexOf(slug);
    const nextSlug = ORDER[(idx + 1 + ORDER.length) % ORDER.length];
    const nextCat = Object.values(galleryData).find((c) => c.slug === nextSlug);
    return { slug: nextSlug, title: nextCat?.title || "Gallery" };
  }, [slug]);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = useCallback((i) => {
    setIndex(i);
    setOpen(true);
    document.body.style.overflow = "hidden";
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  const blurb =
    slug === "bridal"
      ? "Timeless bridal artistry with balanced composition and clean finishes."
      : slug === "festival"
      ? "Joyful, camera-ready designs crafted for Eid, Diwali, and every celebration."
      : slug === "party"
      ? "Modern party looks—quick to apply, elegant to wear, perfect for photos."
      : "Curated designs from our collection.";

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>{category.title}</h1>
          <p className={styles.subtitle}>{blurb}</p>
        <p className={styles.tip}><em>Click any image to expand.</em></p>
        </header>

        {/* Grid: 3 columns desktop, 2 on mobile */}
        <section className={styles.grid} aria-label={`${category.title} items`}>
          {items.length === 0 && <div className={styles.empty}>Coming soon.</div>}

          {items.map((it, i) => (
            <button
              key={`${it.type}-${i}`}
              className={`${styles.tile} ${styles.appear}`}
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => openAt(i)}
              aria-label={`Open item ${i + 1}`}
            >
              <div className={styles.mediaBox}>
                {it.type === "image" ? (
                  <img
                    src={it.src}
                    alt=""
                    className={styles.media}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <video
                    className={`${styles.media} ${styles.video}`}
                    src={it.src}
                    muted
                    preload="metadata"
                  />
                )}
                {/* logo overlay on tiles */}
                <img
                  className={styles.logoMark}
                  src="/images/logo.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </section>

        {/* Footer buttons */}
        <div className={styles.footerNav}>
          <Link to="/gallery" className={styles.galleryBtn}>Go to Gallery</Link>
          <button
            className={styles.galleryBtnAlt}
            onClick={() => navigate(`/gallery/${nextInfo.slug}`)}
          >
            Go to {nextInfo.title}
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && items[index] && (
        <div className={styles.modal} role="dialog" aria-modal="true">
          <div className={styles.backdrop} onClick={close} />

          <div className={styles.modalInner}>
            {/* stage keeps a consistent size */}
            <div
              className={styles.stage}
              onClick={(e) => {
                // Close if clicking/tapping anywhere that is NOT media, arrows, or X
                if (
                  !e.target.closest(`.${styles.modalMedia}`) &&
                  !e.target.closest(`.${styles.navLeft}`) &&
                  !e.target.closest(`.${styles.navRight}`) &&
                  !e.target.closest(`.${styles.close}`)
                ) {
                  close();
                }
              }}
            >
              {items[index].type === "image" ? (
                <img
                  src={items[index].src}
                  alt=""
                  className={styles.modalMedia}
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <video
                  className={styles.modalMedia}
                  src={items[index].src}
                  controls
                  autoPlay
                />
              )}

              {/* controls close to media, visible on mobile */}
              <button className={styles.navLeft} onClick={prev} aria-label="Previous">‹</button>
              <button className={styles.navRight} onClick={next} aria-label="Next">›</button>
              <button className={styles.close} onClick={close} aria-label="Close">✕</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
