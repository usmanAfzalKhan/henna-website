// src/pages/Home.jsx
import React from "react";
import styles from "./Home.module.css";
import Hero from "../components/Hero";
import Description from "../components/Description";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Hero />
      <Description />
      {/* <OffersRow /> */}
    </div>
  );
}
