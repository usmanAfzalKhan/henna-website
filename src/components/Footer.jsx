import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoWrap}>
        <img src="/images/logo.png" alt="Mehndi by Simra logo" className={styles.logo} />
      </div>
      <div className={styles.info}>
        <p>&copy; {new Date().getFullYear()} Mehndi by Simra. All rights reserved.</p>
        <p>
          Follow us on
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
