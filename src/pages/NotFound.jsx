import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const NotFound = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg mx-auto"
            >
                <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 10 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
                    className="inline-block mb-6"
                >
                    <AlertCircle className="w-24 h-24 text-accent/20" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                    404 <span className="text-gray-300 dark:text-gray-700">|</span> Page Not Found
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved. We apologize for the inconvenience.
                </p>

                <div className="bg-primary/5 dark:bg-accent/5 rounded-2xl p-6 mb-8 border border-primary/10 dark:border-accent/10">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Automatic Redirect
                    </p>
                    <div className="text-2xl font-bold text-primary dark:text-accent">
                        Returning to Home in {count}s
                    </div>
                </div>

                <motion.button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-bold shadow-lg shadow-primary/20 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home Immediately
                </motion.button>
            </motion.div>
        </div>
    );
};

export default NotFound;
