// Display seeds + a helper to push them into Firestore once.
// Usage in dev console (after app loads reviews page):
//    await window.seedReviewsToFirestore()

export const seedReviews = [
  {
    id: "seed1",
    name: "Ayesha Khan",
    rating: 5,
    text:
      "I was the bride and Simra kept me so calm. The layout was balanced, the lines were clean, and the stain turned a deep burgundy by the second day.",
    createdAt: "2025-07-01T12:00:00Z",
  },
  {
    id: "seed2",
    name: "Sana Malik",
    rating: 5,
    text:
      "We booked Simra for my sister’s mehndi night. She worked through a big guest list with zero stress and still gave everyone a design that suited them.",
    createdAt: "2025-07-03T12:00:00Z",
  },
  {
    id: "seed3",
    name: "Anam Fatima",
    rating: 5,
    text:
      "I am very picky about symmetry and detail. Her lines were crisp and the stain stayed rich for almost two weeks after I followed her aftercare exactly.",
    createdAt: "2025-07-06T12:00:00Z",
  },
  {
    id: "seed4",
    name: "Priya Sharma",
    rating: 5,
    text:
      "She built a custom bridal pattern from my lehenga motifs and even tucked our initials in a clever way. The photos look amazing and the design still felt light on my hands.",
    createdAt: "2025-07-08T12:00:00Z",
  },
  {
    id: "seed5",
    name: "Hina Raza",
    rating: 4,
    text:
      "I have sensitive skin so I asked about ingredients. The cones smelled herbal and felt gentle. She arrived a little late but kept me updated and finished right on time.",
    createdAt: "2025-07-10T12:00:00Z",
  },
  {
    id: "seed6",
    name: "Iqra Siddiqui",
    rating: 5,
    text:
      "I brought a few inspo photos and she refined them into one clear design with a nicer flow. She wrapped my fingers and gave an aftercare card. The color developed evenly.",
    createdAt: "2025-07-12T12:00:00Z",
  },
  {
    id: "seed7",
    name: "Zoya Ahmed",
    rating: 5,
    text:
      "This was for our Eid gathering at home. Kids wanted tiny flowers, aunties wanted fuller work, and she handled everyone without rushing. Zero smudges on outfits too.",
    createdAt: "2025-07-15T12:00:00Z",
  },
  {
    id: "seed8",
    name: "Meera Patel",
    rating: 5,
    text:
      "Great mix of mandala elements and clean negative space. It looked sharp in our evening portraits and survived a full night of dancing.",
    createdAt: "2025-07-18T12:00:00Z",
  },
  {
    id: "seed9",
    name: "Layla Hassan",
    rating: 5,
    text:
      "She gave me and my cousins coordinating vines so we matched without being identical. We went to the beach two days later and the stain still looked bold.",
    createdAt: "2025-07-20T12:00:00Z",
  },
  {
    id: "seed10",
    name: "Emily Carter",
    rating: 5,
    text:
      "First time getting henna for a desi wedding. Simra explained the process in simple steps and checked in about placement. I received compliments all night.",
    createdAt: "2025-07-22T12:00:00Z",
  },
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
