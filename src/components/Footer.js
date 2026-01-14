import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-auto border-t-4 border-accent" role="contentinfo">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col">
          {/* Logo link removed as per your HTML comments */}
          <h3 className="text-2xl font-bold font-heading text-white mb-4">HexHive</h3>
          <p className="text-sm text-gray-300 mb-4">Building the next generation of tech leaders.</p>
          <address className="not-italic">
            <p><a href="mailto:contact@hexhive.com" className="text-accent hover:text-white transition-colors">contact@hexhive.com</a></p>
          </address>
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/programs" className="text-gray-300 hover:text-white transition-colors">Programs</Link></li>
            <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors">Enroll Now</Link></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">Programs</h3>
          <ul className="space-y-2">
            <li><Link to="/programs#devops" className="text-gray-300 hover:text-white transition-colors">DevOps Engineering</Link></li>
            <li><Link to="/programs#fullstack" className="text-gray-300 hover:text-white transition-colors">Full-Stack Development</Link></li>
            <li><Link to="/programs#internship" className="text-gray-300 hover:text-white transition-colors">Tech Internship</Link></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Visit our Twitter" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="Visit our LinkedIn" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-primary-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 text-center md:text-left">&copy; 2025 HexHive Solutions. All rights reserved.</p>
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;