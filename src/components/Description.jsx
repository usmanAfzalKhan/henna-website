import React from "react";
import styles from "./Description.module.css";

export default function Description({
  title = "Refined Henna, Thoughtfully Done",
  intro =
    "Clean lines, rich stain, and designs that feel like you. From intimate parties to full bridal work, we bring calm, detail-focused artistry so you can relax and enjoy your event.",
  services = [
    {
      key: "bridal",
      name: "Bridal",
      blurb:
        "Intricate coverage with consult, planning, and aftercare guidance. Timed so your stain peaks on the day.",
      href: "/bridal",
      cta: "Explore Bridal Service →",
      image: "/images/services/bridal-hand.webp",
    },
    {
      key: "festival",
      name: "Festive",
      blurb:
        "Photogenic patterns for Eid, Diwali, and community nights. Quick sets with beautiful flow and consistency.",
      href: "/festival",
      cta: "Explore Festive Service →",
      image: "/images/services/festival-hand.webp",
    },
    {
      key: "party",
      name: "Party",
      blurb:
        "Minimal to statement looks for birthdays, showers, and girls’ nights. Book by time or guest count.",
      href: "/party",
      cta: "Explore Party Service →",
      image: "/images/services/party-hand.webp",
    },
  ],
}) {
  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        {/* Existing hero-style header */}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.lede}>{intro}</p>

        {/* What We Do intro + ANCHOR TARGET */}
        <div
          className={styles.servicesIntro}
          id="what-we-do"
          style={{ scrollMarginTop: "120px" }} // offset for sticky header
        >
          <h2 className={styles.title}>What We Do</h2>
          <p className={styles.lede}>
            Explore our core services—Bridal, Festive, and Party mehndi. Each
            service page includes sample designs, package details, and clear
            pricing so you can choose what fits and book with confidence.
          </p>
        </div>

        <ul
          className={styles.list}
          aria-label="Services overview"
          id="services-overview" // ← remains for other anchors if needed
        >
          {services.map((s) => (
            <li key={s.key} className={styles.row}>
              <div className={styles.thumb}>
                <img
                  src={s.image}
                  alt={`${s.name} mehndi example`}
                  loading="lazy"
                />
              </div>

              <div className={styles.text}>
                <h3 className={styles.name}>{s.name}</h3>
                <p className={styles.blurb}>{s.blurb}</p>
              </div>

              <a className={styles.link} href={s.href}>
                {s.cta}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
