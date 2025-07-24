import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import slides from "../data/slides";
import styles from "./Hero.module.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleSwipe = (event, info) => {
    if (info.offset.x > 50) prevSlide();
    else if (info.offset.x < -50) nextSlide();
  };

  const slide = slides[currentSlide];
  const backgroundImage = isMobile ? slide.imageMobile : slide.imageDesktop;

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentSlide}
          className={styles.slideContent}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleSwipe}
        >
          <h1 className={styles.title}>{slide.title}</h1>
          {slide.subtitle && <p className={styles.subtitle}>{slide.subtitle}</p>}
          {slide.buttonText && slide.link && (
            <a href={slide.link} className={styles.ctaButton}>
              {slide.buttonText}
            </a>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        className={`${styles.navButton} ${styles.prev}`}
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        &#8249;
      </button>

      <button
        className={`${styles.navButton} ${styles.next}`}
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        &#8250;
      </button>

      <img
        src="/images/logo.png"
        alt="Mehndi by Simra Logo"
        className={styles.watermarkLogo}
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;
