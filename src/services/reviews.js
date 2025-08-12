// src/services/reviews.js
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  startAfter,
  getDocs,
  deleteDoc,
  doc,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Collection ref
const reviewsCol = collection(db, "reviews");

// ---------------------------
// Profanity filter (same as your rules)
// ---------------------------
// Case-insensitive via the 'i' flag (no (?i) inline flag in JS)
const PROFANITY_PATTERN =
  '(fuck|shit|bitch|asshole|bastard|dick|pussy|cunt|slut|whore|' +
  'nigger|nigga|paki|chink|spic|wetback|kike|fag|faggot|tranny|retard|' +
  'coon|gook|gypsy|homo|beaner|camel jockey|sand nigger|terrorist|' +
  'muslim terrorist|raghead|dothead|redskin|injun|cracker|white trash|' +
  'jigaboo|darkie|zipperhead|twat|bollocks|arsehole|mongoloid|kafir|' +
  'bakchod|choot|madarchod|behenchod|bhenchod|lund|haraami|kutti|kutte|' +
  'randi|haraamzada|gandu|gaand|chootia|lauda|saala|haramzada|bhosdi|' +
  'bhosdike|chutiya|kamina|kanjar|raand|jhant|maal|bakri|bakra|suar|' +
  'kutta|kutiya|chakka|zinda laash|bhosda|chod|randwa|dalla|jhat|tatty|' +
  'ghanta|pataka|chuswa|bawli|bhadwa|balatkar|sharmuta|ibn al kalb|' +
  'walad zina|mashhoor|sharmouta|khara|zebi|bnit sharmouta|kolb|zib|' +
  'qalb|zabour|puta|pendejo|puto|maricon|cabron|coño|gilipollas|mierda|' +
  'verga|zorra|perra|imbecil|idiota|malparido|concha|culiao|boludo|' +
  'hijo de puta|chinga|chingar|chingada|carajo|chingado|putain|salope|' +
  'connard|enculé|merde|putain de merde|bordel|nique ta mere|pédé|tapette|' +
  'fdp|conard|salaud|enfoiré|bâtard|bordel de merde|emmerdeur|chiant|' +
  'lanat|zindiq|munafiq|yazid|kameena|khotay ka bacha|haraamkhor|zaleel|' +
  'ghatiya)';

export const PROFANITY_REGEX = new RegExp(PROFANITY_PATTERN, "i");

export function containsProfanity(str = "") {
  return PROFANITY_REGEX.test(String(str));
}

// ---------------------------
// Reads
// ---------------------------
export async function fetchReviews(pageSize = 10) {
  const q = query(reviewsCol, orderBy("timestamp", "desc"), limit(pageSize));
  const snap = await getDocs(q);
  return {
    items: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
    lastDoc: snap.docs.length ? snap.docs[snap.docs.length - 1] : null,
  };
}

export async function fetchMoreReviews(lastDoc, pageSize = 10) {
  if (!lastDoc) return { items: [], lastDoc: null };
  const q = query(
    reviewsCol,
    orderBy("timestamp", "desc"),
    startAfter(lastDoc),
    limit(pageSize)
  );
  const snap = await getDocs(q);
  return {
    items: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
    lastDoc: snap.docs.length ? snap.docs[snap.docs.length - 1] : null,
  };
}

// ---------------------------
// Write with rotation logic
// ---------------------------
export async function addReviewWithRotation({ name, rating, text }) {
  const cleanName = String(name || "").trim();
  const cleanText = String(text || "").trim();
  const ratingInt = parseInt(rating, 10);

  // profanity check
  if (containsProfanity(cleanName) || containsProfanity(cleanText)) {
    return { status: "blocked_profane" };
  }

  // low rating (ignore storage)
  if (!Number.isInteger(ratingInt) || ratingInt < 4) {
    return { status: "ignored_low_rating" };
  }

  // count current docs
  const countSnap = await getCountFromServer(reviewsCol);
  const total = countSnap.data().count || 0;

  // delete oldest if 10+
  if (total >= 10) {
    const oldestQ = query(reviewsCol, orderBy("timestamp", "asc"), limit(1));
    const oldestSnap = await getDocs(oldestQ);
    if (!oldestSnap.empty) {
      const oldest = oldestSnap.docs[0];
      await deleteDoc(doc(db, "reviews", oldest.id));
    }
  }

  // add new
  await addDoc(reviewsCol, {
    name: cleanName.slice(0, 22),
    rating: ratingInt,
    text: cleanText.slice(0, 200),
    timestamp: serverTimestamp(),
  });

  return { status: "created" };
}
