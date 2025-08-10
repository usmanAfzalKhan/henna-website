import React from "react";
import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About Mehndi by Simra</h1>
        <p className={styles.lede}>
          At Mehndi by Simra, every design tells a story. With over 9 years of
          experience, Simra blends traditional artistry with modern elegance.
          Whether it’s a small gathering or a grand celebration, her work is
          loved for its precision, beauty, and lasting impact.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.h2}>Our Passion</h2>
        <p>
          Simra’s love for mehndi began at family celebrations and quickly grew
          into a professional craft. She finds joy in making clients feel
          special, capturing the excitement of weddings, festivals, and
          milestone moments through intricate designs.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Why Choose Us</h2>
        <p>
          From detailed consultation to expert application, we focus on giving
          each client a smooth, enjoyable experience. Our designs are customized
          to match your vision, ensuring your mehndi not only looks stunning
          but also holds personal meaning.
        </p>
      </section>

      {/* Refined CTA section */}
      <section className={styles.galleryCta}>
        <div className={styles.galleryCard}>
          <h3 className={styles.galleryHeading}>See the artistry up close</h3>
          <p className={styles.galleryText}>
            Browse real designs from bridal, festival, and party bookings.
          </p>
          <a href="/gallery" className={styles.galleryBtn}>
            View Our Gallery →
          </a>
        </div>
      </section>

      <div className={styles.logoWrap}>
        <img
          src="/images/logo.png"
          alt="Mehndi By Simra Logo"
          className={styles.logo}
        />
      </div>
    </div>
  );
}
