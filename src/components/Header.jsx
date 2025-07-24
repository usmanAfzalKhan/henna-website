import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom"; // or "next/link" if using Next.js

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrap}>
        <img
          src="/images/logo.png"
          alt="Mehndi by Simra"
          className={styles.logo}
        />
      </div>
      <nav className={styles.nav}>
        <a href="/" className={styles.link}>Home</a>
        <a href="/about" className={styles.link}>About</a>
        <a href="/gallery" className={styles.link}>Gallery</a>
        <a href="/services" className={styles.link}>Services</a>
        <a href="/faq" className={styles.link}>FAQ</a>
        <a href="/contact" className={styles.link}>Contact</a>
      </nav>
    </header>
  );
};

export default Header;
