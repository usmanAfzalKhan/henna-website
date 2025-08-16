# Henna Website

**Live Site:** [https://mehndibysimra.netlify.app/](https://mehndibysimra.netlify.app/)

Henna Website is a modern, mobile-friendly platform designed to showcase henna artistry, client reviews, and booking options. It highlights elegant visuals, smooth navigation, and a consistent user experience across all devices.

---

## Table of Contents

* [Demo](#demo)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Setup & Installation](#setup--installation)
* [Deployment](#deployment)
* [Contact](#contact)

---

## Demo

Check out the live website here:
👉 [https://mehndibysimra.netlify.app/](https://mehndibysimra.netlify.app/)

---

## Features

* **Hero Section:**
  Full-width landing showcase with smooth transitions and responsive layout.

* **About Page:**
  Clean introduction with brand highlights and philosophy.

* **Services Pages:**
  Bridal, festive, and party service categories with details and calls-to-action.

* **Gallery:**
  Responsive image and video galleries with modal view for better browsing.

* **Client Reviews:**
  Integrated review system with seeded/test reviews and Firebase support.

* **FAQ Section:**
  Expandable questions and answers for common inquiries.

* **Contact Form:**

  * Name, email, phone (10-digit with area code search), city, service, and guest count.
  * Firebase integration for submissions.

* **Special Promotions:**
  Dedicated components for campaigns (e.g., holiday specials).

* **Performance Optimizations:**
  Modular CSS, lightweight React setup, and optimized image/video handling.

---

## Tech Stack

* **Frontend:**

  * [React (Vite)](https://vitejs.dev/) for fast SPA experience
  * [React Router](https://reactrouter.com/) for navigation
  * [CSS Modules](https://github.com/css-modules/css-modules) for scoped styling

* **Backend & Services:**

  * [Firebase](https://firebase.google.com/) (form submissions, reviews storage)
  * Custom validation logic for phone formatting & area codes

* **Deployment:**

  * [Netlify](https://netlify.com/) (continuous deployment, HTTPS, CDN hosting)

---

## Project Structure

```
/public             # Static images, videos, and assets
/components         # React components (Header, Hero, Gallery, Reviews, Contact, etc.)
/pages              # Page-level components (Home, About, FAQ, Services, etc.)
/data               # Local JSON-style data (services, gallery, reviews, faq, slides, etc.)
/styles             # CSS modules for each component/page
/firebase.js        # Firebase configuration
/App.jsx            # Root component with routes
/main.jsx           # Entry point
/index.css          # Global styles & variables
```

---

## Setup & Installation

> **Requirements:** Node.js, npm/yarn

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/henna-website.git
   cd henna-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Configure Firebase**

   * Create a Firebase project.
   * Enable Firestore Database.
   * Copy your Firebase config into `src/firebase.js`.

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   App will be available at:
   👉 `http://localhost:5173`

---

## Deployment

Deploy easily with **Netlify**:

* Connect your GitHub repo to Netlify.
* Set **build command** to:

  ```bash
  npm run build
  ```
* Set **publish directory** to:

  ```
  dist
  ```
* Add environment variables for Firebase in Netlify’s dashboard.

**Live version:** [https://mehndibysimra.netlify.app/](https://mehndibysimra.netlify.app/)

---

## Contact

For questions, collaborations, or business inquiries, please visit the website:

👉 [https://mehndibysimra.netlify.app/](https://mehndibysimra.netlify.app/)

---

> **Credits:**
> Built with ❤️ using React, Vite, Firebase, and Netlify.
