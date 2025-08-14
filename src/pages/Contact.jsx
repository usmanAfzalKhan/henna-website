import React, { useMemo, useRef, useState } from "react";
import styles from "./Contact.module.css";
import serviceData from "../data/servicesData";
import { DIAL_CODES } from "../data/dialCodes";

const groups = ["bridal", "festival", "party"];

function todayISO() {
  const d = new Date();
  const mm = `${d.getMonth() + 1}`.padStart(2, "0");
  const dd = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/* ---- phone helpers ---- */
const DIGIT_RE = /\D/g;
function digitsOnly(v) {
  return (v || "").replace(DIGIT_RE, "");
}
function formatPhone10(v) {
  // 6475551234 -> 647-555-1234 (as you type)
  const d = digitsOnly(v).slice(0, 10);
  const a = d.slice(0, 3);
  const b = d.slice(3, 6);
  const c = d.slice(6, 10);
  if (d.length <= 3) return a;
  if (d.length <= 6) return `${a}-${b}`;
  return `${a}-${b}-${c}`;
}
function valid10(v) {
  return digitsOnly(v).length === 10;
}

/* Calendar math */
function addMonths(date, delta) {
  const d = new Date(date.getFullYear(), date.getMonth() + delta, 1);
  return d;
}
function firstDowOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1).getDay(); // 0 Sun
}
function daysInMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

