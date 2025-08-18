// src/data/galleryData.js
const galleryData = {
  bridal: {
    title: "Bridal Gallery",
    slug: "bridal",
    // WebP for thumbnail (fast). If you haven't made it yet, swap to b1.jpg.
    cardThumb: "/images/gallery/bridal/b1.webp",
    items: [
      { type: "image", src: "/images/gallery/bridal/b1.jpg", alt: "Bridal design 1" },
      { type: "image", src: "/images/gallery/bridal/b2.jpg", alt: "Bridal design 2" },
      { type: "image", src: "/images/gallery/bridal/b3.jpg", alt: "Bridal design 3" },
      { type: "image", src: "/images/gallery/bridal/b4.jpg", alt: "Bridal design 4" },
      { type: "image", src: "/images/gallery/bridal/b5.jpg", alt: "Bridal design 5" },
      { type: "image", src: "/images/gallery/bridal/b6.jpg", alt: "Bridal design 6" },
      { type: "image", src: "/images/gallery/bridal/b7.jpg", alt: "Bridal design 7" },
      { type: "image", src: "/images/gallery/bridal/b8.jpg", alt: "Bridal design 8" },
      { type: "image", src: "/images/gallery/bridal/b9.jpg", alt: "Bridal design 9" },
      { type: "image", src: "/images/gallery/bridal/b10.jpg", alt: "Bridal design 10" },
      // Bridal video(s)
      { type: "video", src: "/videos/gallery/bridal/b10.mp4", alt: "Bridal video 1" },
    ],
  },

  festival: {
    title: "Festive Gallery",
    slug: "festival",
    // WebP for thumbnail (fast) - falls back to JPG in modal items
    cardThumb: "/images/gallery/festive/f1.webp",
    items: [
      { type: "image", src: "/images/gallery/festive/f1.jpg", alt: "Festive design 1" },
      { type: "image", src: "/images/gallery/festive/f2.jpg", alt: "Festive design 2" },
      { type: "image", src: "/images/gallery/festive/f3.jpg", alt: "Festive design 3" },
      { type: "image", src: "/images/gallery/festive/f4.jpg", alt: "Festive design 4" },
      { type: "image", src: "/images/gallery/festive/f5.jpg", alt: "Festive design 5" },
      { type: "image", src: "/images/gallery/festive/f6.jpg", alt: "Festive design 6" },
      { type: "image", src: "/images/gallery/festive/f7.jpg", alt: "Festive design 7" },
      { type: "image", src: "/images/gallery/festive/f8.jpg", alt: "Festive design 8" },
      { type: "image", src: "/images/gallery/festive/f9.jpg", alt: "Festive design 9" },
      { type: "video", src: "/videos/gallery/festive/f11.mp4", alt: "Festive video 1" },
      { type: "video", src: "/videos/gallery/festive/f12.mp4", alt: "Festive video 2" },
    ],
  },

  party: {
    title: "Party Gallery",
    slug: "party",
    // Use a fast WebP thumb; swap to p1.jpg if you don't make the WebP yet.
    cardThumb: "/images/gallery/party/p1.webp",
    items: [
      { type: "image", src: "/images/gallery/party/p1.jpg", alt: "Party design 1" },
      { type: "image", src: "/images/gallery/party/p2.jpg", alt: "Party design 2" },
      { type: "image", src: "/images/gallery/party/p3.jpg", alt: "Party design 3" },
      { type: "image", src: "/images/gallery/party/p4.jpg", alt: "Party design 4" },
      { type: "image", src: "/images/gallery/party/p5.jpg", alt: "Party design 5" },
      { type: "image", src: "/images/gallery/party/p6.jpg", alt: "Party design 6" },
      // Add party videos later if you have them:
      // { type: "video", src: "/videos/gallery/party/p10.mp4", alt: "Party video 1" },
    ],
  },
};

export default galleryData;
