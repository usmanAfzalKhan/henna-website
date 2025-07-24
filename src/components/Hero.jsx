import React from 'react';

const Hero = () => {
  return (
    <section style={{
      minHeight: '60vh',
      background: 'linear-gradient(120deg, #251b36 70%, #fff0e6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: '#fff',
      textAlign: 'center',
      padding: '3rem 1rem',
      position: 'relative'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        letterSpacing: '2px',
        marginBottom: '1rem'
      }}>
        Exquisite Mehndi Artistry for Every Occasion
      </h1>
      <p style={{
        fontSize: '1.3rem',
        maxWidth: '700px',
        color: '#ffe6cc',
        marginBottom: '2rem'
      }}>
        Bridal • Parties • Eid • Karva Chauth • Custom Designs  
        <br />
        Toronto & GTA | Bookings Open!
      </p>
      <a
        href="#contact"
        style={{
          background: '#b87c4b',
          color: '#fff',
          padding: '0.9rem 2.5rem',
          fontSize: '1.2rem',
          borderRadius: '2rem',
          textDecoration: 'none',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'background 0.2s'
        }}
      >
        Book Now
      </a>
    </section>
  );
};

export default Hero;
