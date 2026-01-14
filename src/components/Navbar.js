import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Hexagon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // --- ADDED "Invoice" HERE ---
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Certificate', path: '/certificate' },
    { name: 'Invoice', path: '/invoice' }, // <--- NEW LINK
    { name: 'Enroll Now', path: '/register' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80" onClick={closeMenu}>
              <img
                src={process.env.PUBLIC_URL + '/logo_full.png'}
                alt="HexHive"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${isActive
                    ? 'text-primary bg-accent/10 ring-1 ring-accent'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-accent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white border-t border-gray-100`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-4 rounded-md text-base font-medium ${isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;