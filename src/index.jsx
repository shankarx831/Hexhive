import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
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
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
