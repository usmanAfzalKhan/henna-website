import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import serviceData from "../data/servicesData";
import styles from "./ServicesSlug.module.css";

function usePageSEO(titleText, descriptionText) {
  useEffect(() => {
    if (titleText) document.title = titleText;
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

// ✅ show cents only when amount has cents (e.g., 99.99)
function formatCurrency(amount, currency = "CAD", locale = "en-CA") {
  const hasCents = Math.round((amount % 1) * 100) !== 0;
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: hasCents ? 2 : 0,
    }).format(amount);
  } catch {
    return hasCents ? `$${amount.toFixed(2)}` : `$${Math.round(amount)}`;
  }
}

export default function ServiceSlug() {
  const { slug } = useParams();
  const entry = serviceData[slug];

  const pageTitle = entry
    ? `${entry.title} | Mehndi by Simra`
    : "Service Not Found | Mehndi by Simra";

  const pageDescription = entry
    ? entry.lede
    : "The service you’re looking for wasn’t found. Explore Bridal, Festival, or Party mehndi options from Mehndi by Simra.";

  usePageSEO(pageTitle, pageDescription);

  // --- compute "next service" for the footer button ---
  const order = ["bridal", "festival", "party"];
  const idx = Math.max(0, order.indexOf(slug));
  const nextSlug = order[(idx + 1) % order.length];
  const nextTitle = serviceData[nextSlug]?.title || nextSlug;

  const content = useMemo(() => {
    if (!entry) return null;

    const hasCoverage = entry.prices.some((p) => !!p.coverage);

    const renderPrice = (row) => {
      const base = formatCurrency(row.amount);
      return row.unitSuffix ? `${base}${row.unitSuffix}` : base;
    };

    return (
      <>
        <header className={styles.header}>
          <h1 className={styles.title}>{entry.title}</h1>
          <p className={styles.lede}>{entry.lede}</p>
        </header>

        {/* 👇 Added: render the two extra paragraphs if present */}
        {Array.isArray(entry.extra) && entry.extra.length > 0 && (
          <section className={styles.section}>
            {entry.extra.map((para, i) => (
              <p key={`extra-${i}`} className={styles.lede}>
                {para}
              </p>
            ))}
          </section>
        )}

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
            <a href="/" className={styles.logoBadge} aria-label="Mehndi By Simra">
              <img src="/images/logo.png" alt="Mehndi By Simra logo" />
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Simple Pricing</h2>
          <p className={styles.note}>Pricing for this service is listed here.</p>

        <div className={styles.tableWrap}>
            <table className={styles.table} role="table">
              <thead>
                <tr>
                  <th>{entry.labelHeading}</th>
                  {hasCoverage && <th>Coverage</th>}
                  <th>{entry.priceHeading}</th>
                </tr>
              </thead>
              <tbody>
                {entry.prices.map((row, i) => (
                  <tr key={i}>
                    <td>{row.label}</td>
                    {hasCoverage && <td>{row.coverage || "—"}</td>}
                    <td>{renderPrice(row)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {entry.footnote && <p className={styles.footnote}>* {entry.footnote}</p>}

          {/* Centered Book Now */}
          <div className={styles.ctaRow} style={{ display: "flex", justifyContent: "center" }}>
            <Link
              className={styles.bookBtn}
              to={`/contact?service=${encodeURIComponent(slug)}`}
            >
              Book Now
            </Link>
          </div>
        </section>
      </>
    );
  }, [entry, slug]);

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
            <Link to="/" className={styles.link}>Back to Home</Link>
            <Link to="/bridal" className={styles.linkAlt}>Bridal</Link>
            <Link to="/festival" className={styles.linkAlt}>Festival</Link>
            <Link to="/party" className={styles.linkAlt}>Party</Link>
          </div>
        </div>
      )}

      <nav className={styles.footerNav}>
        <Link to="/" className={styles.galleryBtn}>Back to Home</Link>
        <Link to={`/${nextSlug}`} className={styles.galleryBtnAlt}>
          {nextTitle}
        </Link>
      </nav>
    </main>
  );
}
