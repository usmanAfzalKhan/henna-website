import React from "react";
import styles from "./EidSpecial.module.css";

export default function EidSpecial({
  title = "Eid Special",
  percent = 10,
  cause = "Palestine",
  blurb = "Share beautiful mehndi—and give back.",
  ctaHref = "/contact",           // ← default to Contact page
  ctaLabel = "Book Now",
}) {
  return (
    <section className={styles.section} aria-labelledby="eidPromoTitle">
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.badge}>{percent}% donated</div>

          <h2 id="eidPromoTitle" className={styles.title}>
            {title}
          </h2>

          <p className={styles.copy}>
            {blurb} <strong>{percent}%</strong> of proceeds from this campaign are
            donated towards <strong>{cause}</strong>.
          </p>

          {/* Takes user to Contact page */}
          <a className={styles.cta} href={ctaHref} aria-label={ctaLabel}>
            {ctaLabel}
          </a>

          <div className={styles.flagBar} aria-hidden="true">
            <span className={styles.fRed} />
            <span className={styles.fWhite} />
            <span className={styles.fGreen} />
            <span className={styles.fBlack} />
          </div>
        </div>
      </div>
    </section>
  );
}
