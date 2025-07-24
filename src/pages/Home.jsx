// src/pages/Home.jsx
import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <img
        src="/images/logo.png"
        alt="Mehndi by Simra"
        className={styles.logo}
      />
      <h1 className={styles.heading}>Welcome to Mehndi by Simra</h1>
      <p className={styles.text}>
        Beautiful, traditional, and modern mehndi designs for all occasions.
        Bridal, festival, and party packages available. Discover Simra’s elegant artistry!
      </p>
      <a href="/services" className={styles.button}>
        View Services
      </a>
    </div>
  );
};

export default Home;
