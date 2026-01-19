import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy Load Pages for Performance Optimization
const Home = lazy(() => import('./pages/Home'));
const Programs = lazy(() => import('./pages/Programs'));
const Register = lazy(() => import('./pages/Register'));
const CertificateGenerator = lazy(() => import('./pages/CertificateGenerator'));
const Login = lazy(() => import('./pages/Login'));
const InvoiceGenerator = lazy(() => import('./pages/InvoiceGenerator'));

// Premium Loading Component with Animation
const PageLoader = () => (
  <motion.div
    className="flex justify-center items-center h-[60vh]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="relative">
      {/* Outer ring */}
      <motion.div
        className="w-20 h-20 rounded-full border-4 border-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      {/* Inner ring */}
      <motion.div
        className="absolute inset-2 rounded-full border-4 border-transparent border-t-accent"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      {/* Pulse center */}
      <motion.div
        className="absolute inset-6 rounded-full bg-accent/20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  </motion.div>
);

// Page transition variants - Premium MAANG-level animations
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: 'blur(10px)',
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    filter: 'blur(10px)',
  },
};

const pageTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

// Animated page wrapper component
const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className="page-transition-wrapper"
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <div className="App flex flex-col min-h-screen">
      <ScrollToTop />

      {/* Premium Navbar */}
      <Navbar />

      {/* Main Content with Page Transitions */}
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            {/* Main Routes */}
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <Home />
                </AnimatedPage>
              }
            />
            <Route
              path="/programs"
              element={
                <AnimatedPage>
                  <Programs />
                </AnimatedPage>
              }
            />
            <Route
              path="/register"
              element={
                <AnimatedPage>
                  <Register />
                </AnimatedPage>
              }
            />
            <Route
              path="/login"
              element={
                <AnimatedPage>
                  <Login />
                </AnimatedPage>
              }
            />
            <Route
              path="/certificate"
              element={
                <AnimatedPage>
                  <CertificateGenerator />
                </AnimatedPage>
              }
            />
            <Route
              path="/invoice"
              element={
                <AnimatedPage>
                  <InvoiceGenerator />
                </AnimatedPage>
              }
            />

            {/* 404 Page with Animation */}
            <Route
              path="*"
              element={
                <AnimatedPage>
                  <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="text-center"
                    >
                      <motion.h1
                        className="text-9xl font-black text-gradient mb-4"
                        animate={{
                          textShadow: [
                            '0 0 20px rgba(74, 151, 130, 0.3)',
                            '0 0 40px rgba(74, 151, 130, 0.5)',
                            '0 0 20px rgba(74, 151, 130, 0.3)',
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        404
                      </motion.h1>
                      <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">
                        Page Not Found
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                      </p>
                      <motion.a
                        href="/"
                        className="btn-accent text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Back to Home
                      </motion.a>
                    </motion.div>
                  </div>
                </AnimatedPage>
              }
            />
          </Routes>
        </Suspense>
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;