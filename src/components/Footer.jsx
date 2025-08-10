// src/components/Footer.jsx
import React from "react";
import styles from "./Footer.module.css";
import logo from "../assets/logo.png"; // add a small logo asset here

const Icon = {
  Instagram: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.75A5.25 5.25 0 1 1 6.75 13 5.25 5.25 0 0 1 12 7.75zm0 2A3.25 3.25 0 1 0 15.25 13 3.25 3.25 0 0 0 12 9.75zM18.5 6.5a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 18.5 6.5z" />
    </svg>
  ),
  Facebook: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.22 10.44 22v-6.99H7.9v-2.94h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.94h-2.34V22C18.34 21.22 22 17.09 22 12.07z" />
    </svg>
  ),
  Phone: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M6.62 10.79a15.09 15.09 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a2 2 0 0 1-2.18 2 17.99 17.99 0 0 1-7.89-3.06 18.37 18.37 0 0 1-5.6-5.6A17.99 17.99 0 0 1 2 5.18 2 2 0 0 1 4 3h3.49a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.02l-2.2 2.2z" />
    </svg>
  ),
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src={logo} alt="Mehndi by Simra logo" className={styles.logoImg} />
          <span className={styles.brandText}>Mehndi by Simra</span>
        </div>

        <nav className={styles.actions} aria-label="Contact and social links">
          <a
            className={styles.iconBtn}
            href="https://www.instagram.com/mehndibysimra/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Icon.Instagram className={styles.icon} />
          </a>

          <a
            className={styles.iconBtn}
            href="https://www.facebook.com/MehndiBySimra/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Icon.Facebook className={styles.icon} />
          </a>

          <a
            className={styles.iconBtn}
            href="tel:6479360392"
            aria-label="Call 647-936-0392"
          >
            <Icon.Phone className={styles.icon} />
          </a>
        </nav>

        <div className={styles.copy}>
          <small>© Mehndi by Simra. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
