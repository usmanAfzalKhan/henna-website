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
  },
};

export default serviceData;