export default function Contact() {
  /* ----- sorted + searchable dials ----- */
  const sortedDials = useMemo(
    () => [...DIAL_CODES].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );
  const defaultDial =
    sortedDials.find((x) => x.name === "Canada") || sortedDials[0];

  const [dialOpen, setDialOpen] = useState(false);
  const [dialQuery, setDialQuery] = useState("");
  const [selectedDial, setSelectedDial] = useState(defaultDial);

  const dialWrapRef = useRef(null);

  const filteredDials = useMemo(() => {
    const q = dialQuery.trim().toLowerCase();
    if (!q) return sortedDials;
    const justNums = q.replace(/\D/g, "");
    return sortedDials.filter(
      (x) =>
        x.name.toLowerCase().includes(q) ||
        x.dial.replace(/\D/g, "").includes(justNums)
    );
  }, [dialQuery, sortedDials]);

  /* ----- form state ----- */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [people, setPeople] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState(groups[0]);

  // calendar
  const [dateOpen, setDateOpen] = useState(false);
  const [dateVal, setDateVal] = useState("");
  const [calMonth, setCalMonth] = useState(new Date());
  const minISO = todayISO();
  const dateInputRef = useRef(null);

  // prevent immediate re-open after clicking a day
  const suppressNextFocus = useRef(false);

  // submitted state (replace form with thank-you)
  const [submitted, setSubmitted] = useState(false);

  // functions base: prod uses relative path; dev can override with VITE_FUNCTIONS_BASE
  const FN_BASE = import.meta.env.VITE_FUNCTIONS_BASE || "/.netlify/functions";

  /* ----- handlers ----- */
  function handleDialPick(item) {
    setSelectedDial(item);
    setDialOpen(false);
  }

  function handlePhoneChange(e) {
    setPhone(formatPhone10(e.target.value));
  }

  function handlePeopleChange(e) {
    const v = e.target.value.replace(/\D/g, "");
    setPeople(v);
  }

  function pickDay(day) {
    const m = calMonth;
    const mm = `${m.getMonth() + 1}`.padStart(2, "0");
    const dd = `${day}`.padStart(2, "0");
    const iso = `${m.getFullYear()}-${mm}-${dd}`;
    setDateVal(iso);

    // close popover + avoid label/input refocus loop
    suppressNextFocus.current = true;
    setDateOpen(false);
    setTimeout(() => dateInputRef.current?.blur(), 0);
  }

  function isPast(year, monthIndex, day) {
    const pick = new Date(year, monthIndex, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return pick < today;
  }

  async function submitForm(e) {
    e.preventDefault();

    if (!name || !valid10(phone) || !dateVal || !people) {
      alert("Please complete all required fields.");
      return;
    }

    // Build payload for Netlify Function
    const payload = {
      name,
      phone: `${selectedDial.dial} ${phone}`,
      city,
      serviceTitle: serviceData[service]?.title || service,
      dateVal,
      people,
      message,
    };

    try {
      const res = await fetch(`${FN_BASE}/send-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (!res.ok) {
        console.error("Email function error:", res.status, text);
        throw new Error(text || "Email failed");
      }
      // show in-page thank-you and hide the form
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Sorry, something went wrong sending your message. Please try again.");
    }
  }

  /* ----- UI bits ----- */
  const monthName = calMonth.toLocaleString("en", {
    month: "long",
    year: "numeric",
  });
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            You can call{" "}
            <a href="tel:6479360392">647-936-0392</a> or send a DM on{" "}
            <a
              href="https://www.instagram.com/mehndibysimra/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{" "}
            or{" "}
            <a
              href="https://www.facebook.com/MehndiBySimra/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            . If you’d rather not use those, fill out the form below and we’ll
            be in touch soon.
          </p>
        </header>

        {submitted ? (
          // Thank-you card centered and pretty, with logo at the bottom
          <div
            className={styles.form}
            style={{
              display: "grid",
              placeItems: "center",
              padding: 24,
              minHeight: 220,
              textAlign: "center",
              gap: 12,
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <h2
                className={styles.title}
                style={{ fontSize: "1.6rem", margin: 0 }}
              >
                Thank you!
              </h2>
              <p
                className={styles.subtitle}
                style={{ fontSize: "1rem", marginTop: 10, marginBottom: 16 }}
              >
                Hey {name || "there"}, we’ve received your request and will
                reach back to you within <strong>2–3 business days</strong>.
              </p>

              <img
                src="/images/logo.png"
                alt="Mehndi By Simra logo"
                style={{
                  display: "block",
                  margin: "10px auto 0",
                  width: 120,
                  height: "auto",
                  opacity: 0.95,
                }}
              />
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={submitForm}>
            {/* Name */}
            <label className={styles.label}>
              <span className={styles.labelRow}>
                Name <span className={styles.req}>*</span>
              </span>
              <input
                className={styles.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
              />
            </label>

            {/* Phone */}
            <label className={styles.label}>
              <span className={styles.labelRow}>
                Phone number <span className={styles.req}>*</span>
              </span>

              <div className={styles.phoneRow}>
                {/* Custom dial dropdown */}
                <div
                  className={styles.dialWrap}
                  ref={dialWrapRef}
                  onBlur={(e) => {
                    if (!dialWrapRef.current?.contains(e.relatedTarget)) {
                      setDialOpen(false);
                      setDialQuery("");
                    }
                  }}
                >
                  <button
                    type="button"
                    className={styles.dialBtn}
                    onClick={() => setDialOpen((v) => !v)}
                    aria-haspopup="listbox"
                    aria-expanded={dialOpen}
                  >
                    <span className={styles.dialFlag}>{selectedDial.emoji}</span>
                    <span className={styles.dialCode}>{selectedDial.dial}</span>
                    <span className={styles.chev} aria-hidden="true">
                      ▾
                    </span>
                  </button>

                  {dialOpen && (
                    <div className={styles.dialDropdown}>
                      <input
                        autoFocus
                        className={styles.dialSearch}
                        placeholder="code"
                        value={dialQuery}
                        onChange={(e) => setDialQuery(e.target.value)}
                      />

                      <ul className={styles.dialList} role="listbox" tabIndex={-1}>
                        {filteredDials.map((item, i) => (
                          <li key={`${item.name}-${i}`}>
                            <button
                              type="button"
                              className={styles.dialItem}
                              onClick={() => handleDialPick(item)}
                            >
                              <span className={styles.dialFlag}>{item.emoji}</span>
                              <span className={styles.dialCode}>{item.dial}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <input
                  className={styles.input}
                  inputMode="numeric"
                  pattern="^[0-9]{3}-[0-9]{3}-[0-9]{4}$"
                  maxLength={12}
                  placeholder="647-555-1234"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  aria-label="Phone number (10 digits)"
                />
              </div>
            </label>

            {/* Service picker */}
            <fieldset className={styles.fieldset}>
              <legend className={`${styles.legend} ${styles.labelRow}`}>
                Select a service <span className={styles.req}>*</span>
              </legend>

              <div className={styles.serviceGrid}>
                {groups.map((g) => {
                  const entry = serviceData[g];
                  const checked = service === g;
                  return (
                    <label
                      key={g}
                      className={`${styles.serviceTile} ${
                        checked ? styles.selected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={g}
                        checked={checked}
                        onChange={() => setService(g)}
                      />
                      <div className={styles.tileBody}>
                        <span className={styles.tileTitle}>{entry.title}</span>
                        <span className={styles.tileNote}>
                          {entry.ledeShort ||
                            {
                              bridal: "Full bridal coverage",
                              festival: "Eid, Diwali & holidays",
                              party: "Birthdays & events",
                            }[g]}
                        </span>

                        <table className={styles.priceTable}>
                          <tbody>
                            {entry.prices.map((row, i) => (
                              <tr key={i}>
                                <td>
                                  <span className={styles.priceLabel}>
                                    {row.label}
                                  </span>
                                  {row.coverage && (
                                    <div className={styles.coverageLine}>
                                      {row.coverage}
                                    </div>
                                  )}
                                </td>
                                <td className={styles.priceValue}>
                                  {row.unitSuffix
                                    ? `$${row.amount.toFixed(2)}${row.unitSuffix}`
                                    : `$${row.amount.toFixed(2)}`}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Event day */}
            <label className={styles.label}>
              <span className={styles.labelRow}>
                Day of event <span className={styles.req}>*</span>
              </span>

              <div className={styles.dateWrap}>
                <input
                  ref={dateInputRef}
                  className={`${styles.input} ${styles.dateInput}`}
                  placeholder="yyyy-mm-dd"
                  value={dateVal}
                  onChange={(e) => setDateVal(e.target.value)}
                  required
                  onFocus={() => {
                    if (suppressNextFocus.current) {
                      // consume the next focus caused by clicking the day
                      suppressNextFocus.current = false;
                      return;
                    }
                    setDateOpen(true);
                  }}
                />
                <button
                  className={styles.dateBtn}
                  type="button"
                  onClick={() => setDateOpen((v) => !v)}
                  aria-label="Open calendar"
                >
                  📅
                </button>

                {dateOpen && (
                  <div
                    className={styles.cal}
                    role="dialog"
                    aria-label="Calendar"
                    onMouseDown={(e) => e.preventDefault()} // block label from re-focusing input
                  >
                    <div className={styles.calHeader}>
                      <button
                        className={styles.calNav}
                        type="button"
                        onClick={() => setCalMonth(addMonths(calMonth, -1))}
                      >
                        ‹
                      </button>
                      <div className={styles.calTitle}>{monthName}</div>
                      <button
                        className={styles.calNav}
                        type="button"
                        onClick={() => setCalMonth(addMonths(calMonth, 1))}
                      >
                        ›
                      </button>
                    </div>

                    <div className={styles.calGrid}>
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                        <div key={d} className={styles.calDow}>
                          {d}
                        </div>
                      ))}
                      {Array.from({ length: firstDowOfMonth(calMonth) }).map(
                        (_, i) => (
                          <div key={`e${i}`} className={styles.calEmpty} />
                        )
                      )}
                      {Array.from({ length: daysInMonth(calMonth) }).map((_, i) => {
                        const d = i + 1;
                        const disabled = isPast(
                          calMonth.getFullYear(),
                          calMonth.getMonth(),
                          d
                        );
                        return (
                          <button
                            key={d}
                            type="button"
                            disabled={disabled}
                            className={styles.calDay}
                            onClick={() => pickDay(d)}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </label>

            {/* City */}
            <label className={styles.label}>
              <span className={styles.labelRow}>
                Your City<span className={styles.req}>*</span>
              </span>
              <input
                className={styles.input}
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="City (Brampton)"
              />
            </label>

            {/* People */}
            <label className={styles.label}>
              <span className={styles.labelRow}>
                Number of people <span className={styles.req}>*</span>
              </span>
              <input
                className={styles.input}
                type="number"
                min={1}
                step={1}
                value={people}
                onChange={handlePeopleChange}
                placeholder="Enter number"
                required
              />
            </label>

            {/* Message */}
            <label className={styles.label}>
              <span className={styles.labelRow}>Message (optional)</span>
              <textarea
                className={styles.textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share any notes or requests (optional)"
              />
            </label>

            <button className={styles.button} type="submit">
              Send Message
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
