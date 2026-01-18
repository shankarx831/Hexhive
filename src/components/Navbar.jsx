import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Hooks must be inside component

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    // Show tools only if user is logged in
    ...(user ? [
      { name: 'Certificate', path: '/certificate' },
      { name: 'Invoice', path: '/invoice' }
    ] : []),
    { name: 'Enroll Now', path: '/register' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 shadow-md font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80" onClick={closeMenu}>
              <img
                src={process.env.PUBLIC_URL + '/favicon_transparent.png'}
                alt="HexHive"
                className="h-12 w-auto object-contain"
              />
              <span className="text-3xl font-bold text-primary dark:text-accent-light transition-colors">HexHive</span> {/* Bigger text */}
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
                    ? 'text-primary bg-accent/10 ring-1 ring-accent dark:text-accent-light dark:bg-accent/20 dark:ring-accent-light'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:text-accent-light dark:hover:bg-gray-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <ThemeToggle />

              {!user && (
                <NavLink to="/login" className="px-3 py-2 rounded-md text-sm font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:text-accent-light dark:hover:bg-gray-800">
                  Login
                </NavLink>
              )}
              {user && (
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300 transition-colors"
                  title={`Logged in as ${user.username}`}
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Left side of right section */}
          <div className="flex items-center md:hidden gap-4">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-accent hover:bg-gray-100 dark:text-accent-light dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-accent"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg dark:shadow-none">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-4 rounded-md text-base font-medium transition-colors ${isActive
                  ? 'bg-primary text-white dark:bg-accent-dark'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-accent-light'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {!user && (
            <NavLink to="/login" onClick={closeMenu} className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-accent-light">
              Login
            </NavLink>
          )}
          {user && (
            <button
              onClick={() => { logout(); closeMenu(); }}
              className="block w-full text-left px-3 py-4 rounded-md text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;