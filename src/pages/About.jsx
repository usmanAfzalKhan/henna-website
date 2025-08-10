// src/pages/About.jsx
import React, { useEffect } from "react";
import styles from "./About.module.css";

export default function About() {
  useEffect(() => {
    document.title = "About | Mehndi by Simra";
  }, []);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About Mehndi by Simra</h1>
        <p className={styles.lede}>
          For over nine years, Simra has been transforming hands into living
          works of art. From intimate gatherings to grand celebrations, her
          passion for mehndi is more than tradition—it’s a way to bring joy and
          beauty to every special occasion.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.h2}>Our Love for Mehndi</h2>
        <p>
          Mehndi is more than a design; it’s a connection to culture, joy, and
          celebration. We love the magic of applying mehndi during weddings,
          Eid, Diwali, bridal showers, and family events—moments where every
          swirl and pattern adds to the memories being made. Seeing the smiles
          and excitement of clients as the stain blooms is what keeps us
          inspired.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Why Choose Us</h2>
        <p>
          We believe in creating designs that feel personal, elegant, and
          perfectly suited to the event. Our focus on clean lines, rich stain,
          and comfortable application means you can enjoy your day while knowing
          your mehndi will look stunning. With attention to detail, punctuality,
          and a warm, client-first approach, we aim to make your mehndi
          experience as memorable as the event itself.
        </p>
      </section>

      {/* Logo at the bottom */}
      <div className={styles.logoWrap}>
        <img
          src="/images/logo.png"
          alt="Mehndi by Simra Logo"
          className={styles.logo}
        />
      </div>
    </main>
  );
}
