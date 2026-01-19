import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Premium MAANG-level page transition variants
const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    in: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    out: {
        opacity: 0,
        y: -20,
        scale: 1.02,
    },
};

const pageTransition = {
    type: 'spring',
    stiffness: 260,
    damping: 25,
    mass: 0.8,
};

const PageTransition = ({ children }) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="page-transition-wrapper"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;

// Reusable animation variants for components
export const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const fadeInLeft = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const fadeInRight = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const staggerItem = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
};

// Hover effects
export const hoverScale = {
    scale: 1.02,
    transition: { type: 'spring', stiffness: 400, damping: 17 },
};

export const hoverLift = {
    y: -8,
    transition: { type: 'spring', stiffness: 400, damping: 17 },
};

export const tapScale = {
    scale: 0.98,
};
