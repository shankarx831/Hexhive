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

// Auth
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

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

// ✅ Switched to HashRouter for GitHub Pages compatibility
root.render(
  <AuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/programs" element={<Layout><Programs /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />

        {/* PUBLIC: Login Page */}
        <Route path="/login" element={<Layout><Login /></Layout>} />

        {/* PROTECTED ROUTES */}
        <Route path="/certificate" element={
          <PrivateRoute>
            <Layout><CertificateGenerator /></Layout>
          </PrivateRoute>
        } />

        <Route path="/invoice" element={
          <PrivateRoute>
            <Layout><InvoiceGenerator /></Layout>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
