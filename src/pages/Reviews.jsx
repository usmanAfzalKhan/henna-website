// src/pages/Reviews.jsx
import React, { useEffect } from "react";

export default function Reviews() {
  useEffect(() => {
    document.title = "Reviews | Mehndi by Simra";
  }, []);

  return (
    <main style={{ background: "#103423", minHeight: "100vh", padding: "2.5rem 1rem", color: "#f0f7f3" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", color: "#ffe174", margin: 0, fontSize: "2rem" }}>
          Reviews
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", color: "#ffd700", margin: "0.5rem auto 1.5rem", maxWidth: 760, lineHeight: 1.6 }}>
          What clients say about their mehndi experience with us.
        </p>

        {/* Placeholder content */}
        <div style={{
          background: "rgba(255, 225, 116, 0.06)",
          border: "1px solid rgba(255, 225, 116, 0.18)",
          borderRadius: 14,
          padding: "1.25rem",
          boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
          fontFamily: "Inter, sans-serif"
        }}>
          <p style={{ margin: 0, opacity: .95 }}>
            Reviews will appear here. Want us to pull highlights from Instagram or Google?
          </p>
        </div>
      </div>
    </main>
  );
}
