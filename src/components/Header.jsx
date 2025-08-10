import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoSection} onClick={() => setMenuOpen(false)}>
        <img
          src="/images/logo.png"
          alt="Mehndi By Simra Logo"
          className={styles.logo}
        />
        <div className={styles.logoText}>
          <span className={styles.top}>Mehndi By</span>
          <span className={styles.bottom}>Simra</span>
        </div>
      </Link>

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
        className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
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
