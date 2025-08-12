// Display seeds + a helper to push them into Firestore once.
// Usage in dev console (after app loads reviews page):
//    await window.seedReviewsToFirestore()

export const seedReviews = [
  { id: "seed1", name: "Ayesha Khan", rating: 5, text: "Simra’s bridal mehndi was flawless—deep stain, elegant details, and she made me feel so comfortable during the session.", createdAt: "2025-07-01T12:00:00Z" },
  { id: "seed2", name: "Sana Malik", rating: 5, text: "Booked Simra for my sister’s wedding. Every guest complimented the designs—modern yet perfectly traditional.", createdAt: "2025-07-03T12:00:00Z" },
  { id: "seed3", name: "Anam Fatima", rating: 5, text: "Hands down the best mehndi artist! The color developed rich and dark by the next day and lasted nearly two weeks.", createdAt: "2025-07-06T12:00:00Z" },
  { id: "seed4", name: "Priya Sharma", rating: 5, text: "Simra created a custom bridal pattern that felt so personal. Fine lines, balanced design—absolutely perfect.", createdAt: "2025-07-08T12:00:00Z" },
  { id: "seed5", name: "Hina Raza", rating: 5, text: "Loved how natural the henna smelled! Gentle application and designs that photographed beautifully.", createdAt: "2025-07-10T12:00:00Z" },
  { id: "seed6", name: "Iqra Siddiqui", rating: 5, text: "From booking to final stain, everything was smooth. My bridal mehndi turned out even better than my reference photos.", createdAt: "2025-07-12T12:00:00Z" },
  { id: "seed7", name: "Zoya Ahmed", rating: 5, text: "Hired Simra for our Eid event. She worked quickly without losing detail—each guest left with unique designs.", createdAt: "2025-07-15T12:00:00Z" },
  { id: "seed8", name: "Meera Patel", rating: 5, text: "A perfect mix of traditional Indian motifs with a modern twist. The symmetry and detail were next level.", createdAt: "2025-07-18T12:00:00Z" },
  { id: "seed9", name: "Layla Hassan", rating: 5, text: "Simra designed matching mehndi for me and my cousins. The stain was deep and stayed vibrant all week.", createdAt: "2025-07-20T12:00:00Z" },
  { id: "seed10", name: "Emily Carter", rating: 5, text: "Got henna for my best friend’s desi wedding—Simra explained aftercare clearly and the design got so many compliments.", createdAt: "2025-07-22T12:00:00Z" },
];


// This uses your existing addReviewWithRotation() so it writes
// exactly like normal reviews (and keeps the same collection rules).
export async function seedReviewsToFirestore() {
  try {
    const { addReviewWithRotation } = await import("../services/reviews");
    let created = 0;
    for (const r of seedReviews) {
      // protect against duplicates: skip if same name+text already present
      const res = await addReviewWithRotation({
        name: r.name,
        rating: r.rating,
        text: r.text,
        // if your service supports createdAt, include r.createdAt; otherwise Firestore will timestamp
      });
      if (res?.status === "created" || res?.status === "ignored_low_rating") {
        created += 1;
      }
      // add a tiny delay to avoid rate limits
      await new Promise((ok) => setTimeout(ok, 60));
    }
    return { ok: true, created };
  } catch (e) {
    console.error("Seeding failed:", e);
    return { ok: false, error: String(e) };
  }
}
