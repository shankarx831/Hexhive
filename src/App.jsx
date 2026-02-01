import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PrivateRoute from './components/PrivateRoute';

// Lazy Load Pages for Performance Optimization
const Home = lazy(() => import('./pages/Home'));
const Programs = lazy(() => import('./pages/Programs'));
const Register = lazy(() => import('./pages/Register'));
const CertificateGenerator = lazy(() => import('./pages/CertificateGenerator'));
const Login = lazy(() => import('./pages/Login'));
const InvoiceGenerator = lazy(() => import('./pages/InvoiceGenerator'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BecomeInstructor = lazy(() => import('./pages/business/BecomeInstructor'));
const HireFromHexhive = lazy(() => import('./pages/business/HireFromHexhive'));
const WhatWeDo = lazy(() => import('./pages/business/WhatWeDo'));
const WhyHexhive = lazy(() => import('./pages/business/WhyHexhive'));
const Legal = lazy(() => import('./pages/Legal'));

// Force refresh


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
            {/* PROTECTED ROUTES */}
            <Route
              path="/certificate"
              element={
                <PrivateRoute>
                  <AnimatedPage>
                    <CertificateGenerator />
                  </AnimatedPage>
                </PrivateRoute>
              }
            />
            <Route
              path="/invoice"
              element={
                <PrivateRoute>
                  <AnimatedPage>
                    <InvoiceGenerator />
                  </AnimatedPage>
                </PrivateRoute>
              }
            />
            <Route
              path="/business/become-instructor"
              element={
                <AnimatedPage>
                  <BecomeInstructor />
                </AnimatedPage>
              }
            />
            <Route
              path="/business/hire"
              element={
                <AnimatedPage>
                  <HireFromHexhive />
                </AnimatedPage>
              }
            />
            <Route
              path="/business/what-we-do"
              element={
                <AnimatedPage>
                  <WhatWeDo />
                </AnimatedPage>
              }
            />
            <Route
              path="/business/why-hexhive"
              element={
                <AnimatedPage>
                  <WhyHexhive />
                </AnimatedPage>
              }
            />
            <Route
              path="/legal"
              element={
                <AnimatedPage>
                  <Legal />
                </AnimatedPage>
              }
            />

            {/* 404 Page with Animation */}
            <Route
              path="*"
              element={
                <AnimatedPage>
                  <NotFound />
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