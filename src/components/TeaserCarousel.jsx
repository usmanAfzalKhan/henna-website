// src/components/TeaserCarousel.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './TeaserCarousel.module.css'

const ITEMS = [
  { label: 'Services',  to: '/services'  },
  { label: 'Packages',  to: '/packages'  },
  { label: 'Portfolio', to: '/gallery'   },  // match your Gallery route
  { label: 'FAQ',       to: '/faq'       },
  { label: 'Review',    to: '/review'    },
  { label: 'About',     to: '/about'     },
  { label: 'Contact',   to: '/contact'   },
]

export default function TeaserCarousel() {
  return (
    <section className={styles.carousel}>
      <h2 className={styles.heading}>Explore</h2>
      <div className={styles.track}>
        {ITEMS.map(({ label, to }) => (
          <Link key={to} to={to} className={styles.card}>
            {label}
          </Link>
        ))}
      </div>
      <div className={styles.indicator}>Swipe →</div>
    </section>
  )
}
