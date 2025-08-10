import React, { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img
          src="/images/logo.png"
          alt="Mehndi By Simra Logo"
          className={styles.logo}
          onMouseEnter={() => {}}
        />
        <div className={styles.logoText}>
          <span>Mehndi By</span>
          <span>Simra</span>
        </div>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.showMenu : ""}`}>
        <a href="/" className={styles.link} onClick={() => setMenuOpen(false)}>
          Home
        </a>
        <a href="/about" className={styles.link} onClick={() => setMenuOpen(false)}>
          About
        </a>
        <a href="/gallery" className={styles.link} onClick={() => setMenuOpen(false)}>
          Gallery
        </a>
        <a href="/faq" className={styles.link} onClick={() => setMenuOpen(false)}>
          FAQ
        </a>
        <a href="/contact" className={styles.link} onClick={() => setMenuOpen(false)}>
          Contact
        </a>
      </nav>

      <div
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </div>
    </header>
  );
};

export default Header;
