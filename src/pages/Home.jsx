// src/pages/Home.jsx
import React from "react";
import styles from "./Home.module.css";
import Hero from "../components/Hero";
import Description from "../components/Description";
import EidSpecial from "../components/EidSpecial";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Hero />
      <Description />
      <EidSpecial />
    </div>
  );
}