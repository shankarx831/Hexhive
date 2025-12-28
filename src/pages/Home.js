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
    <main>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1 id="hero-heading" className="hero-title">Transform Your Passion Into a High-Growth Tech Career</h1>
            <p className="hero-subtitle">Expert-led programs in DevOps & Full-Stack Development. Build real projects, get mentored by industry leaders, and land your dream job.</p>
            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-lg">Start Your Journey</Link>
              <a href="#features" className="btn btn-secondary btn-lg">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container features-section" aria-labelledby="features-heading">
        <h2 id="features-heading" className="section-title">Why HexHive Stands Out</h2>
        <p className="section-subtitle">We don't just teach code; we build careers.</p>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="var(--accent)"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
            </div>
            <h3>Industry-Aligned Curriculum</h3>
            <p>Content co-created with hiring managers from top tech companies to ensure you learn what's in demand.</p>
          </div>
          {/* Feature 2 */}
          <div className="feature-card">
              <div className="feature-icon">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="var(--accent)"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              </div>
              <h3>Personalized Mentorship</h3>
              <p>1:1 sessions with senior engineers and career coaches to guide your unique journey.</p>
          </div>
          {/* Feature 3 */}
          <div className="feature-card">
              <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="var(--accent)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              </div>
              <h3>Guaranteed Interview Prep</h3>
              <p>Technical interviews, system design, and soft skills workshops to boost your confidence.</p>
          </div>
          {/* Feature 4 */}
          <div className="feature-card">
              <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="var(--accent)"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              </div>
              <h3>Real-World Projects</h3>
              <p>Work on actual client projects and build a portfolio that impresses employers.</p>
          </div>
        </div>
      </section>

      <section className="stats-section" aria-labelledby="stats-heading" ref={statsRef}>
        <div className="container">
          <h2 id="stats-heading" className="sr-only">Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number" data-target="95">0</span><span className="stat-unit">%</span>
              <span className="stat-label">Placement Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="500">0</span><span className="stat-unit">+</span>
              <span className="stat-label">Alumni Network</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="25">0</span><span className="stat-unit">+</span>
              <span className="stat-label">Industry Partners</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="100">0</span><span className="stat-unit">%</span>
              <span className="stat-label">Project-Based</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-content">
          <h2>Ready to Launch Your Tech Career?</h2>
          <p>Join thousands of successful alumni. Take the first step towards a future-proof career.</p>
          <Link to="/register" className="btn btn-primary btn-xl">Enroll Now</Link>
        </div>
      </section>
    </main>
  );
};

export default Home;