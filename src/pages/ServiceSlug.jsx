import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import serviceData from "../data/servicesData";
import styles from "./ServicesSlug.module.css";

function usePageSEO(titleText, descriptionText) {
  useEffect(() => {
    if (titleText) {
      document.title = titleText;
    }
    if (descriptionText) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", descriptionText);
    }
  }, [titleText, descriptionText]);
}

function formatCurrency(amount, currency = "CAD", locale = "en-CA") {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount}`;
  }
}

export default function ServiceSlug() {
  const { slug } = useParams();
  const entry = serviceData[slug];

  const pageTitle = entry
    ? `${entry.title} Mehndi | Mehndi by Simra`
    : "Service Not Found | Mehndi by Simra";

  const pageDescription = entry
    ? entry.lede
    : "The service you’re looking for wasn’t found. Explore Bridal, Festival, or Party mehndi options from Mehndi by Simra.";

  usePageSEO(pageTitle, pageDescription);

  const content = useMemo(() => {
    if (!entry) return null;

    return (
      <>
        <header className={styles.header}>
          <h1 className={styles.title}>{entry.title}</h1>
          <p className={styles.lede}>{entry.lede}</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>What’s included</h2>
          <ul className={styles.bullets}>
            {entry.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>

        {/* Single image with bottom-right logo badge */}
        <section className={styles.section}>
          <div className={styles.imageWrap}>
            <img
              src={entry.gallery[0]}
              alt={`${entry.title} example`}
              className={styles.mainImage}
            />
            <a
              href="/"
              className={styles.logoBadge}
              aria-label="Mehndi By Simra"
            >
              <img src="/images/logo.png" alt="Mehndi By Simra logo" />
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Simple Pricing</h2>
          <p className={styles.note}>Pricing for this service is listed here.</p>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>From&nbsp;$</th>
                </tr>
              </thead>
              <tbody>
                {entry.prices.map((row, i) => (
                  <tr key={i}>
                    <td>{row.label}</td>
                    <td>{formatCurrency(row.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Centered Book Now */}
          <div
            className={styles.ctaRow}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <a
              className={styles.bookBtn}
              href={`mailto:hello@mehndibysimra.com?subject=${encodeURIComponent(
                `Booking inquiry: ${entry.title}`
              )}&body=${encodeURIComponent(
                `Hi Simra,%0D%0A%0D%0AI'd like to book ${entry.title.toLowerCase()} mehndi.%0D%0AEvent date:%0D%0ALocation (City):%0D%0AGuests/Coverage:%0D%0AOther notes:%0D%0A%0D%0AThanks!`
              )}`}
            >
              Book Now
            </a>
          </div>
        </section>
      </>
    );
  }, [entry]);

  return (
    <main className={styles.container}>
      {entry ? (
        content
      ) : (
        <div className={styles.notFound}>
          <h1 className={styles.title}>We couldn’t find that service</h1>
          <p className={styles.lede}>
            Try our Bridal, Festival, or Party pages—or head back home.
          </p>
          <div className={styles.notFoundLinks}>
            <Link to="/" className={styles.link}>
              Back to Home
            </Link>
            <Link to="/bridal" className={styles.linkAlt}>
              Bridal
            </Link>
            <Link to="/festival" className={styles.linkAlt}>
              Festival
            </Link>
            <Link to="/party" className={styles.linkAlt}>
              Party
            </Link>
          </div>
        </div>
      )}

      <nav className={styles.footerNav}>
        <Link to="/" className={styles.link}>
          Back to Home
        </Link>
        <Link to="/#about" className={styles.linkAlt}>
          Back to About
        </Link>
      </nav>
    </main>
  );
}
