import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Buffer } from 'buffer';

// Import CSS
import './index.css';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Import Pages
import Home from './pages/Home';
import Programs from './pages/Programs';
import Register from './pages/Register';
import CertificateGenerator from './pages/CertificateGenerator';
import InvoiceGenerator from './pages/InvoiceGenerator';

// --- POLYFILLS (Must run AFTER imports) ---
window.Buffer = Buffer;

// --- APP LAYOUT ---
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const root = createRoot(document.getElementById('root'));

// ✅ basename added for GitHub Pages
root.render(
  <BrowserRouter basename="/hexhive-app">
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/programs" element={<Layout><Programs /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/certificate" element={<Layout><CertificateGenerator /></Layout>} />

      {/* Standalone page (no layout) */}
      <Route path="/invoice" element={<InvoiceGenerator />} />
    </Routes>
  </BrowserRouter>
);
