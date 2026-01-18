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
    <main className="flex-grow">
      <section className="relative bg-primary text-white py-20 text-center" aria-labelledby="programs-hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <h1 id="programs-hero-heading" className="text-4xl md:text-5xl font-black font-heading mb-6">Our Flagship Programs</h1>
          <p className="text-xl text-gray-200 max-w-2xl mb-8">
            Designed by industry experts to bridge the skills gap and accelerate your career.
          </p>
          <button
            onClick={() => {
              document.getElementById('program-details')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block px-8 py-3 border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent hover:text-white transition-colors cursor-pointer"
          >
            Explore Courses
          </button>
        </div>
      </section>

      <section id="program-details" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="programs-heading">
        <div className="text-center mb-12">
          <h2 id="programs-heading" className="text-3xl md:text-4xl font-black font-heading text-primary dark:text-accent-light mb-4 transition-colors">In-Depth Program Details</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">Choose the path that aligns with your career goals.</p>
        </div>

        <div className="space-y-4" id="programsAccordion">

          {/* DevOps Accordion */}
          <div className="glass-card overflow-hidden" id="devops">
            <h3 className="m-0">
              <button
                className={`w-full flex justify-between items-center p-6 text-left font-bold text-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent ${activeAccordion === 'devops' ? 'bg-primary/95 text-white backdrop-blur-md' : 'bg-transparent text-primary hover:bg-white/50 dark:text-white dark:hover:bg-white/10'}`}
                type="button"
                aria-expanded={activeAccordion === 'devops'}
                aria-controls="devops-content"
                onClick={() => toggleAccordion('devops')}
              >
                <span className="flex-grow">DevOps Engineering</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-4 ${activeAccordion === 'devops' ? 'bg-accent/20 text-white' : 'bg-accent text-white'}`}>6 Months</span>
                <svg className={`w-6 h-6 transform transition-transform duration-300 ${activeAccordion === 'devops' ? 'rotate-180 text-white' : 'text-primary dark:text-white'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" /></svg>
              </button>
            </h3>
            <div id="devops-content" className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === 'devops' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`} aria-hidden={activeAccordion !== 'devops'}>
              <div className="p-6 md:p-8 border-t border-gray-100 dark:border-gray-700">
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed transition-colors">Master CI/CD pipelines, cloud infrastructure, and automation. Become the bridge between development and operations.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-primary dark:text-accent-light transition-colors">Curriculum Highlights</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 transition-colors">
                      <li>Linux & Scripting (Bash, Python)</li>
                      <li>Git & GitHub Workflows</li>
                      <li>Containerization with Docker</li>
                      <li>Orchestration with Kubernetes</li>
                      <li>Cloud Platforms (AWS / Azure)</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-primary dark:text-accent-light transition-colors">Key Outcomes</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 transition-colors">
                      <li>Build, test, and deploy scalable applications</li>
                      <li>Automate infrastructure provisioning</li>
                      <li>Manage cloud environments effectively</li>
                    </ul>
                    <div className="pt-4">
                      <h4 className="text-lg font-bold text-primary dark:text-accent-light mb-2 transition-colors">Ideal For</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors">Engineers seeking ops roles, SREs, or cloud specialists.</p>
                      <Link to="/register?program=devops" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-accent hover:bg-accent-light transition-colors shadow-md">Enroll in DevOps</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Stack Accordion */}
          <div className="glass-card overflow-hidden" id="fullstack">
            <h3 className="m-0">
              <button
                className={`w-full flex justify-between items-center p-6 text-left font-bold text-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent ${activeAccordion === 'fullstack' ? 'bg-primary/95 text-white backdrop-blur-md' : 'bg-transparent text-primary hover:bg-white/50 dark:text-white dark:hover:bg-white/10'}`}
                type="button"
                aria-expanded={activeAccordion === 'fullstack'}
                onClick={() => toggleAccordion('fullstack')}
              >
                <span className="flex-grow">Full-Stack Development</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-4 ${activeAccordion === 'fullstack' ? 'bg-accent/20 text-white' : 'bg-accent text-white'}`}>6 Months</span>
                <svg className={`w-6 h-6 transform transition-transform duration-300 ${activeAccordion === 'fullstack' ? 'rotate-180 text-white' : 'text-primary dark:text-white'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" /></svg>
              </button>
            </h3>
            <div id="fullstack-content" className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === 'fullstack' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`} aria-hidden={activeAccordion !== 'fullstack'}>
              <div className="p-6 md:p-8 border-t border-gray-100 dark:border-gray-700">
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed transition-colors">Build dynamic, data-driven web applications from front to back. Master modern frameworks and databases.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-primary dark:text-accent-light transition-colors">Curriculum Highlights</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 transition-colors">
                      <li>HTML5, CSS3, JavaScript (ES6+)</li>
                      <li>Frontend Frameworks (React / Vue.js)</li>
                      <li>Backend with Node.js & Express</li>
                      <li>Databases (MongoDB, PostgreSQL)</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-primary dark:text-accent-light transition-colors">Key Outcomes</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 transition-colors">
                      <li>Create modern, responsive web applications</li>
                      <li>Work with both SQL and NoSQL databases</li>
                      <li>Understand the full development lifecycle</li>
                    </ul>
                    <div className="pt-4">
                      <h4 className="text-lg font-bold text-primary dark:text-accent-light mb-2 transition-colors">Ideal For</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors">Career changers, junior devs, or anyone wanting full-stack skills.</p>
                      <Link to="/register?program=fullstack" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-accent hover:bg-accent-light transition-colors shadow-md">Enroll in Full-Stack</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Systems Accordion */}
          <div className="glass-card overflow-hidden" id="embedded">
            <h3 className="m-0">
              <button
                className={`w-full flex justify-between items-center p-6 text-left font-bold text-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent ${activeAccordion === 'embedded' ? 'bg-primary/95 text-white backdrop-blur-md' : 'bg-transparent text-primary hover:bg-white/50 dark:text-white dark:hover:bg-white/10'}`}
                type="button"
                aria-expanded={activeAccordion === 'embedded'}
                onClick={() => toggleAccordion('embedded')}
              >
                <span className="flex-grow">Embedded Systems & IoT</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-4 ${activeAccordion === 'embedded' ? 'bg-accent/20 text-white' : 'bg-accent text-white'}`}>40 Hours</span>
                <svg className={`w-6 h-6 transform transition-transform duration-300 ${activeAccordion === 'embedded' ? 'rotate-180 text-white' : 'text-primary dark:text-white'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" /></svg>
              </button>
            </h3>
            <div id="embedded-content" className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === 'embedded' ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`} aria-hidden={activeAccordion !== 'embedded'}>
              <div className="p-6 md:p-8 border-t border-gray-100 dark:border-gray-700">
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed transition-colors">Master the hardware-software interface. Dive into microcontrollers, real-time operating systems, and IoT protocols.</p>

                <div className="space-y-8">
                  {/* Module 1 */}
                  <div>
                    <h4 className="text-lg font-bold text-primary dark:text-accent-light mb-2">Module 1: Foundations of Embedded Systems (8 hours)</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                      <li><strong>Introduction:</strong> What is an embedded system?, Applications in IoT, automotive, robotics</li>
                      <li><strong>Basic Electronics:</strong> Voltage, current, resistance, Ohm’s law, Digital vs. analog signals</li>
                      <li><strong>Microcontroller Basics:</strong> Architecture overview, GPIO, timers, interrupts</li>
                      <li><strong>Lab:</strong> LED blinking, button input</li>
                    </ul>
                  </div>

                  {/* Module 2 */}
                  <div>
                    <h4 className="text-lg font-bold text-primary dark:text-accent-light mb-2">Module 2: Programming for Embedded Systems (10 hours)</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                      <li><strong>Embedded C Fundamentals:</strong> Variables, loops, functions, Standard C vs embedded C</li>
                      <li><strong>Development Tools:</strong> IDEs (Arduino IDE, Keil, MPLAB), Compilers and debuggers</li>
                      <li><strong>Hands-on Labs:</strong> Sensor interfacing (temperature, light), PWM for motor control</li>
                    </ul>
                  </div>

                  {/* Module 3 */}
                  <div>
                    <h4 className="text-lg font-bold text-primary dark:text-accent-light mb-2">Module 3: Communication & Interfaces (8 hours)</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                      <li><strong>Protocols:</strong> UART, SPI, I2C, CAN bus basics</li>
                      <li><strong>Peripheral Interfacing:</strong> ADC/DAC, LCD/OLED displays</li>
                      <li><strong>Lab:</strong> Multi-sensor integration, Display + input project</li>
                    </ul>
                  </div>

                  {/* Module 4 */}
                  <div>
                    <h4 className="text-lg font-bold text-primary dark:text-accent-light mb-2">Module 4: Real-Time Systems & RTOS (8 hours)</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                      <li><strong>Real-Time Concepts:</strong> Polling vs. interrupts, Task scheduling</li>
                      <li><strong>RTOS Basics:</strong> FreeRTOS introduction, Tasks, semaphores, queues</li>
                      <li><strong>Lab:</strong> Implement multitasking with FreeRTOS</li>
                    </ul>
                  </div>

                  {/* Module 5 */}
                  <div>
                    <h4 className="text-lg font-bold text-primary dark:text-accent-light mb-2">Module 5: Capstone & Industry Practices (6 hours)</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                      <li><strong>Capstone Project:</strong> IoT device with cloud backend, Robotics control system, or Industrial automation prototype</li>
                      <li><strong>Professional Practices:</strong> Documentation & design patterns, Agile/DevOps in embedded development</li>
                    </ul>
                  </div>

                  <div className="pt-4 mt-8 border-t border-gray-200 dark:border-gray-600">
                    <h4 className="text-lg font-bold text-primary dark:text-accent-light mb-2 transition-colors">Ideal For</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors">Electronics engineers, hobbyists, computer science students interested in hardware.</p>
                    <Link to="/register?program=embedded" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-accent hover:bg-accent-light transition-colors shadow-md">Enroll in Embedded Systems</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>

        <section className="mt-20 text-center">
          <div className="max-w-3xl mx-auto bg-primary rounded-2xl p-8 md:p-12 shadow-2xl text-white">
            <h2 className="text-3xl font-bold font-heading mb-4">Still Deciding?</h2>
            <p className="text-lg text-gray-300 mb-8">Our career advisors can help you choose the perfect program.</p>
            <Link to="/register" className="inline-block px-10 py-4 bg-white text-primary text-lg font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">Talk to an Advisor</Link>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Programs;