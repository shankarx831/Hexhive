import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      {/* The overlay is controlled by CSS, we just leave the div here */}
      <div id="page-transition-overlay" className="page-transition-overlay"></div>
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;