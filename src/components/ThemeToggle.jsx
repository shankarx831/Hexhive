import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        if (localStorage.getItem('theme')) {
            return localStorage.getItem('theme');
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    // Effect to apply the class to HTML
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Optimized toggle using View Transitions API (native, performant)
    const toggleTheme = async (e) => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';

        // Use View Transitions API if supported - this is GPU-accelerated
        if (document.startViewTransition) {
            const x = e.clientX;
            const y = e.clientY;
            const endRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            );

            const transition = document.startViewTransition(() => {
                setTheme(newTheme);
            });

            await transition.ready;

            // Native CSS animation - very performant
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 400,
                    easing: 'ease-out',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        } else {
            setTheme(newTheme);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title="Toggle Theme"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {/* Simple icon swap with CSS transition */}
            <div className="theme-toggle-icons">
                {/* Sun */}
                <svg
                    className={`theme-icon sun-icon ${theme === 'dark' ? 'active' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>

                {/* Moon */}
                <svg
                    className={`theme-icon moon-icon ${theme === 'light' ? 'active' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
            </div>
        </button>
    );
};

export default ThemeToggle;
