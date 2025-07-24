import React from "react";
import styles from "./Home.module.css";
// Import any Home components (like Hero, OffersRow) you want to include

export default function Home() {
  return (
    <div className={styles.homepage}>
      {/* Optional: Insert a Hero component here, or an intro image/slider */}
      {/* <Hero /> */}
      <section className={styles.homepageWelcome}>
        <h1>Welcome to Mehndi by Simra</h1>
        <p>
          Elevate your celebrations with our bespoke mehndi designs—crafted with passion, tradition, and creativity. Whether it's for bridal elegance, festive joy, or party flair, Simra transforms hands and hearts with timeless artistry.
        </p>
      </section>
      <p
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.2rem",
          margin: "0.4rem 0",
          paddingLeft: "0.8rem",
          paddingRight: "0.8rem",
        }}
      >
        Let us make your special moments truly memorable with the beauty of mehndi.
      </p>
      {/* Add your offers/services row, etc. */}
      {/* <OffersRow /> */}
    </div>
  );
}
