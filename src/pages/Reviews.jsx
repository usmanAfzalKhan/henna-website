import React, { useEffect, useRef, useState } from "react";
import styles from "./Reviews.module.css";
import {
  fetchReviews,
  fetchMoreReviews, // ok to keep even if unused
  addReviewWithRotation,
  containsProfanity,
} from "../services/reviews";
import { seedReviews, seedReviewsToFirestore } from "../data/seedReviews"; // ← seeds + helper

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [lastDoc, setLastDoc] = useState(null); // ok to keep
  const [loading, setLoading] = useState(false); // used for initial fetch

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const flashRef = useRef(null);
  const remaining = 200 - text.length;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { items, lastDoc } = await fetchReviews();
      setReviews(items);
      setLastDoc(lastDoc);
      setLoading(false);
    })();

    // dev quality-of-life: expose seeder in dev only
    if (import.meta && import.meta.env && import.meta.env.DEV) {
      // run in console: await window.seedReviewsToFirestore()
      window.seedReviewsToFirestore = async () => {
        const created = await seedReviewsToFirestore();
        // refresh list after seeding
        const { items, lastDoc } = await fetchReviews();
        setReviews(items);
        setLastDoc(lastDoc);
        return created;
      };
    }
  }, []);

  // kept but no longer rendered
  const handleLoadMore = async () => {
    if (!lastDoc) return;
    setLoading(true);
    const { items, lastDoc: newLast } = await fetchMoreReviews(lastDoc);
    setReviews((prev) => [...prev, ...items]);
    setLastDoc(newLast);
    setLoading(false);
  };

  const resetForm = () => {
    setName("");
    setRating(0);
    setHoverRating(0);
    setText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name.trim() || !text.trim() || !rating) {
      setMessage("Please enter your name, select a star rating, and write a review.");
      queueMicrotask(() =>
        flashRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      );
      return;
    }
    if (containsProfanity(name) || containsProfanity(text)) {
      setMessage("Please remove profanity before submitting.");
      queueMicrotask(() =>
        flashRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      );
      return;
    }

    const { status } = await addReviewWithRotation({ name, rating, text });

    if (status === "blocked_profane") {
      setMessage("Please remove profanity before submitting.");
      queueMicrotask(() =>
        flashRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      );
      return;
    }

    if (status === "ignored_low_rating") {
      setMessage("Thanks for your review!");
      resetForm();
      setSubmitted(true);
      queueMicrotask(() =>
        flashRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      );
      return;
    }

    if (status === "created") {
      setMessage("Thank you! Your review has been added.");
      const { items, lastDoc } = await fetchReviews();
      setReviews(items);
      setLastDoc(lastDoc);
      resetForm();
      setSubmitted(true);
      queueMicrotask(() =>
        flashRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      );
    }
  };

  // show Firestore if present; otherwise pretty seeds (display-only)
  const displayReviews = reviews.length ? reviews : seedReviews;

  return (
    <main className={styles.reviewsPage}>
      <header className={`${styles.header} ${styles.fadeInUp}`}>
        <h1 className={styles.title}>Reviews</h1>
        <p className={styles.lede}>
          See what clients say about their Mehndi by Simra experience—and share yours.
        </p>
      </header>

      {/* Card grid */}
      <section className={styles.cardsGrid}>
        {displayReviews.map((r) => (
          <article
            key={r.id ?? `${r.name}-${r.createdAt}`}
            className={`${styles.card} ${styles.fadeIn}`}
          >
            <div className={styles.cardStars} aria-label={`${r.rating} out of 5`}>
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </div>

            <p className={styles.cardBody}>{r.text}</p>

            <footer className={styles.cardFooter}>
              <span className={styles.cardDash}>—</span> {r.name}
            </footer>
          </article>
        ))}
      </section>

      {/* Flash message (above the form) */}
      {message && (
        <div
          ref={flashRef}
          className={`${styles.message} ${styles.flash} ${styles.fadeIn}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      )}

      {/* Form: hidden after successful submit until refresh */}
      {!submitted && (
        <>
          <h2 className={styles.formTitle}>Add a Review</h2>
          <form onSubmit={handleSubmit} className={`${styles.formCard} ${styles.slideDown}`}>
            <label className={styles.label}>
              <span className={styles.reqLabel}>
                Name<span className={styles.reqStar}>*</span>
              </span>
              <input
                className={styles.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </label>

            <div className={styles.field}>
              <span className={styles.reqLabel}>
                Rating<span className={styles.reqStar}>*</span>
              </span>
              <div className={styles.starsPicker} role="radiogroup" aria-label="Choose a star rating">
                {[1, 2, 3, 4, 5].map((n) => {
                  const filled = (hoverRating || rating) >= n;
                  return (
                    <button
                      key={n}
                      type="button"
                      className={`${styles.starBtn} ${filled ? styles.starFilled : ""}`}
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(n)}
                      aria-checked={rating === n}
                      role="radio"
                      aria-label={`${n} ${n === 1 ? "star" : "stars"}`}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
            </div>

            <label className={styles.label}>
              <span className={styles.reqLabel}>
                Review<span className={styles.reqStar}>*</span>
              </span>
              <textarea
                className={styles.textarea}
                maxLength={200}
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your experience…"
                required
              />
              <div className={styles.counter} aria-live="polite">
                {remaining} characters left
              </div>
            </label>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary}>
                Submit Review
              </button>
            </div>
          </form>
        </>
      )}

      <section className={`${styles.ctaCard} ${styles.fadeInUp}`}>
        <div className={styles.ctaText}>
          <h2 className={styles.ctaTitle}>Want to book or have questions?</h2>
        </div>
        <a href="/contact" className={styles.ctaBtn} aria-label="Go to Contact page">
          Contact Us
        </a>
      </section>
    </main>
  );
}
