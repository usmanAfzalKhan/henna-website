// src/pages/ServiceDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function ServiceDetail() {
  const { slug } = useParams();
  return (
    <section style={{ maxWidth: 980, margin: "2rem auto", padding: "0 1rem", color: "#ffe174" }}>
      <h1 style={{ fontFamily: "Playfair Display, serif", margin: 0, fontSize: "2rem", textTransform: "capitalize" }}>
        {slug?.replace(/-/g, " ") || "Service"}
      </h1>
      <p style={{ fontFamily: "Inter, sans-serif", color: "#ffd700" }}>
        Service detail placeholder for <strong>/{slug}</strong>. We’ll replace this with real content.
      </p>
    </section>
  );
}
