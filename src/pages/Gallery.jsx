import React from "react";
import { Link } from "react-router-dom";
import styles from "./Gallery.module.css";
import galleryData from "../data/galleryData";

export default function Gallery() {
  const categories = Object.values(galleryData);

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Our Gallery</h1>
          <p className={styles.subtitle}>
            Explore three curated collections—Bridal, Festive, and Party. Each
            gallery highlights clean, balanced designs that photograph beautifully
            and wear comfortably for your event. Tap a collection to see close-ups,
            full hands, and short video clips.
          </p>
          <p className={styles.tip}><em>Tap a collection to view designs.</em></p>
        </header>

        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <Link
              to={`/gallery/${cat.slug}`}
              key={cat.slug}
              className={`${styles.card} ${styles.appear}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={styles.thumbWrap}>
                {cat.cardThumb ? (
                  <>
                    <img
                      src={cat.cardThumb}
                      alt={`${cat.title} thumbnail`}
                      className={styles.thumb}
                      loading="lazy"
                      decoding="async"
                    />
                    {/* logo overlay bottom-right */}
                    <img
                      src="/images/logo.png"
                      alt=""
                      aria-hidden="true"
                      className={styles.logoMark}
                    />
                  </>
                ) : (
                  <div className={styles.thumbPlaceholder}>Coming soon</div>
                )}
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{cat.title}</h2>
                <p className={styles.cardText}>
                  {cat.items?.length ? `${cat.items.length} items` : "No items yet"}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ Call-to-Action */}
        <div className={styles.faqCta}>
          <p className={styles.faqText}>Got questions about our services?</p>
          <Link to="/faq" className={styles.faqBtn}>
            Visit Our FAQ →
          </Link>
        </div>
      </div>
    </main>
  );
}
