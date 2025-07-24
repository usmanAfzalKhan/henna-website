import React from 'react';

const Navbar = () => {
  return (
    <nav style={{
      width: '100%',
      padding: '1rem 2rem',
      background: 'rgba(24, 20, 32, 0.95)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: 'inherit',
      boxShadow: '0 2px 16px rgba(0,0,0,0.04)'
    }}>
      <div style={{fontWeight: 700, fontSize: '1.5rem', letterSpacing: '2px'}}>
        Mehndi by Simra
      </div>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '2rem',
        margin: 0,
        padding: 0,
        fontSize: '1.1rem'
      }}>
        <li><a href="/" style={{color: 'white', textDecoration: 'none'}}>Home</a></li>
        <li><a href="#portfolio" style={{color: 'white', textDecoration: 'none'}}>Portfolio</a></li>
        <li><a href="#reviews" style={{color: 'white', textDecoration: 'none'}}>Reviews</a></li>
        <li><a href="#contact" style={{color: 'white', textDecoration: 'none'}}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
