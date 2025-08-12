// src/data/galleryData.js
// Add your real files later. Each item can be:
// { type: "image", src: "/images/bridal/IMG_0001.jpg", alt: "Optional alt" }
// { type: "video", src: "/videos/bridal/clip01.mp4", alt: "Optional alt" }

const galleryData = {
  bridal: {
    title: "Bridal Gallery",
    slug: "bridal",
    // Optional card cover (shown on the 3-card grid). Leave "" to use a text fallback.
    cardThumb: "",
    items: [
      // Example (uncomment and replace when ready):
      // { type: "image", src: "/images/bridal/IMG_0001.jpg", alt: "Bridal mehndi" },
      // { type: "video", src: "/videos/bridal/clip01.mp4", alt: "Bridal video" },
    ],
  },
  festival: {
    title: "Festival Gallery",
    slug: "festival",
    cardThumb: "",
    items: [
      // { type: "image", src: "/images/festival/pic01.png", alt: "Festival design" },
      // { type: "video", src: "/videos/festival/fest01.mp4", alt: "Festival video" },
    ],
  },
  party: {
    title: "Party Gallery",
    slug: "party",
    cardThumb: "",
    items: [
      // { type: "image", src: "/images/party/photo01.jpg", alt: "Party mehndi" },
      // { type: "video", src: "/videos/party/party01.mov", alt: "Party video" },
    ],
  },
};

export default galleryData;
