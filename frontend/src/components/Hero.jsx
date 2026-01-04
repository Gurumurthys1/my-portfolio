import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaDribbble, FaFigma } from 'react-icons/fa';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center pt-20 pb-16 bg-gray-light-bg dark:bg-gray-bg relative overflow-hidden transition-colors duration-300">
            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>

            <div className="container ml-auto mr-auto lg:pl-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="z-20 relative"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-light-text dark:text-white font-semibold mb-8 leading-tight">
                            Gurumurthy is a Data Scientist | <span className="text-primary">Software Developer (MERN)</span> | ML & Computer Vision
                            <span className="animate-pulse text-gray-light-text dark:text-white">|</span>
                        </h1>

                        <p className="text-gray-light-text dark:text-gray-light mb-8 leading-relaxed max-w-lg text-lg">
                            Building state-of-the-art AI solutions and responsive web applications where technologies meet creativity.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a href="#contacts" className="btn-primary">
                                Contact Me !!
                            </a>
                            <a href="#works" className="px-6 py-2 border border-gray-light-border dark:border-gray-border text-gray-light-text dark:text-gray-light hover:border-primary hover:text-primary dark:hover:text-white dark:hover:border-white transition font-medium">
                                View Projects
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Content - Character & Status */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-10"
                    >
                        {/* Character Container */}
                        <div className="relative mx-auto w-full max-w-[460px]">

                            {/* Purple Logo/Shape Background */}
                            <div className="absolute top-20 -left-10 z-0 pointer-events-none">
                                <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
                                    <path d="M20 20 H80 V80 H20 Z" stroke="#C778DD" strokeWidth="2" fill="none" />
                                    <path d="M40 40 H60 V60 H40 Z" stroke="#C778DD" strokeWidth="2" fill="none" />
                                    {/* Abstract interlocking shape */}
                                    <rect x="0" y="30" width="30" height="30" stroke="#C778DD" strokeWidth="2" fill="none" />
                                </svg>
                            </div>

                            {/* Dots Pattern - Right Side */}
                            <div className="absolute bottom-20 -right-4 z-20 pointer-events-none">
                                <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                                    {Array.from({ length: 25 }).map((_, i) => {
                                        const x = (i % 5) * 15 + 2;
                                        const y = Math.floor(i / 5) * 15 + 2;
                                        return <circle key={i} cx={x} cy={y} r="2" fill="#ABB2BF" />
                                    })}
                                </svg>
                            </div>

                            {/* Main Image */}
                            <div className="relative z-10">
                                <img
                                    src="/images/Image.png"
                                    alt="Gurumurthy"
                                    className="w-full h-auto object-contain relative z-10 grayscale hover:grayscale-0 transition duration-500"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                                {/* Fallback */}
                                <div className="w-full h-[400px] bg-gray-dark border border-gray-border flex items-center justify-center text-8xl" style={{ display: 'none' }}>
                                    👨‍💻
                                </div>
                            </div>

                            {/* Overlapping Status Badge */}
                            <div className="absolute -bottom-4 right-0 w-[90%] z-20 bg-gray-light-bg dark:bg-gray-bg border border-gray-light-border dark:border-gray-border p-2 flex items-center gap-4 shadow-xl">
                                <div className="w-4 h-4 bg-primary mx-2"></div>
                                <div className="text-gray-light-text dark:text-gray-light text-sm font-medium">
                                    Currently working on <span className="text-gray-light-text dark:text-white font-bold">Portfolio</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

