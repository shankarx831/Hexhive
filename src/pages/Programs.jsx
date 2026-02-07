import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import SEO from '../components/SEO';

const programs = [
  {
    id: 'devops',
    title: 'DevOps Engineering',
    duration: '6 Months',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    description: 'Master CI/CD pipelines, cloud infrastructure, and automation. Become the bridge between development and operations.',
    curriculum: [
      'Linux & Scripting (Bash, Python)',
      'Git & GitHub Workflows',
      'Containerization with Docker',
      'Orchestration with Kubernetes',
      'Cloud Platforms (AWS / Azure)',
    ],
    outcomes: [
      'Build, test, and deploy scalable applications',
      'Automate infrastructure provisioning',
      'Manage cloud environments effectively',
    ],
    idealFor: 'Engineers seeking ops roles, SREs, or cloud specialists.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    duration: '6 Months',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description: 'Build dynamic, data-driven web applications from front to back. Master modern frameworks and databases.',
    curriculum: [
      'HTML5, CSS3, JavaScript (ES6+)',
      'Frontend Frameworks (React / Vue.js)',
      'Backend with Node.js & Express',
      'Databases (MongoDB, PostgreSQL)',
    ],
    outcomes: [
      'Create modern, responsive web applications',
      'Work with both SQL and NoSQL databases',
      'Understand the full development lifecycle',
    ],
    idealFor: 'Career changers, junior devs, or anyone wanting full-stack skills.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'embedded',
    title: 'Embedded Systems & IoT',
    duration: '40 Hours',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    description: 'Master the hardware-software interface. Dive into microcontrollers, real-time operating systems, and IoT protocols.',
    modules: [
      {
        title: 'Module 1: Foundations of Embedded Systems (8 hours)',
        topics: [
          'Introduction: What is an embedded system?, Applications in IoT, automotive, robotics',
          'Basic Electronics: Voltage, current, resistance, Ohm\'s law, Digital vs. analog signals',
          'Microcontroller Basics: Architecture overview, GPIO, timers, interrupts',
          'Lab: LED blinking, button input',
        ],
      },
      {
        title: 'Module 2: Programming for Embedded Systems (10 hours)',
        topics: [
          'Embedded C Fundamentals: Variables, loops, functions, Standard C vs embedded C',
          'Development Tools: IDEs (Arduino IDE, Keil, MPLAB), Compilers and debuggers',
          'Hands-on Labs: Sensor interfacing (temperature, light), PWM for motor control',
        ],
      },
      {
        title: 'Module 3: Communication & Interfaces (8 hours)',
        topics: [
          'Protocols: UART, SPI, I2C, CAN bus basics',
          'Peripheral Interfacing: ADC/DAC, LCD/OLED displays',
          'Lab: Multi-sensor integration, Display + input project',
        ],
      },
      {
        title: 'Module 4: Real-Time Systems & RTOS (8 hours)',
        topics: [
          'Real-Time Concepts: Polling vs. interrupts, Task scheduling',
          'RTOS Basics: FreeRTOS introduction, Tasks, semaphores, queues',
          'Lab: Implement multitasking with FreeRTOS',
        ],
      },
      {
        title: 'Module 5: Capstone & Industry Practices (6 hours)',
        topics: [
          'Capstone Project: IoT device with cloud backend, Robotics control system, or Industrial automation prototype',
          'Professional Practices: Documentation & design patterns, Agile/DevOps in embedded development',
        ],
      },
    ],
    idealFor: 'Electronics engineers, hobbyists, computer science students interested in hardware.',
    color: 'from-green-500 to-emerald-500',
  },
];

