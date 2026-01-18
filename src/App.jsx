import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy Load Pages for Performance Optimization
const Home = lazy(() => import('./pages/Home'));
const Programs = lazy(() => import('./pages/Programs'));
const Register = lazy(() => import('./pages/Register'));
const CertificateGenerator = lazy(() => import('./pages/CertificateGenerator'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex justify-center items-center h-[50vh]">
    <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-primary dark:border-t-accent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const location = useLocation();
  console.log('Current Location:', location);

  return (
    <div className="App">
      <ScrollToTop />
      <div id="page-transition-overlay" className="page-transition-overlay"></div>

      <Navbar />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* TEST ROUTE */}
          <Route path="/test" element={<h1 style={{ marginTop: '100px', textAlign: 'center', color: 'green' }}>ROUTER IS FIXED</h1>} />

          <Route path="/certificate" element={<CertificateGenerator />} />
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/register" element={<Register />} />

          {/* CATCH ALL */}
          <Route path="*" element={<div style={{ marginTop: '100px', textAlign: 'center', color: 'red' }}><h1>404 Not Found</h1><p>Current Path: {location.pathname}</p></div>} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;