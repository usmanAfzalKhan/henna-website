import React from 'react';
import styles from './Hero.module.css'; // Use your scss if you want

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.content}>
      <h1>Mehndi By Simra</h1>
      <p>Elegant Bridal & Party Mehndi Art in the GTA</p>
      <a href="#contact" className={styles.cta}>Book Now</a>
    </div>
    {/* Optional: Add an image or illustration here */}
  </section>
);

export default Hero;
