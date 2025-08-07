// src/pages/Home.jsx
import React from "react";
import styles from "./Home.module.css";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Hero />

      <section className={styles.intro}>
        <h2 className={styles.introTitle}>Artistry Meets Tradition</h2>
        <p className={styles.introText}>
          Mehndi by Simra delivers refined henna artistry tailored to each client’s vision.
          By combining traditional techniques with contemporary design, we create distinctive
          patterns that elevate any occasion and leave a lasting impression.
        </p>
      </section>

      {/* Add your offers/services row, etc. */}
      {/* <OffersRow /> */}
    </div>
  );
}
