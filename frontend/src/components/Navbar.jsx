import React, { useState, useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        setIsMenuOpen(false); // Close mobile menu if open
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const navLinks = [
        { id: 'home', label: 'home' },
        { id: 'works', label: 'works' },
        { id: 'skills', label: 'skills' },
        { id: 'experience', label: 'experience' },
        { id: 'certifications', label: 'certifications' },
        { id: 'hackathons', label: 'hackathons' },
        { id: 'about', label: 'about-me' },
        { id: 'contacts', label: 'contacts' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-gray-light-bg/95 dark:bg-gray-bg/95 backdrop-blur-md py-4 shadow-lg border-b border-gray-light-border dark:border-gray-border'
                : 'bg-transparent py-6 border-b border-transparent'
                }`}
        >
            <div className="container mx-auto flex justify-between items-center px-6 md:px-0">
                {/* Logo */}
                <a
                    href="#home"
                    onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                    className="flex items-center gap-2 group"
                >
                    <img src="/images/gs-logo.png" alt="GS Logo" className="w-8 h-8 object-contain group-hover:opacity-80 transition-opacity" />
                    <span className="text-primary font-bold text-2xl tracking-wider drop-shadow-md">Guru</span>
                </a>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-8 text-gray-light-text dark:text-gray-light font-medium">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                onClick={() => scrollToSection(link.id)}
                                className="hover:text-primary dark:hover:text-white transition cursor-pointer flex items-center group"
                            >
                                <span className="text-primary mr-1 group-hover:opacity-80 transition-opacity">#</span>
                                <span className="relative">
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                </span>
                            </a>
                        </li>
                    ))}

                </ul>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-gray-light-text dark:text-white hover:text-primary transition p-2"
                >
                    {isMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-gray-light-bg dark:bg-gray-bg border-b border-gray-light-border dark:border-gray-border overflow-hidden"
                    >
                        <ul className="container mx-auto px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-gray-light-text dark:text-gray-light hover:text-primary dark:hover:text-white text-xl font-medium block cursor-pointer"
                                    >
                                        <span className="text-primary mr-2">#</span>{link.label}
                                    </a>
                                </li>
                            ))}

                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
