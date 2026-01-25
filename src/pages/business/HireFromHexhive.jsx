import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Briefcase, Code, CheckCircle, Users, Rocket, ArrowRight,
    Cpu, Database, Globe, Shield, TrendingUp, Clock
} from 'lucide-react';
import AnimatedSection, {
    StaggerContainer, StaggerItem, MagneticButton
} from '../../components/AnimatedSection';

const HireFromHexhive = () => {
    const pipeline = [
        { title: "Structured Training", icon: Code, desc: "Comprehensive curriculum covering full-stack development", color: "bg-primary/10 text-primary dark:text-accent" },
        { title: "Project-Based Learning", icon: Rocket, desc: "Hands-on experience with real-world applications", color: "bg-accent/10 text-accent" },
        { title: "Soft Skills", icon: Users, desc: "Communication, collaboration, and professional practices", color: "bg-primary-light/10 text-primary-light dark:text-accent-light" },
        { title: "Interview Prep", icon: CheckCircle, desc: "Technical and behavioral interview preparation", color: "bg-accent-light/10 text-accent-dark dark:text-accent" }
    ];

    const skills = [
        { label: "Frontend", icon: Globe, stacks: ["React", "Next.js", "Vue", "Tailwind", "TypeScript"] },
        { label: "Backend", icon: Database, stacks: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"] },
        { label: "DevOps", icon: Cpu, stacks: ["Docker", "Kubernetes", "AWS", "CI/CD", "Git"] }
    ];

    const benefits = [
        { icon: Clock, title: "Streamlined Hiring", desc: "Pre-screened candidates ready for interviews." },
        { icon: Shield, title: "Trial Period", desc: "Evaluate fit before making long-term commitments." },
        { icon: TrendingUp, title: "Job-Ready Skills", desc: "Candidates trained on industry-standard tools." },
        { icon: Users, title: "Ongoing Support", desc: "We help with onboarding and early-stage mentoring." }
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
                            <Briefcase className="w-4 h-4" />
                            <span>Hiring Partners</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
                            Find Skilled <br /><span className="text-accent-light">Developers.</span>
                        </h1>
                        <p className="text-2xl text-accent-light/90 font-light max-w-2xl mx-auto leading-relaxed mb-8">
                            Connect with developers who have been trained on practical, project-based learning and are ready to contribute.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/#contact"><MagneticButton className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-2xl flex items-center gap-2">Talk to Us <ArrowRight className="w-5 h-5" /></MagneticButton></Link>
                            <a href="#process"><MagneticButton className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/10">Our Process</MagneticButton></a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Training Pipeline */}
            <section id="process" className="py-24 bg-primary/5 dark:bg-primary/10">
                <div className="max-w-7xl mx-auto px-4">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">How We Prepare Candidates</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">A structured approach to building job-ready skills.</p>
                    </AnimatedSection>
                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pipeline.map((step, i) => (
                            <StaggerItem key={i}>
                                <motion.div className="glass-card p-8 h-full text-center" whileHover={{ y: -5 }}>
                                    <div className="text-5xl font-black text-accent/20 mb-4">0{i + 1}</div>
                                    <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center mb-4 mx-auto`}><step.icon size={28} /></div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Technologies Our Candidates Learn</h2>
                    </AnimatedSection>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {skills.map((area, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="glass-card p-8 h-full">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-xl text-accent"><area.icon size={28} /></div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{area.label}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {area.stacks.map((tech, j) => (<span key={j} className="px-3 py-1.5 bg-primary/5 dark:bg-primary/10 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">{tech}</span>))}
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 bg-primary/5 dark:bg-primary/10">
                <div className="max-w-7xl mx-auto px-4">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Why Partner With Us</h2>
                    </AnimatedSection>
                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((item, i) => (
                            <StaggerItem key={i}>
                                <div className="glass-card p-8 text-center h-full">
                                    <div className="bg-accent/10 p-4 rounded-2xl w-fit mx-auto mb-4"><item.icon className="w-8 h-8 text-accent" /></div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <AnimatedSection>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Looking for Talent?</h2>
                        <p className="text-xl text-accent-light mb-8">Let's discuss how we can help.</p>
                        <Link to="/#contact"><MagneticButton className="px-10 py-5 bg-cream text-primary text-lg font-bold rounded-xl shadow-2xl">Contact Us</MagneticButton></Link>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    );
};

export default HireFromHexhive;
