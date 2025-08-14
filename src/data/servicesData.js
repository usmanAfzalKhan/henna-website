// src/data/servicesData.js
// Single-image gallery per service (horizontal WebP with logo bottom-right).

const serviceData = {
  bridal: {
    title: "Bridal Mehndi",
    slug: "bridal",
    lede:
      "Elegant, long-lasting bridal mehndi designed to photograph beautifully and wear comfortably through every ceremony and celebration.",
    bullets: [
      "Custom motifs inspired by your story, outfit, and jewelry",
      "Long-wear, rich stain using quality, fresh-cone paste",
      "Comfort-first scheduling and prep guidance for perfect results",
      "Optional name/date reveals, portraits, or fine-fill details",
    ],
    gallery: ["/images/services/services-bridal-hand.webp"], // single image
    labelHeading: "Package",
    priceHeading: "Price (starting from)",
    // Matches the client photo: add coverage column + feet rows
    prices: [
      { label: "Classic",   coverage: "Palms + Backs to Wrist", amount: 99.99 },
      { label: "Signature", coverage: "Mid-forearm",            amount: 179.99 },
      { label: "Grand",     coverage: "Elbow",                  amount: 279.99 },
      { label: "Feet add-on", coverage: "With any package",     amount: 19.99  },
      { label: "Only Feet", coverage: "",                      amount: 39.99  },
    ],
    // ✨ Two extra paragraphs (optional to render)
    extra: [
      "Bridal mehndi is the most photographed detail of your day. We tailor motifs to your outfit, jewelry, and ceremony flow so every close-up looks intentional—no clutter, no guesswork. Our cones are mixed fresh for deep, even staining, and we pace sessions to keep you comfortable without rushing your timeline.",
      "You’ll get calm, professional guidance, skin-safe natural paste, and photo-ready compositions that flatter your hands and posture. From trial sketches to aftercare and schedule management, we focus on a smooth, stress-free experience—and a stain that stays rich across your events."
    ],
  },

  festival: {
    title: "Festive Mehndi",
    slug: "festival",
    lede:
      "Fresh, joyful designs for Eid, Diwali, and seasonal festivities—balanced for quick sessions with eye-catching results.",
    bullets: [
      "Fast, tidy patterns ideal for group or family bookings",
      "Mix of florals, vines, and geometric accents",
      "Kid-friendly and delicate mini designs available",
      "On-site setup for homes or event venues (by request)",
    ],
    gallery: ["/images/services/services-festival-hand.webp"], // single image
    labelHeading: "Option",
    priceHeading: "Price (starting from)",
    prices: [
      { label: "Single Hand", amount: 9.99 },
      { label: "Both Hands",  amount: 19.99 },
      { label: "Group Package", amount: 59.99, unitSuffix: "/hr" },
    ],
    footnote:
      "Hourly covers unlimited simple designs. Heavier designs incur an additional per-hand charge. Minimum booking for 2 hours.",
    // ✨ Two extra paragraphs (optional to render)
    extra: [
      "Festive sets are optimized for beautiful results in shorter sittings—perfect for families and friends rotating through. Designs stay neat and celebratory, with just enough detail to pop in photos while keeping lines crisp and drying time quick.",
      "We handle on-site flow with punctual setup, hygienic tools, and clear menus so guests know exactly what they’re getting. Transparent pricing and efficient pacing mean more happy hands in less time, without sacrificing quality or stain depth."
    ],
  },

  party: {
    title: "Party Mehndi",
    slug: "party",
    lede:
      "Polished, modern mehndi for birthdays, showers, and corporate socials—elevated looks that stay light and wearable.",
    bullets: [
      "Curated menus for efficient guest flow",
      "Trendy minimal to medium coverage options",
      "Perfect for photo ops and brand-friendly activations",
      "Volume pricing for larger headcounts",
    ],
    gallery: ["/images/services/services-party-hand.webp"], // single image
    labelHeading: "Option",
    priceHeading: "Price (starting from)",
    prices: [
      { label: "Single Hand", amount: 9.99 },
      { label: "Both Hands",  amount: 19.99 },
      { label: "Group Package", amount: 59.99, unitSuffix: "/hr" },
    ],
    footnote:
      "Hourly covers unlimited simple designs. Heavier designs incur an additional per-hand charge. Minimum booking for 2 hours.",
    // ✨ Two extra paragraphs (optional to render)
    extra: [
      "Party mehndi should feel effortless—quick to apply, clean in photos, and comfortable all night. Our modern patterns keep hands free of heavy fill so guests can mingle, eat, and post their looks right away.",
      "We’re event-ready—reliable timing, scalable coverage for larger headcounts, and brand-friendly options for corporate activations. Expect tidy stations, sanitized tools, and chic designs that match your theme without slowing down the party."
    ],
  },
};

export default serviceData;
