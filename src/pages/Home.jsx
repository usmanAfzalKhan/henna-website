import React from "react";
import styles from "./Home.module.css";
import Hero from "../components/Hero";  // Import Hero component

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Hero />
      {/* Add your offers/services row, etc. */}
      {/* <OffersRow /> */}
    </div>
  );
}
