import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';


// Form field animation variants moved outside to prevent recreation
const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Hoisted AnimatedInput component to prevent full remounts on focus/state changes
const AnimatedInput = ({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  error,
  formData,
  handleChange,
  focusedField,
  setFocusedField,
  state,
  children,
  ...props
}) => (
  <motion.div
    variants={fieldVariants}
    className="relative"
  >
    <label
      htmlFor={name}
      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {children || (
        <input
          type={type}
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          aria-invalid={!!error}
          className={`input-premium ${error ? 'error border-red-500' : ''}`}
          {...props}
        />
      )}

      {/* Focus indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-accent rounded-full"
        initial={{ width: 0 }}
        animate={{ width: focusedField === name ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>

    <AnimatePresence>
      {(error || (state.errors && state.errors.filter(e => e.field === name).length > 0)) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-red-500 text-sm mt-2 flex items-center gap-1 font-medium"
          role="alert"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <ValidationError
            prefix={label}
            field={name}
            errors={state.errors}
          />
          {error && !(state.errors && state.errors.find(e => e.field === name)) && <span>{error}</span>}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const Register = () => {
  const location = useLocation();
  const [state, handleSubmit] = useForm("xeeegbkp");
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
  const [focusedField, setFocusedField] = useState(null);

  // Pre-fill program based on URL query param
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

  const handleFormSubmit = (e) => {
    if (validate()) {
      handleSubmit(e);
    } else {
      e.preventDefault();
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) element.focus();
    }
  };

  return (
    <>
      <SEO
        title="Enroll Now"
        description="Join HexHive Solutions' expert-led tech programs. Apply now for DevOps, Full-Stack, or Embedded Systems courses."
      />
      <main className="flex-grow overflow-hidden">
        {/* ========================================
          HERO SECTION
          ======================================== */}
        <section className="relative py-20 md:py-24 hero-gradient overflow-hidden">
          {/* Decorative elements */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-light/30 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection className="text-center">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-white/90">Now Accepting Applications</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-black font-heading text-white mb-6">
                Enroll in a HexHive <span className="text-accent-light">Program</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Fill out the form below and a career advisor will contact you within 24 hours.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ========================================
          FORM SECTION
          ======================================== */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection direction="scale">
              <motion.div
                className="glass-panel p-8 md:p-12"
                whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 64, 48, 0.25)' }}
              >
                <motion.h2
                  className="text-3xl font-bold font-heading text-primary dark:text-white text-center mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Registration Form
                </motion.h2>
                <motion.p
                  className="text-gray-500 dark:text-gray-400 text-center mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  All fields marked with * are required
                </motion.p>

                <motion.form
                  className="space-y-6"
                  id="registrationForm"
                  onSubmit={handleFormSubmit}
                  noValidate
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
                    }
                  }}
                >
                  {state.succeeded && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-center mb-8"
                    >
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">Registration Successful!</h3>
                      <p className="text-gray-600 dark:text-gray-400">Thanks for joining HexHive! Our advisor will contact you soon.</p>
                    </motion.div>
                  )}

                  <div className={state.succeeded ? "hidden" : "space-y-6"}>
                    {/* Program Select */}
                    <AnimatedInput
                      label="Select Program"
                      name="program"
                      required
                      error={errors.program}
                      formData={formData}
                      handleChange={handleChange}
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      state={state}
                    >
                      <select
                        id="program"
                        name="program"
                        required
                        value={formData.program}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('program')}
                        onBlur={() => setFocusedField(null)}
                        aria-invalid={!!errors.program}
                        className={`input-premium cursor-pointer ${errors.program ? 'error border-red-500' : ''}`}
                      >
                        <option value="" disabled>Choose a program to enroll in</option>
                        <option value="advisor">💬 Talk to an Advisor</option>
                        <option value="devops">🔄 DevOps Engineering (6 Months)</option>
                        <option value="fullstack">💻 Full-Stack Development (6 Months)</option>
                        <option value="embedded">🔌 Embedded Systems & IoT (40 Hours)</option>
                      </select>
                    </AnimatedInput>

                    {/* Name */}
                    <AnimatedInput
                      label="Full Name"
                      name="name"
                      required
                      placeholder="e.g., Jane Doe"
                      error={errors.name}
                      formData={formData}
                      handleChange={handleChange}
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      state={state}
                    />

                    {/* Email */}
                    <AnimatedInput
                      label="Email Address"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      error={errors.email}
                      formData={formData}
                      handleChange={handleChange}
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      state={state}
                    />

                    {/* Phone */}
                    <AnimatedInput
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      formData={formData}
                      handleChange={handleChange}
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      state={state}
                    />

                    {/* Two column layout for Education and Experience */}
                    <motion.div
                      variants={fieldVariants}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div>
                        <label htmlFor="education" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          Highest Education
                        </label>
                        <select
                          id="education"
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          className="input-premium cursor-pointer"
                        >
                          <option value="" disabled>Select your qualification</option>
                          <option value="high-school">High School / Secondary</option>
                          <option value="bachelor">Bachelor&apos;s Degree</option>
                          <option value="master">Master&apos;s Degree</option>
                          <option value="diploma">Diploma</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="experience" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          Relevant Experience (Years)
                        </label>
                        <input
                          type="number"
                          id="experience"
                          name="experience"
                          min="0"
                          max="50"
                          placeholder="e.g., 2"
                          value={formData.experience}
                          onChange={handleChange}
                          className="input-premium"
                        />
                      </div>
                    </motion.div>

                    {/* Goals */}
                    <AnimatedInput
                      label="Your Career Goals"
                      name="goals"
                      required
                      error={errors.goals}
                      formData={formData}
                      handleChange={handleChange}
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      state={state}
                    >
                      <textarea
                        id="goals"
                        name="goals"
                        rows="4"
                        required
                        placeholder="Tell us about your aspirations and what you hope to achieve..."
                        value={formData.goals}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('goals')}
                        onBlur={() => setFocusedField(null)}
                        aria-invalid={!!errors.goals}
                        className={`input-premium resize-none ${errors.goals ? 'error border-red-500' : ''}`}
                      />
                    </AnimatedInput>

                    {/* Source */}
                    <AnimatedInput
                      label="How did you hear about us?"
                      name="source"
                      required
                      error={errors.source}
                      formData={formData}
                      handleChange={handleChange}
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      state={state}
                    >
                      <select
                        id="source"
                        name="source"
                        required
                        value={formData.source}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('source')}
                        onBlur={() => setFocusedField(null)}
                        aria-invalid={!!errors.source}
                        className={`input-premium cursor-pointer ${errors.source ? 'error border-red-500' : ''}`}
                      >
                        <option value="" disabled>Select an option</option>
                        <option value="search">🔍 Search Engine (Google, etc.)</option>
                        <option value="social">📱 Social Media</option>
                        <option value="referral">👥 Referral</option>
                        <option value="event">🎤 Event/Webinar</option>
                        <option value="advertisement">📺 Advertisement</option>
                        <option value="other">📝 Other</option>
                      </select>
                    </AnimatedInput>

                    {/* Submit Button */}
                    <motion.div variants={fieldVariants}>
                      <motion.button
                        type="submit"
                        disabled={state.submitting}
                        className={`w-full btn-accent text-lg py-5 relative overflow-hidden group ${state.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        whileHover={!state.submitting ? { scale: 1.02 } : {}}
                        whileTap={!state.submitting ? { scale: 0.98 } : {}}
                      >
                        {/* Shimmer effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                        <span className="relative flex items-center justify-center gap-2">
                          {state.submitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" border-radius="50%" border="3px solid transparent" border-top-color="white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              Submit Application
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>

                    {/* Privacy note */}
                    <motion.p
                      variants={fieldVariants}
                      className="text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      By submitting, you agree to our{' '}
                      <a href="#" className="text-accent hover:underline">Privacy Policy</a>
                      {' '}and{' '}
                      <a href="#" className="text-accent hover:underline">Terms of Service</a>.
                    </motion.p>
                  </div>
                </motion.form>
              </motion.div>
            </AnimatedSection>

            {/* Trust indicators */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: '🔒', text: 'Secure Form' },
                { icon: '⚡', text: '24hr Response' },
                { icon: '🎯', text: 'No Spam' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;