// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import ServiceDetail from "./pages/ServiceSlug";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* Keep existing services path for compatibility */}
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          {/* Put the root dynamic route LAST so it doesn't compete with static paths */}
          <Route path="/:slug" element={<ServiceDetail />} />
          {/* Optional: 404 remains commented out */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
