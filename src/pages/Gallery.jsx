// src/pages/Gallery.jsx
import React from "react";
import styles from "./Gallery.module.css";

// Example image list. You can import from a separate js file if needed.
const galleryImages = [
  { src: "/images/gallery1.jpg", caption: "Bridal Mehndi" },
  { src: "/images/gallery2.jpg", caption: "Festival Design" },
  { src: "/images/gallery3.jpg", caption: "Party Special" },
  // Add more as needed
];

const Gallery = () => (
  <div className={styles.gallery}>
    <h1 className={styles.heading}>Gallery</h1>
    <div className={styles.grid}>
      {galleryImages.map((img, idx) => (
        <div className={styles.card} key={idx}>
          <img src={img.src} alt={img.caption} className={styles.img} />
          <span className={styles.caption}>{img.caption}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Gallery;
