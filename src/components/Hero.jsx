// src/components/Hero.jsx
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import slides from '../data/slides'
import styles from './Hero.module.css'
import logo from '../assets/logo.png'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const slideCount = slides.length
  const next = () => {
    setDirection(1)
    setCurrent(c => (c + 1) % slideCount)
  }
  const prev = () => {
    setDirection(-1)
    setCurrent(c => (c - 1 + slideCount) % slideCount)
  }

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const slide = slides[current]
  const bg = isMobile ? slide.imageMobile : slide.imageDesktop

  return (
    <div className={styles.hero} {...handlers}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          className={styles.slide}
          style={{ backgroundImage: `url(${bg})` }}
          initial={{ x: direction > 0 ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: direction > 0 ? '-100%' : '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <img src={logo} alt="Mehndi by Simra" className={styles.logo} />
          <div className={styles.gradient} />
          <div className={styles.content}>
            <h1>{slide.title}</h1>
            {slide.subtitle && <p>{slide.subtitle}</p>}
            {slide.buttonText && slide.link && (
              <a href={slide.link} className={styles.cta}>
                {slide.buttonText}
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <button className={styles.prev} onClick={prev}>‹</button>
      <button className={styles.next} onClick={next}>›</button>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === current ? styles.dotActive : styles.dot}
            onClick={() => {
              setDirection(i > current ? 1 : -1)
              setCurrent(i)
            }}
          />
        ))}
      </div>
    </div>
  )
}