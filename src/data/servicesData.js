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
    prices: [
      { label: "Classic (Palms + Backs to Wrist)", amount: 249 },
      { label: "Signature (Mid-Forearm Coverage)", amount: 399 },
      { label: "Grand (Up to Elbow + Feet Highlights)", amount: 599 },
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
    prices: [
      { label: "Single Hand (Palm or Back)", amount: 35 },
      { label: "Both Hands (Palms)", amount: 60 },
      { label: "Quick Party Bundle (5 people, simple)", amount: 160 },
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
    prices: [
      { label: "Minimal Accent (per person)", amount: 20 },
      { label: "Medium Design (per person)", amount: 35 },
      { label: "Event Hourly (2-hour minimum)", amount: 120 },
    ],
  },
};

export default serviceData;
