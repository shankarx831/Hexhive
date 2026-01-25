import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Rocket, ShieldCheck, Target, Check, X, Users, Zap
} from 'lucide-react';
import AnimatedSection, {
    StaggerContainer, StaggerItem, MagneticButton
} from '../../components/AnimatedSection';

const WhyHexhive = () => {
    const values = [
        { icon: Target, title: "Outcome Focused", desc: "We measure success by what our students can build and the careers they launch." },
        { icon: ShieldCheck, title: "Quality Standards", desc: "Code reviews, testing, and documentation are part of every project." },
        { icon: Users, title: "Community Learning", desc: "Peer collaboration and mentorship create a supportive environment." },
        { icon: Zap, title: "Practical Skills", desc: "Everything we teach is applicable to real-world development work." }
    ];

    const comparison = {
        traditional: ["Pre-recorded content", "Theory-focused curriculum", "Limited feedback", "Static material", "No career guidance"],
        hexhive: ["Live interactive sessions", "Project-based learning", "Regular code reviews", "Updated curriculum", "Career support"]
    };

    return (
        <main className="flex-grow overflow-hidden transition-colors duration-300">
            {/* Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-90 dark:opacity-80" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <AnimatedSection>
                        <div className="inline-block border border-accent-light/30 rounded-full px-6 py-2 bg-white/10 backdrop-blur-md text-white font-semibold mb-8">Our Approach</div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">Why <br /><span className="text-accent-light">Hexhive.</span></h1>
                        <p className="text-2xl text-accent-light/90 font-light max-w-2xl mx-auto leading-relaxed mb-8">We focus on practical skills, real projects, and the kind of learning that actually prepares you for the industry.</p>
                        <Link to="/register"><MagneticButton className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-2xl">Get Started</MagneticButton></Link>
                    </AnimatedSection>
                </div>
            </section>

            {/* Comparison */}
            <section className="py-24 px-4 bg-primary/5 dark:bg-primary/10">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white">How We're Different</h2>
                    </AnimatedSection>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <AnimatedSection>
                            <div className="p-8 rounded-3xl bg-gray-200/50 dark:bg-gray-800/50 opacity-70">
                                <h3 className="text-xl font-bold text-gray-500 mb-6 uppercase tracking-wider">Traditional Approach</h3>
                                <ul className="space-y-4">{comparison.traditional.map((item, i) => (<li key={i} className="flex items-center gap-3 text-gray-500"><X className="w-5 h-5" /> {item}</li>))}</ul>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={0.1}>
                            <motion.div className="p-8 rounded-3xl glass-card border-2 border-accent relative transform md:-translate-y-4" whileHover={{ scale: 1.02 }}>
                                <div className="absolute -top-4 left-8 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">Our Approach</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Hexhive</h3>
                                <ul className="space-y-4">{comparison.hexhive.map((item, i) => (<li key={i} className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-medium"><Check className="w-5 h-5 text-accent" /> {item}</li>))}</ul>
                            </motion.div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">What We Believe In</h2>
                    </AnimatedSection>
                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <StaggerItem key={i}>
                                <div className="glass-card p-8 h-full text-center">
                                    <div className="bg-accent/10 dark:bg-accent/20 p-4 rounded-2xl w-fit mx-auto mb-6"><v.icon className="w-8 h-8 text-accent" /></div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{v.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Vision */}
            <section className="py-24 px-4 bg-primary/5 dark:bg-primary/10">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        <Rocket className="w-16 h-16 text-accent mx-auto mb-8" />
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">Our Goal</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">To create a learning environment where developers can gain practical skills, build real projects, and prepare for meaningful careers in technology.</p>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <AnimatedSection>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Ready to Learn?</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/register"><MagneticButton className="btn-primary bg-cream text-primary shadow-lg">Start Learning</MagneticButton></Link>
                            <Link to="/business/hire"><MagneticButton className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/10">Partner With Us</MagneticButton></Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    );
};

export default WhyHexhive;
