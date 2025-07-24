// src/pages/About.jsx
import React from "react";
import styles from "./About.module.css";

const About = () => (
  <div className={styles.about}>
    <h1 className={styles.heading}>About Mehndi by Simra</h1>
    <p className={styles.text}>
      Mehndi by Simra specializes in beautiful, intricate henna designs inspired by both traditional and modern styles. Simra is passionate about her craft and believes that mehndi is not just body art, but an experience of joy, celebration, and culture.
    </p>
    <p className={styles.text}>
      From brides to festival-goers and party guests, Simra takes pride in offering custom mehndi for all occasions—always with care, creativity, and a smile.
    </p>
    <img
      src="/images/about-mehndi.jpg" // <-- use your actual image or remove this line if not ready
      alt="About Simra"
      className={styles.image}
    />
  </div>
);

export default About;
