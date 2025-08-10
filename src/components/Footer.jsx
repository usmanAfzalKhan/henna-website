// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer style={{ background: "#103423", color: "#ffe174", padding: "1.25rem 1rem", textAlign: "center" }}>
      <small>© {new Date().getFullYear()} Mehndi by Simra</small>
    </footer>
  );
}
