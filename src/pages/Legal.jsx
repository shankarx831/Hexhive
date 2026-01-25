import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Cookie, ChevronRight, FileText } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Legal = () => {
    const [activeTab, setActiveTab] = useState('privacy');

    const tabs = [
        { id: 'privacy', label: 'Privacy Policy', icon: Shield },
        { id: 'terms', label: 'Terms of Service', icon: FileText },
        { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
    ];

    return (
        <main className="flex-grow bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Header */}
            <section className="bg-primary pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <AnimatedSection>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                            Legal Center
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Transparency is key. Here you'll find all the details about how we operate and protect your data.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-12 -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/4">
                        <div className="glass-card p-4 sticky top-24">
                            <nav className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${activeTab === tab.id
                                                ? 'bg-accent text-white shadow-lg'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        <tab.icon size={20} />
                                        {tab.label}
                                        {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:w-3/4">
                        <div className="glass-card p-8 md:p-12 min-h-[600px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >

                                    {/* PRIVACY POLICY */}
                                    {activeTab === 'privacy' && (
                                        <article className="prose dark:prose-invert max-w-none">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
                                                    <Shield size={32} />
                                                </div>
                                                <div>
                                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-0">Privacy Policy</h2>
                                                    <p className="text-gray-500 dark:text-gray-400 mt-1">Last updated: January 25, 2026</p>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Introduction</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                At HexHive, we take your privacy seriously. This policy describes how we collect, use, and handle your data when you use our website and services. By using our platform, you consent to the practices described in this policy.
                                            </p>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Information We Collect</h3>
                                            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                                                <li><strong>Personal Information:</strong> Name, email address, phone number, and educational background provided during registration.</li>
                                                <li><strong>Usage Data:</strong> Information on how you interact with our website, such as IP address, browser type, and pages visited.</li>
                                                <li><strong>Cookies:</strong> Small data files stored on your device to enhance user experience (see Cookie Policy).</li>
                                            </ul>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. How We Use Your Data</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                We use your information to:
                                            </p>
                                            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                                                <li>Process your enrollment and provide access to courses.</li>
                                                <li>Send you important updates, certificates, and invoices.</li>
                                                <li>Improve our website performance and user experience.</li>
                                                <li>Comply with legal obligations.</li>
                                            </ul>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Data Security</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
                                            </p>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Contact Us</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                If you have questions about this Privacy Policy, please contact us at <a href="mailto:privacy@hexhive.solutions" className="text-accent hover:underline">privacy@hexhive.solutions</a>.
                                            </p>
                                        </article>
                                    )}

                                    {/* TERMS OF SERVICE */}
                                    {activeTab === 'terms' && (
                                        <article className="prose dark:prose-invert max-w-none">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400">
                                                    <FileText size={32} />
                                                </div>
                                                <div>
                                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-0">Terms of Service</h2>
                                                    <p className="text-gray-500 dark:text-gray-400 mt-1">Last updated: January 25, 2026</p>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                By accessing or using HexHive's website and services, you agree to be bound by these Terms of Service. If you do not agree, strictly do not use our services.
                                            </p>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Educational Services</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                HexHive provides online and offline technical training. We reserve the right to modify course content, schedules, and instructors at our discretion to ensure the highest quality of education.
                                            </p>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. User Conduct</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                You agree not to use our specific services for any unlawful purpose. You must not harass other students, disrupt classes, or attempt to gain unauthorized access to our systems.
                                            </p>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Intellectual Property</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                All course materials, code, and content provided by HexHive are our intellectual property. You likely may use them for personal learning but may not redistribute, sell, or copy them without permission.
                                            </p>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Limitation of Liability</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                HexHive is not liable for any indirect, incidental, or consequential damages arising from your use of our services.
                                            </p>
                                        </article>
                                    )}

                                    {/* COOKIE POLICY */}
                                    {activeTab === 'cookies' && (
                                        <article className="prose dark:prose-invert max-w-none">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl text-orange-600 dark:text-orange-400">
                                                    <Cookie size={32} />
                                                </div>
                                                <div>
                                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-0">Cookie Policy</h2>
                                                    <p className="text-gray-500 dark:text-gray-400 mt-1">Last updated: January 25, 2026</p>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. What Are Cookies?</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your experience.
                                            </p>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Implementation of Cookies</h3>
                                            <div className="space-y-4">
                                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Essential Cookies</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Required for the website to function (e.g., login session, security).</p>
                                                </div>
                                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Analytics Cookies</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Help us understand how visitors use our site so we can improve it.</p>
                                                </div>
                                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Functional Cookies</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Remember your preferences like theme (Dark/Light mode) and language.</p>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Managing Cookies</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                You can control and/or delete cookies as you wish using your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
                                            </p>
                                        </article>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Legal;
