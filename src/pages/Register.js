import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Register = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    program: '',
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    goals: '',
    source: ''
  });

  const [errors, setErrors] = useState({});

  // Pre-fill program based on URL query param (?program=devops)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const programParam = params.get('program');
    if (programParam) {
      setFormData(prev => ({ ...prev, program: programParam }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.program) newErrors.program = 'Program is required.';
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.goals.trim()) newErrors.goals = 'Career goals are required.';
    if (!formData.source) newErrors.source = 'How you heard about us is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (!validate()) {
      e.preventDefault();
      // Focus first error
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) element.focus();
    }
    // If valid, normal form submission happens (to formspree)
  };

  return (
    <main>
      <section className="hero hero--register" aria-labelledby="register-hero-heading">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 id="register-hero-heading" className="hero-title">Enroll in a HexHive Program</h1>
            <center><p className="hero-subtitle">Fill out the form below and a career advisor will contact you shortly.</p></center>
          </div>
        </div>
      </section>

      <section className="form-section container" aria-labelledby="register-heading">
        <div className="form-card">
          <h2 id="register-heading">Registration Form</h2>
          <form 
            className="register-form" 
            id="registrationForm" 
            action="https://formspree.io/f/xandzywo" 
            method="POST"
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset>
              <legend className="sr-only">Registration Details</legend>

              <label htmlFor="program">Select Program <span aria-label="required">*</span></label>
              <select 
                id="program" 
                name="program" 
                required 
                value={formData.program} 
                onChange={handleChange}
                aria-invalid={!!errors.program}
              >
                <option value="" disabled>Choose a program to enroll in</option>
                <option value="advisor">Talk to an Advisor</option>
                <option value="devops">DevOps Engineering (6 Months)</option>
                <option value="fullstack">Full-Stack Development (6 Months)</option>
                <option value="internship">Tech Internship Program (3 Months)</option>
              </select>
              <div className="error-message" role="alert">{errors.program}</div>

              <label htmlFor="name">Full Name <span aria-label="required">*</span></label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="e.g., Jane Doe" 
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
              />
              <div className="error-message" role="alert">{errors.name}</div>

              <label htmlFor="email">Email Address <span aria-label="required">*</span></label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              <div className="error-message" role="alert">{errors.email}</div>

              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="+91 98765 43210" 
                value={formData.phone}
                onChange={handleChange}
              />
              <div className="error-message" role="alert"></div>

              <label htmlFor="education">Highest Education</label>
              <select 
                id="education" 
                name="education"
                value={formData.education}
                onChange={handleChange}
              >
                <option value="" disabled>Select your qualification</option>
                <option value="high-school">High School / Secondary</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="diploma">Diploma</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="experience">Relevant Experience (Years)</label>
              <input 
                type="number" 
                id="experience" 
                name="experience" 
                min="0" 
                max="50" 
                placeholder="e.g., 2" 
                value={formData.experience}
                onChange={handleChange}
              />

              <label htmlFor="goals">Your Career Goals <span aria-label="required">*</span></label>
              <textarea 
                id="goals" 
                name="goals" 
                rows="4" 
                required 
                placeholder="Tell us about your aspirations..."
                value={formData.goals}
                onChange={handleChange}
                aria-invalid={!!errors.goals}
              ></textarea>
              <div className="error-message" role="alert">{errors.goals}</div>

              <label htmlFor="source">How did you hear about us? <span aria-label="required">*</span></label>
              <select 
                id="source" 
                name="source" 
                required
                value={formData.source}
                onChange={handleChange}
                aria-invalid={!!errors.source}
              >
                <option value="" disabled>Select an option</option>
                <option value="search">Search Engine (Google, etc.)</option>
                <option value="social">Social Media</option>
                <option value="referral">Referral</option>
                <option value="event">Event/Webinar</option>
                <option value="advertisement">Advertisement</option>
                <option value="other">Other</option>
              </select>
              <div className="error-message" role="alert">{errors.source}</div>
            </fieldset>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--spacing-6)' }}> Submit Application </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;