import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    ...(user ? [
      { name: 'Certificate', path: '/certificate' },
      { name: 'Invoice', path: '/invoice' }
    ] : []),
    { name: 'Enroll Now', path: '/register', highlight: true },
  ];

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? 'nav-glass shadow-lg'
        : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-white/20 dark:border-gray-800/50'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
              <img
                src={`${import.meta.env.BASE_URL}favicon_transparent.png`}
                alt="HexHive"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-accent-light dark:to-white">
                HexHive
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 inline-flex items-center ${link.highlight
                      ? 'bg-accent text-white hover:bg-accent-light shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30'
                      : isActive
                        ? 'text-primary dark:text-accent-light bg-accent/10 dark:bg-accent/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent-light hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && !link.highlight && (
                        <motion.span
                          className="absolute bottom-1 left-1/2 w-1 h-1 rounded-full bg-accent"
                          layoutId="activeIndicator"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}

            {/* Divider */}
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2" />

            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ThemeToggle />
            </motion.div>

            {/* Auth Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="ml-2"
            >
              {!user ? (
                <NavLink
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent-light hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Login
                </NavLink>
              ) : (
                <motion.button
                  onClick={logout}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={`Logged in as ${user.username}`}
                >
                  Logout
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-3">
            <ThemeToggle />
            <motion.button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-primary dark:text-accent-light bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all"
              whileTap={{ scale: 0.9 }}
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div className="px-4 pt-2 pb-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 space-y-1">
              {navLinks.map((link) => (
                <motion.div key={link.path} variants={menuItemVariants}>
                  <NavLink
                    to={link.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block px-4 py-4 rounded-xl text-base font-medium transition-all ${link.highlight
                        ? 'bg-accent text-white shadow-md'
                        : isActive
                          ? 'bg-accent/10 text-primary dark:text-accent-light'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              {/* Auth buttons in mobile */}
              <motion.div variants={menuItemVariants} className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
                {!user ? (
                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className="block px-4 py-4 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Login
                  </NavLink>
                ) : (
                  <button
                    onClick={() => { logout(); closeMenu(); }}
                    className="block w-full text-left px-4 py-4 rounded-xl text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Logout
                  </button>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;