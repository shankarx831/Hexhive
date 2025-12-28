import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <Link to="/" className="logo-link" aria-label="HexHive Home" onClick={closeMenu}>
          <div className="logo">
            <img src="/favicon_transparent.png" alt="HexHive" className="logo-img" width="90" height="90" />
            <span className="logo-text">HexHive</span>
          </div>
        </Link>
        
        <nav className="main-nav" role="navigation" aria-label="Main navigation">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/programs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Programs</NavLink>
          <NavLink to="/register" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Enroll Now</NavLink>
        </nav>

        <button
          ref={buttonRef}
          className="mobile-menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!isMenuOpen} ref={menuRef}>
        <NavLink to="/" className="nav-link mobile-nav-link" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/programs" className="nav-link mobile-nav-link" onClick={closeMenu}>Programs</NavLink>
        <NavLink to="/register" className="nav-link mobile-nav-link" onClick={closeMenu}>Enroll Now</NavLink>
      </div>
    </header>
  );
};

export default Navbar;