import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Programs = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const location = useLocation();

  // If URL is /programs#devops, automatically open devops accordion and scroll to it
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setActiveAccordion(id);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const toggleAccordion = (id) => {
    // If clicking the active one, close it (null), otherwise set to clicked ID
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <main>
      <section className="hero hero--program" aria-labelledby="programs-hero-heading">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 id="programs-hero-heading" className="hero-title">Our Flagship Programs</h1>
            <p className="hero-subtitle" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Designed by industry experts to bridge the skills gap and accelerate your career.
            </p>
            <a href="#program-details" className="btn btn-secondary btn-lg">Explore Courses</a>
          </div>
        </div>
      </section>

      <section id="program-details" className="container programs-section" aria-labelledby="programs-heading">
        <h2 id="programs-heading" className="section-title">In-Depth Program Details</h2>
        <p className="section-subtitle">Choose the path that aligns with your career goals.</p>

        <div className="program-accordion" id="programsAccordion">
          
          {/* DevOps Accordion */}
          <div className="program-item" id="devops">
            <h3 className="program-header">
              <button 
                className="accordion-button" 
                type="button" 
                aria-expanded={activeAccordion === 'devops'}
                aria-controls="devops-content"
                onClick={() => toggleAccordion('devops')}
              >
                <span className="program-name">DevOps Engineering</span>
                <span className="program-duration">6 Months</span>
                <svg className="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"/></svg>
              </button>
            </h3>
            <div id="devops-content" className="accordion-content" aria-hidden={activeAccordion !== 'devops'}>
              <div className="program-details">
                <p className="program-description">Master CI/CD pipelines, cloud infrastructure, and automation. Become the bridge between development and operations.</p>
                <div className="program-details-grid">
                  <div className="detail-column">
                    <h4>Curriculum Highlights</h4>
                    <ul>
                      <li>Linux & Scripting (Bash, Python)</li>
                      <li>Git & GitHub Workflows</li>
                      <li>Containerization with Docker</li>
                      <li>Orchestration with Kubernetes</li>
                      <li>Cloud Platforms (AWS / Azure)</li>
                    </ul>
                  </div>
                  <div className="detail-column">
                    <h4>Key Outcomes</h4>
                    <ul>
                      <li>Build, test, and deploy scalable applications</li>
                      <li>Automate infrastructure provisioning</li>
                      <li>Manage cloud environments effectively</li>
                    </ul>
                    <h4>Ideal For</h4>
                    <p>Engineers seeking ops roles, SREs, or cloud specialists.</p>
                    <Link to="/register?program=devops" className="btn btn-primary">Enroll in DevOps</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Stack Accordion */}
          <div className="program-item" id="fullstack">
            <h3 className="program-header">
              <button 
                className="accordion-button" 
                type="button" 
                aria-expanded={activeAccordion === 'fullstack'}
                onClick={() => toggleAccordion('fullstack')}
              >
                <span className="program-name">Full-Stack Development</span>
                <span className="program-duration">6 Months</span>
                <svg className="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"/></svg>
              </button>
            </h3>
            <div id="fullstack-content" className="accordion-content" aria-hidden={activeAccordion !== 'fullstack'}>
              <div className="program-details">
                <p className="program-description">Build dynamic, data-driven web applications from front to back. Master modern frameworks and databases.</p>
                <div className="program-details-grid">
                  <div className="detail-column">
                    <h4>Curriculum Highlights</h4>
                    <ul>
                      <li>HTML5, CSS3, JavaScript (ES6+)</li>
                      <li>Frontend Frameworks (React / Vue.js)</li>
                      <li>Backend with Node.js & Express</li>
                      <li>Databases (MongoDB, PostgreSQL)</li>
                    </ul>
                  </div>
                  <div className="detail-column">
                    <h4>Key Outcomes</h4>
                    <ul>
                      <li>Create modern, responsive web applications</li>
                      <li>Work with both SQL and NoSQL databases</li>
                      <li>Understand the full development lifecycle</li>
                    </ul>
                    <h4>Ideal For</h4>
                    <p>Career changers, junior devs, or anyone wanting full-stack skills.</p>
                    <Link to="/register?program=fullstack" className="btn btn-primary">Enroll in Full-Stack</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Internship Accordion */}
          <div className="program-item" id="internship">
             <h3 className="program-header">
              <button 
                className="accordion-button" 
                type="button" 
                aria-expanded={activeAccordion === 'internship'}
                onClick={() => toggleAccordion('internship')}
              >
                <span className="program-name">Tech Internship Program</span>
                <span className="program-duration">3 Months</span>
                <svg className="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"/></svg>
              </button>
            </h3>
            <div id="internship-content" className="accordion-content" aria-hidden={activeAccordion !== 'internship'}>
               <div className="program-details">
                  <p className="program-description">Gain real-world experience with mentorship and career support. Work on live projects and build industry connections.</p>
                  <div className="program-details-grid">
                    <div className="detail-column">
                      <h4>Program Structure</h4>
                      <ul>
                        <li>Initial Skills Assessment</li>
                        <li>Project Assignment with Client</li>
                        <li>Weekly Mentorship Sessions</li>
                        <li>Agile & Collaboration Training</li>
                      </ul>
                    </div>
                    <div className="detail-column">
                      <h4>Key Outcomes</h4>
                      <ul>
                        <li>Hands-on project experience on a resume</li>
                        <li>Professional mentorship and guidance</li>
                        <li>Industry connections and networking</li>
                      </ul>
                      <h4>Ideal For</h4>
                      <p>Recent graduates or early-career professionals seeking experience.</p>
                      <Link to="/register?program=internship" className="btn btn-primary">Apply for Internship</Link>
                    </div>
                  </div>
                </div>
            </div>
          </div>

        </div>

        <section className="cta-section">
            <div className="container cta-content">
                <h2>Still Deciding?</h2>
                <p>Our career advisors can help you choose the perfect program.</p>
                <Link to="/register" className="btn btn-primary btn-xl">Talk to an Advisor</Link>
            </div>
        </section>
      </section>
    </main>
  );
};

export default Programs;