const Programs = () => {

  const [activeAccordion, setActiveAccordion] = useState(null);
  const location = useLocation();

  // If URL is /programs#devops, automatically open that accordion and scroll
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
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <>
      <SEO
        title="Our Programs"
        description="Explore our expert-led programs in DevOps, Full-Stack Development, and Embedded Systems. 100% project-based learning."
        keywords="DevOps course, Full Stack development, Embedded Systems training, coding bootcamp"
      />
      <main className="flex-grow overflow-hidden">

        {/* ========================================
          HERO SECTION
          ======================================== */}
        <section className="relative py-24 md:py-32 hero-gradient overflow-hidden" aria-labelledby="programs-hero-heading">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-light/30 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection className="text-center">
              <motion.span
                className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                🎓 Industry-Recognized Programs
              </motion.span>

              <h1 id="programs-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white mb-6 leading-tight">
                Our Flagship<br />
                <span className="text-accent-light">Programs</span>
              </h1>

              <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
                Designed by industry experts to bridge the skills gap and accelerate your career in tech.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  onClick={() => document.getElementById('program-details')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-outline text-white border-white/30 hover:bg-white hover:text-primary px-8 py-4 w-full sm:w-auto flex items-center justify-center font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Courses
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ========================================
          PROGRAM DETAILS SECTION
          ======================================== */}
        <section id="program-details" className="py-20 md:py-28" aria-labelledby="programs-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 id="programs-heading" className="text-3xl md:text-4xl font-black font-heading text-primary dark:text-white mb-4">
                In-Depth <span className="text-gradient">Program Details</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Choose the path that aligns with your career goals.
              </p>
            </AnimatedSection>

            <StaggerContainer className="space-y-6">
              {programs.map((program) => (
                <StaggerItem key={program.id}>
                  <motion.div
                    id={program.id}
                    className="glass-card overflow-hidden"
                    layout
                  >
                    {/* Accordion Header */}
                    <motion.button
                      className={`w-full flex items-center gap-4 p-6 md:p-8 text-left transition-all duration-300 ${activeAccordion === program.id
                        ? 'bg-gradient-to-r ' + program.color + ' text-white'
                        : 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}
                      onClick={() => toggleAccordion(program.id)}
                      aria-expanded={activeAccordion === program.id}
                    >
                      {/* Icon */}
                      <motion.div
                        className={`p-3 rounded-xl ${activeAccordion === program.id
                          ? 'bg-white/20'
                          : 'bg-gradient-to-r ' + program.color + ' text-white'
                          }`}
                        whileHover={{ rotate: 10 }}
                      >
                        {program.icon}
                      </motion.div>

                      {/* Title & Duration */}
                      <div className="flex-grow">
                        <h3 className={`text-xl md:text-2xl font-bold ${activeAccordion === program.id
                          ? 'text-white'
                          : 'text-primary dark:text-white'
                          }`}>
                          {program.title}
                        </h3>
                        <p className={`text-sm mt-1 ${activeAccordion === program.id
                          ? 'text-white/80'
                          : 'text-gray-500 dark:text-gray-400'
                          }`}>
                          {program.duration} • Hands-on Training
                        </p>
                      </div>

                      {/* Duration Badge */}
                      <span className={`hidden sm:inline-block px-4 py-2 rounded-full text-sm font-semibold ${activeAccordion === program.id
                        ? 'bg-white/20 text-white'
                        : 'bg-accent/10 text-accent'
                        }`}>
                        {program.duration}
                      </span>

                      {/* Arrow */}
                      <motion.svg
                        className={`w-6 h-6 flex-shrink-0 ${activeAccordion === program.id ? 'text-white' : 'text-gray-400'
                          }`}
                        animate={{ rotate: activeAccordion === program.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </motion.button>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {activeAccordion === program.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 md:p-8 border-t border-gray-100 dark:border-gray-700">
                            <motion.p
                              className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              {program.description}
                            </motion.p>

                            {/* For DevOps and Full-Stack */}
                            {program.curriculum && (
                              <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <div className="space-y-4">
                                  <h4 className="text-lg font-bold text-primary dark:text-accent-light flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                      📚
                                    </span>
                                    Curriculum Highlights
                                  </h4>
                                  <ul className="space-y-3">
                                    {program.curriculum.map((item, idx) => (
                                      <motion.li
                                        key={idx}
                                        className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.05 }}
                                      >
                                        <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="space-y-4">
                                  <h4 className="text-lg font-bold text-primary dark:text-accent-light flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                      🎯
                                    </span>
                                    Key Outcomes
                                  </h4>
                                  <ul className="space-y-3">
                                    {program.outcomes.map((item, idx) => (
                                      <motion.li
                                        key={idx}
                                        className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + idx * 0.05 }}
                                      >
                                        <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {item}
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>
                            )}

                            {/* For Embedded Systems (modules) */}
                            {program.modules && (
                              <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                {program.modules.map((module, idx) => (
                                  <motion.div
                                    key={idx}
                                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                  >
                                    <h4 className="font-bold text-primary dark:text-accent-light mb-3">
                                      {module.title}
                                    </h4>
                                    <ul className="space-y-2">
                                      {module.topics.map((topic, tIdx) => (
                                        <li key={tIdx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                          <span className="text-accent">•</span>
                                          {topic}
                                        </li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}

                            {/* Ideal For & CTA */}
                            <motion.div
                              className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <div>
                                <h4 className="font-bold text-primary dark:text-accent-light mb-1">Ideal For</h4>
                                <p className="text-gray-600 dark:text-gray-300">{program.idealFor}</p>
                              </div>
                              <div className="flex flex-wrap items-center gap-4">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Link
                                    to={`/register?program=${program.id}`}
                                    className="btn-accent px-6 py-3 text-base whitespace-nowrap font-bold"
                                  >
                                    Enroll in {program.title.split(' ')[0]}
                                    <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                  </Link>
                                </motion.div>

                                {program.id === 'devops' && (
                                  <motion.a
                                    href="https://drive.google.com/file/d/1LC94eZkjOTo6cs02UUQHnNN10SSW49jt/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline px-6 py-3 text-base whitespace-nowrap flex items-center border-accent/30 text-accent hover:bg-accent hover:text-white transition-all font-bold"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Full Course PDF
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  </motion.a>
                                )}
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ========================================
          CTA SECTION
          ======================================== */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <AnimatedSection direction="scale">
              <motion.div
                className="relative rounded-3xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-accent" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPgo8L3N2Zz4=')] opacity-50" />

                <div className="relative p-12 md:p-16 text-center">
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold font-heading text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Still Deciding?
                  </motion.h2>
                  <motion.p
                    className="text-lg text-gray-200 mb-8 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Our career advisors can help you choose the perfect program based on your background and goals.
                  </motion.p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to="/register"
                      className="inline-flex items-center px-10 py-5 bg-white text-primary text-lg font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-xl"
                    >
                      Talk to an Advisor
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </>
  );
};

export default Programs;