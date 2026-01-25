import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Globe, Smartphone, Cloud, Layout, Terminal, ShieldCheck,
    ArrowRight, CheckCircle, Rocket
} from 'lucide-react';
import AnimatedSection, {
    StaggerContainer, StaggerItem, MagneticButton
} from '../../components/AnimatedSection';

const WhatWeDo = () => {
    const services = [
        { icon: <Globe className="w-10 h-10 text-accent" />, title: "Web Development", desc: "Modern, responsive web applications built with best practices.", tech: ["React", "Next.js", "Node.js"], features: ["Progressive Web Apps", "Server-Side Rendering", "API Development"] },
        { icon: <Smartphone className="w-10 h-10 text-primary dark:text-accent-light" />, title: "Mobile Development", desc: "Cross-platform mobile apps for iOS and Android.", tech: ["React Native", "Flutter"], features: ["Offline Support", "Push Notifications", "Native Features"] },
        { icon: <Cloud className="w-10 h-10 text-accent-light" />, title: "Cloud Solutions", desc: "Scalable cloud infrastructure and deployment.", tech: ["AWS", "Azure", "Kubernetes"], features: ["Auto-Scaling", "Load Balancing", "Monitoring"] },
        { icon: <Layout className="w-10 h-10 text-primary-light dark:text-accent" />, title: "UI/UX Design", desc: "User-centered design that prioritizes usability.", tech: ["Figma", "Framer"], features: ["User Research", "Prototyping", "Design Systems"] },
        { icon: <Terminal className="w-10 h-10 text-accent-dark dark:text-accent-light" />, title: "DevOps", desc: "Streamlined development and deployment workflows.", tech: ["Docker", "GitHub Actions"], features: ["CI/CD Pipelines", "Infrastructure as Code"] },
        { icon: <ShieldCheck className="w-10 h-10 text-primary dark:text-accent" />, title: "Security", desc: "Secure development practices and compliance.", tech: ["OAuth", "JWT"], features: ["Security Audits", "Best Practices"] }
    ];

    const approach = [
        { step: "01", title: "Understand", desc: "We learn about your goals, users, and constraints." },
        { step: "02", title: "Design", desc: "We create wireframes and prototypes for feedback." },
        { step: "03", title: "Build", desc: "We develop with clean, tested, documented code." },
        { step: "04", title: "Deploy", desc: "We launch with proper monitoring and support." }
    ];

    return (
        <main className="flex-grow overflow-hidden transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-90 dark:opacity-80" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <AnimatedSection>
                        <div className="inline-flex items-center gap-2 border border-accent-light/30 rounded-full px-6 py-2 bg-white/10 backdrop-blur-md text-white font-semibold mb-8">
                            <Rocket className="w-4 h-4" />
                            <span>Engineering Services</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
                            What We <br /><span className="text-accent-light">Build.</span>
                        </h1>
                        <p className="text-2xl text-accent-light/90 font-light max-w-2xl mx-auto leading-relaxed mb-8">
                            We help businesses build reliable, maintainable software products using modern technologies and proven practices.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/#contact"><MagneticButton className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-2xl flex items-center gap-2">Start a Project <ArrowRight className="w-5 h-5" /></MagneticButton></Link>
                            <a href="#services"><MagneticButton className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/10">View Services</MagneticButton></a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="py-24 px-4 bg-primary/5 dark:bg-primary/10">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Our Services</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">End-to-end development capabilities.</p>
                    </AnimatedSection>
                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((s, i) => (
                            <StaggerItem key={i}>
                                <motion.div className="glass-card p-8 h-full flex flex-col" whileHover={{ y: -8 }}>
                                    <div className="p-4 bg-primary/10 dark:bg-accent/10 rounded-2xl w-fit mb-6">{s.icon}</div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{s.desc}</p>
                                    <div className="space-y-2 mb-6">{s.features.map((f, j) => (<div key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle className="w-4 h-4 text-accent" />{f}</div>))}</div>
                                    <div className="pt-6 border-t border-accent/10 flex flex-wrap gap-2">{s.tech.map((t, j) => (<span key={j} className="px-2 py-1 bg-primary/5 dark:bg-primary/10 rounded text-xs font-medium text-gray-700 dark:text-gray-300">{t}</span>))}</div>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Our Approach */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">How We Work</h2>
                    </AnimatedSection>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {approach.map((step, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="text-center">
                                    <div className="text-7xl font-black text-accent/20 mb-4">{step.step}</div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <AnimatedSection>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Have a Project in Mind?</h2>
                        <p className="text-xl text-accent-light mb-8">Let's talk about how we can help.</p>
                        <Link to="/#contact"><MagneticButton className="px-10 py-5 bg-cream text-primary text-lg font-bold rounded-xl shadow-2xl">Get in Touch</MagneticButton></Link>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    );
};

export default WhatWeDo;
