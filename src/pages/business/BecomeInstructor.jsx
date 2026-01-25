import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Users, CheckCircle, ArrowRight, Video, Calendar, DollarSign,
    Heart, Star, Shield, Briefcase, BookOpen, Clock
} from 'lucide-react';
import AnimatedSection, {
    StaggerContainer, StaggerItem, MagneticButton
} from '../../components/AnimatedSection';

const BecomeInstructor = () => {
    const steps = [
        { step: "01", title: "Apply", icon: Briefcase, desc: "Submit your profile and a brief introduction about your teaching interests." },
        { step: "02", title: "Interview", icon: Video, desc: "A conversation to understand your expertise and teaching style." },
        { step: "03", title: "Onboard", icon: BookOpen, desc: "Get familiar with our curriculum, tools, and community guidelines." },
        { step: "04", title: "Teach", icon: Users, desc: "Start conducting sessions and helping students grow." }
    ];

    const benefits = [
        { icon: <DollarSign className="w-8 h-8 text-accent" />, title: "Fair Compensation", description: "Competitive hourly rates based on your experience and student feedback." },
        { icon: <Calendar className="w-8 h-8 text-primary dark:text-accent-light" />, title: "Flexible Schedule", description: "Choose your own hours. Teach when it works best for you." },
        { icon: <Star className="w-8 h-8 text-accent-light" />, title: "Professional Growth", description: "Refine your communication skills and build a teaching portfolio." },
        { icon: <Heart className="w-8 h-8 text-primary-light dark:text-accent" />, title: "Make an Impact", description: "Help students develop practical skills and advance their careers." }
    ];

    const requirements = [
        "Professional experience in software development",
        "Strong communication skills",
        "Familiarity with modern development practices",
        "Genuine interest in mentoring others",
        "Commitment to regular availability"
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
                            <Users className="w-4 h-4" />
                            <span>Become an Instructor</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
                            Share What <br /><span className="text-accent-light">You Know.</span>
                        </h1>
                        <p className="text-2xl text-accent-light/90 font-light max-w-2xl mx-auto leading-relaxed mb-8">
                            Help aspiring developers learn real-world skills. Teach on your own schedule while continuing your career.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/#contact"><MagneticButton className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-2xl flex items-center gap-2">Apply to Teach <ArrowRight className="w-5 h-5" /></MagneticButton></Link>
                            <a href="#how-it-works"><MagneticButton className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/10">Learn More</MagneticButton></a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-primary/5 dark:bg-primary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">A simple process to get started.</p>
                    </AnimatedSection>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <StaggerItem key={i}>
                                <div className="glass-card p-8 h-full text-center hover:-translate-y-2 transition-transform duration-300">
                                    <div className="text-6xl font-black text-accent/20 mb-4">{step.step}</div>
                                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 dark:bg-accent/10 flex items-center justify-center mb-4">
                                        <step.icon className="w-8 h-8 text-primary dark:text-accent" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Why Teach With Us?</h2>
                    </AnimatedSection>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {benefits.map((b, i) => (
                            <StaggerItem key={i}>
                                <div className="glass-card p-8 h-full flex gap-6">
                                    <div className="bg-primary/10 dark:bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0">{b.icon}</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{b.title}</h3>
                                        <p className="text-lg text-gray-600 dark:text-gray-400">{b.description}</p>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Requirements */}
            <section className="py-24 bg-primary/5 dark:bg-primary/10">
                <div className="max-w-4xl mx-auto px-4">
                    <AnimatedSection className="text-center mb-12">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">What We Look For</h2>
                    </AnimatedSection>
                    <AnimatedSection>
                        <div className="glass-card p-8">
                            <ul className="space-y-4">
                                {requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 dark:text-gray-300 text-lg">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <AnimatedSection>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Interested in Teaching?</h2>
                        <p className="text-xl text-accent-light mb-8">We'd love to hear from you.</p>
                        <Link to="/#contact"><MagneticButton className="px-10 py-5 bg-cream text-primary text-lg font-bold rounded-xl shadow-2xl">Get in Touch</MagneticButton></Link>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    );
};

export default BecomeInstructor;
