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
    <main className="flex-grow">
      <section className="relative bg-primary text-white py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 id="register-hero-heading" className="text-4xl md:text-5xl font-black font-heading mb-6">Enroll in a HexHive Program</h1>
          <center><p className="text-xl text-gray-200 max-w-2xl">Fill out the form below and a career advisor will contact you shortly.</p></center>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 flex justify-center transition-colors duration-300" aria-labelledby="register-heading">
        <div className="glass-panel w-full max-w-2xl p-8 md:p-12 transition-colors duration-300">
          <h2 id="register-heading" className="text-3xl font-bold font-heading text-primary dark:text-white text-center mb-10 transition-colors">Registration Form</h2>
          <form
            className="space-y-6"
            id="registrationForm"
            action="https://formspree.io/f/xandzywo"
            method="POST"
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset className="space-y-6 m-0 p-0 border-none">
              <legend className="sr-only">Registration Details</legend>

              <div>
                <label htmlFor="program" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">Select Program <span className="text-red-500">*</span></label>
                <select
                  id="program"
                  name="program"
                  required
                  value={formData.program}
                  onChange={handleChange}
                  aria-invalid={!!errors.program}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all ${errors.program ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-accent'}`}
                >
                  <option value="" disabled>Choose a program to enroll in</option>
                  <option value="advisor">Talk to an Advisor</option>
                  <option value="devops">DevOps Engineering (6 Months)</option>
                  <option value="fullstack">Full-Stack Development (6 Months)</option>
                  <option value="internship">Tech Internship Program (3 Months)</option>
                </select>
                <div className="text-red-500 text-sm mt-1 h-5 font-medium" role="alert">{errors.program}</div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g., Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-accent'}`}
                />
                <div className="text-red-500 text-sm mt-1 h-5 font-medium" role="alert">{errors.name}</div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-accent'}`}
                />
                <div className="text-red-500 text-sm mt-1 h-5 font-medium" role="alert">{errors.email}</div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                />
                <div className="h-5"></div>
              </div>

              <div>
                <label htmlFor="education" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">Highest Education</label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                >
                  <option value="" disabled>Select your qualification</option>
                  <option value="high-school">High School / Secondary</option>
                  <option value="bachelor">Bachelor&apos;s Degree</option>
                  <option value="master">Master&apos;s Degree</option>
                  <option value="diploma">Diploma</option>
                  <option value="other">Other</option>
                </select>
                <div className="h-5"></div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">Relevant Experience (Years)</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  min="0"
                  max="50"
                  placeholder="e.g., 2"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                />
                <div className="h-5"></div>
              </div>

              <div>
                <label htmlFor="goals" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">Your Career Goals <span className="text-red-500">*</span></label>
                <textarea
                  id="goals"
                  name="goals"
                  rows="4"
                  required
                  placeholder="Tell us about your aspirations..."
                  value={formData.goals}
                  onChange={handleChange}
                  aria-invalid={!!errors.goals}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all ${errors.goals ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-accent'}`}
                ></textarea>
                <div className="text-red-500 text-sm mt-1 h-5 font-medium" role="alert">{errors.goals}</div>
              </div>

              <div>
                <label htmlFor="source" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors">How did you hear about us? <span className="text-red-500">*</span></label>
                <select
                  id="source"
                  name="source"
                  required
                  value={formData.source}
                  onChange={handleChange}
                  aria-invalid={!!errors.source}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all ${errors.source ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-accent'}`}
                >
                  <option value="" disabled>Select an option</option>
                  <option value="search">Search Engine (Google, etc.)</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Referral</option>
                  <option value="event">Event/Webinar</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="other">Other</option>
                </select>
                <div className="text-red-500 text-sm mt-1 h-5 font-medium" role="alert">{errors.source}</div>
              </div>
            </fieldset>
            <button type="submit" className="w-full bg-accent text-white font-bold py-4 px-6 rounded-lg hover:bg-accent-light transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"> Submit Application </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;