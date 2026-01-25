import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  FloatingElement
} from '../components/AnimatedSection';

const Home = () => {
  // Tech stack data
  const techStack = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  ];

  // Features data
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
      ),
      title: 'Industry-Aligned Curriculum',
      description: 'Content co-created with hiring managers from top tech companies to ensure you learn what\'s in demand.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
      title: 'Personalized Mentorship',
      description: '1:1 sessions with senior engineers and career coaches to guide your unique journey.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
      title: 'Guaranteed Interview Prep',
      description: 'Technical interviews, system design, and soft skills workshops to boost your confidence.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      ),
      title: 'Real-World Projects',
      description: 'Work on actual client projects and build a portfolio that impresses employers.',
    },
  ];

  // Stats data
  const stats = [
    { value: 95, suffix: '%', label: 'Placement Rate' },
    { value: 500, suffix: '+', label: 'Alumni Network' },
    { value: 25, suffix: '+', label: 'Industry Partners' },
    { value: 100, suffix: '%', label: 'Project-Based' },
  ];

  return (
    <main className="flex-grow overflow-hidden">
      {/* ========================================
          HERO SECTION - Compact Design with Tech Stack Visible
          ======================================== */}
      <section className="relative py-16 md:py-20 hero-gradient overflow-hidden" aria-labelledby="hero-heading">
        {/* Floating Decorative Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement duration={8} distance={30} className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
          <FloatingElement duration={10} distance={20} className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary-light/30 blur-3xl" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Left-aligned Content */}
          <AnimatedSection direction="up" className="max-w-2xl">
            <motion.h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white mb-6 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Transform Your Passion Into a{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-accent-light">High-Growth</span>
                <motion.span
                  className="absolute bottom-2 left-0 w-full h-3 bg-accent/30 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                />
              </span>{' '}
              Tech Career
            </motion.h1>

            <motion.p
              className="text-lg text-gray-200 mb-8 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Expert-led programs in DevOps & Full-Stack Development. Build real projects,
              get mentored by industry leaders, and land your dream job.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="btn-accent text-base px-8 py-4 shadow-xl shadow-accent/30"
                >
                  Start Your Journey
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#features"
                  className="btn-outline text-base px-8 py-4 text-white border-white/30 hover:bg-white hover:text-primary"
                >
                  Learn More
                </a>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========================================
          TECH STACK MARQUEE
          ======================================== */}
      <section id="tech-stack" className="py-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
              Master Modern Technologies
            </p>
          </AnimatedSection>

          <div className="relative overflow-hidden mask-gradient">
            <motion.div
              className="flex gap-16"
              animate={{ x: [0, -1920] }}
              transition={{
                x: { duration: 30, repeat: Infinity, ease: 'linear' }
              }}
            >
              {/* Double the tech stack for seamless loop */}
              {[...techStack, ...techStack, ...techStack].map((tech, index) => (
                <motion.div
                  key={`${tech.name}-${index}`}
                  className="flex flex-col items-center group cursor-pointer flex-shrink-0"
                  whileHover={{ scale: 1.15, y: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <div className="relative p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-xl transition-shadow">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="h-14 w-14 object-contain"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="mt-3 text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:text-accent transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          FEATURES SECTION
          ======================================== */}
      <section id="features" className="py-24 relative overflow-hidden" aria-labelledby="features-heading">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-accent/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Why Choose Us
            </motion.span>
            <h2 id="features-heading" className="text-4xl md:text-5xl font-black font-heading text-primary dark:text-white mb-6">
              Why <span className="text-gradient">HexHive</span> Stands Out
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We don&apos;t just teach code; we build careers with a proven methodology.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  className="glass-card p-8 h-full group"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="feature-icon mb-6"
                    whileHover={{ rotate: -10, scale: 1.1 }}
                  >
                    {feature.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold text-primary dark:text-white mb-3 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Indicator */}
                  <motion.div
                    className="mt-4 flex items-center text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <span className="text-sm font-semibold">Learn more</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========================================
          STATS SECTION
          ======================================== */}
      <section className="py-20" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-accent" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPgo8L3N2Zz4=')] opacity-50" />

              <div className="relative p-12 md:p-16">
                <h2 id="stats-heading" className="sr-only">Our Impact</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="stat-number mb-2">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2} />
                      </div>
                      <span className="text-lg font-medium text-gray-200 uppercase tracking-wide">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========================================
          CONTACT SECTION
          ======================================== */}
      <section id="contact" className="py-24 bg-primary/5 dark:bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black font-heading text-primary dark:text-white mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Visit Us */}
              <AnimatedSection>
                <div className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Visit Us</h3>
                      <p className="text-gray-600 dark:text-gray-400">No.58, Canteen Street</p>
                      <p className="text-gray-600 dark:text-gray-400">First Floor</p>
                      <p className="text-gray-600 dark:text-gray-400">Pondicherry - 605001</p>
                      <p className="text-gray-600 dark:text-gray-400">India</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Call Us */}
              <AnimatedSection delay={0.1}>
                <div className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
                      <p className="text-gray-600 dark:text-gray-400">+97513 97500</p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                      <a href="tel:+9751397500" className="inline-flex items-center gap-1 mt-2 text-accent hover:text-accent-dark dark:hover:text-accent-light font-semibold text-sm transition-colors">
                        Call Now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Email Us */}
              <AnimatedSection delay={0.2}>
                <div className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
                      <p className="text-gray-600 dark:text-gray-400">contact@hexhive.solutions</p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm">We respond within 24 hours</p>
                      <a href="mailto:contact@hexhive.solutions" className="inline-flex items-center gap-1 mt-2 text-accent hover:text-accent-dark dark:hover:text-accent-light font-semibold text-sm transition-colors">
                        Send Email
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Map */}
            <AnimatedSection direction="right">
              <div className="glass-card p-4 h-full min-h-[500px]">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 px-2">Our Location</h3>
                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-[450px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.4876244766474!2d79.82777897507825!3d11.936093688256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5361ab8e49cfcf%3A0xcc6bd326d2f201d4!2sCanteen%20Street%2C%20Puducherry%2C%20India!5e0!3m2!1sen!2sus!4v1705681234567!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="HexHive Location"
                    className="w-full h-full rounded-xl dark:invert dark:hue-rotate-180 dark:contrast-75 transition-all duration-300"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========================================
          CTA SECTION
          ======================================== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection direction="scale">
            <motion.div
              className="relative glass-panel p-12 md:p-16 text-center overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Floating Elements */}
              <FloatingElement duration={6} distance={10} className="absolute top-10 left-10 w-20 h-20 rounded-full bg-accent/10 blur-2xl" />
              <FloatingElement duration={8} distance={15} className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-black font-heading text-primary dark:text-white mb-6">
                  Ready to Launch Your<br />
                  <span className="text-gradient">Tech Career?</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                  Join thousands of successful alumni. Take the first step towards a future-proof career in tech.
                </p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="btn-accent text-xl px-12 py-6 shadow-2xl shadow-accent/30"
                  >
                    Enroll Now — It&apos;s Free to Apply
                    <svg className="w-6 h-6 ml-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>

                <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  No payment required • Get career counseling first
                </p>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default Home;