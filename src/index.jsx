import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Buffer } from 'buffer';

// Import CSS
import './index.css';

// Import App Component
import App from './App';

// Auth
import { AuthProvider } from './context/AuthContext';

// --- POLYFILLS (Must run AFTER imports) ---
window.Buffer = Buffer;

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// Dispatch custom event for pre-rendering (help Puppeteer know when to capture)
setTimeout(() => {
  document.dispatchEvent(new Event('custom-render-trigger'));
}, 1000);

