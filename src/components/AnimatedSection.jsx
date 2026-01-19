import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Animated section that triggers when scrolled into view
const AnimatedSection = ({
    children,
    className = '',
    delay = 0,
    direction = 'up', // 'up', 'down', 'left', 'right', 'scale'
    duration = 0.6,
    once = true,
    amount = 0.2,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    const directionVariants = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { x: 60, y: 0 },
        right: { x: -60, y: 0 },
        scale: { scale: 0.8, y: 0, x: 0 },
    };

    const initialProps = {
        opacity: 0,
        ...directionVariants[direction],
    };

    return (
        <motion.div
            ref={ref}
            initial={initialProps}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
            } : initialProps}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1], // Custom easing for premium feel
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;

// Staggered children animation container
export const StaggerContainer = ({
    children,
    className = '',
    staggerDelay = 0.1,
    delayChildren = 0.2,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Item for stagger container
export const StaggerItem = ({
    children,
    className = '',
    direction = 'up',
}) => {
    const directionVariants = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
        scale: { scale: 0.85, y: 0, x: 0 },
    };

    return (
        <motion.div
            variants={{
                hidden: {
                    opacity: 0,
                    ...directionVariants[direction],
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: 1,
                    transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Magnetic hover effect for buttons
export const MagneticButton = ({ children, className = '', ...props }) => {
    return (
        <motion.button
            whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 400, damping: 17 }
            }}
            whileTap={{ scale: 0.95 }}
            className={className}
            {...props}
        >
            {children}
        </motion.button>
    );
};

// Floating animation for decorative elements
export const FloatingElement = ({
    children,
    className = '',
    duration = 4,
    distance = 15,
}) => {
    return (
        <motion.div
            animate={{
                y: [-distance, distance, -distance],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Text reveal animation (character by character)
export const TextReveal = ({
    text,
    className = '',
    staggerDelay = 0.03,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <motion.span
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {text.split('').map((char, index) => (
                <motion.span
                    key={index}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                        },
                    }}
                    style={{ display: 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

// Counter animation
export const AnimatedCounter = ({
    value,
    suffix = '',
    prefix = '',
    duration = 2,
    className = '',
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            setCount(Math.floor(progress * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration, isInView]);

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            className={className}
        >
            {prefix}{count.toLocaleString()}{suffix}
        </motion.span>
    );
};

// Glow effect wrapper
export const GlowWrapper = ({
    children,
    className = '',
    glowColor = 'rgba(74, 151, 130, 0.4)',
}) => {
    return (
        <motion.div
            whileHover={{
                boxShadow: `0 0 40px ${glowColor}`,
            }}
            transition={{ duration: 0.3 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
