// src/pages/Gallery.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Gallery.module.css";
import galleryData from "../data/galleryData";

const CARDS = [
  { key: "bridal", title: "Bridal" },
  { key: "festival", title: "Festive" },
  { key: "party", title: "Party" },
];

export default function Gallery() {
  useEffect(() => {
    document.title = "Gallery | Mehndi by Simra";
  }, []);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Gallery</h1>
        <p className={styles.lede}>
          Explore featured looks from our Bridal, Festival, and Party services.
        </p>
      </header>

      <section className={styles.grid} aria-label="Gallery categories">
        {CARDS.map(({ key, title }) => {
          const entry = galleryData[key];
          const cover = entry?.cardThumb;
          return (
            <Link to={`/gallery/${key}`} className={styles.card} key={key}>
              <div className={styles.cardMedia}>
                {cover ? (
                  <img src={cover} alt={`${title} cover`} />
                ) : (
                  // Fallback if no image yet
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "Playfair Display, serif",
                      color: "#ffe174",
                      background:
                        "linear-gradient(180deg, rgba(255,225,116,0.08), rgba(255,225,116,0.04))",
                    }}
                  >
                    {title}
                  </div>
                )}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{title}</h3>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
