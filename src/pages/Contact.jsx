// src/pages/Contact.jsx
import React, { useState } from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add backend/emailjs/netlify-form logic here
    setSubmitted(true);
  };

  return (
    <div className={styles.contact}>
      <h1 className={styles.heading}>Contact</h1>
      <p className={styles.desc}>Have questions or want to book? Reach out below!</p>
      {!submitted ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className={styles.input}
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className={styles.input}
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className={styles.textarea}
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
          />
          <button type="submit" className={styles.button}>Send</button>
        </form>
      ) : (
        <div className={styles.thankyou}>
          Thank you for reaching out! We’ll get back to you soon.
        </div>
      )}
    </div>
  );
};

export default Contact;
