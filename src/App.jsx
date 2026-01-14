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
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <div className="spinner" style={{ width: '50px', height: '50px', border: '5px solid #f3f3f3', borderTop: '5px solid #004030', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
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