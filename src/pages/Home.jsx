import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const animateCounter = (element) => {
      const target = +element.getAttribute('data-target');
      const count = +element.innerText;
      const increment = target / 200; // Animation speed logic

      if (count < target) {
        element.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(element), 10);
      } else {
        element.innerText = target.toLocaleString();
      }
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.stat-number');
          counters.forEach(counter => animateCounter(counter));
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex-grow">
      {/* HERO SECTION */}
      <section className="relative bg-primary overflow-hidden isolate" aria-labelledby="hero-heading">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light -z-20"></div>
        {/* Abstract Pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj4gPGc+IDxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbC1vcGFjaXR5PSIwIi8+IDxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBvcGFjaXR5PSIuMiIvPiA8L2c+IDwvc3ZnPg==')] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-3/4 text-center md:text-left">
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-black font-heading text-white mb-6 leading-tight tracking-tight">
              Transform Your Passion Into a <span className="text-accent">High-Growth Tech Career</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto md:mx-0 font-light leading-relaxed">
              Expert-led programs in DevOps & Full-Stack Development. Build real projects, get mentored by industry leaders, and land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/register" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-accent hover:bg-accent-light transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Your Journey
              </Link>
              <a href="#features" className="inline-flex justify-center items-center px-8 py-4 border-2 border-accent text-lg font-bold rounded-lg text-accent hover:bg-accent hover:text-white transition-all">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-cream" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-black font-heading text-primary mb-4">Why HexHive Stands Out</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We don't just teach code; we build careers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-accent group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" className="fill-accent"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Industry-Aligned Curriculum</h3>
              <p className="text-gray-600 leading-relaxed">Content co-created with hiring managers from top tech companies to ensure you learn what's in demand.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-accent group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" className="fill-accent"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Personalized Mentorship</h3>
              <p className="text-gray-600 leading-relaxed">1:1 sessions with senior engineers and career coaches to guide your unique journey.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-accent group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" className="fill-accent"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Guaranteed Interview Prep</h3>
              <p className="text-gray-600 leading-relaxed">Technical interviews, system design, and soft skills workshops to boost your confidence.</p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-accent group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" className="fill-accent"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Real-World Projects</h3>
              <p className="text-gray-600 leading-relaxed">Work on actual client projects and build a portfolio that impresses employers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-primary-dark" aria-labelledby="stats-heading" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-black font-heading text-accent-light mb-2">
                <span className="stat-number" data-target="95">0</span><span className="text-3xl">%</span>
              </div>
              <span className="text-lg font-medium text-gray-300 uppercase tracking-wide">Placement Rate</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-black font-heading text-accent-light mb-2">
                <span className="stat-number" data-target="500">0</span><span className="text-3xl">+</span>
              </div>
              <span className="text-lg font-medium text-gray-300 uppercase tracking-wide">Alumni Network</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-black font-heading text-accent-light mb-2">
                <span className="stat-number" data-target="25">0</span><span className="text-3xl">+</span>
              </div>
              <span className="text-lg font-medium text-gray-300 uppercase tracking-wide">Industry Partners</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-black font-heading text-accent-light mb-2">
                <span className="stat-number" data-target="100">0</span><span className="text-3xl">%</span>
              </div>
              <span className="text-lg font-medium text-gray-300 uppercase tracking-wide">Project-Based</span>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black font-heading text-primary mb-6">Ready to Launch Your Tech Career?</h2>
          <p className="text-xl text-gray-600 mb-10">Join thousands of successful alumni. Take the first step towards a future-proof career.</p>
          <Link to="/register" className="inline-flex justify-center items-center px-10 py-5 text-xl font-bold rounded-lg text-white bg-accent hover:bg-accent-light transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            Enroll Now
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;