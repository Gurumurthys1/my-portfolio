import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-24 bg-gray-light-bg dark:bg-gray-bg transition-colors duration-300">
            <div className="container">
                <h2 className="section-title">about-me</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-4 text-gray-light-text dark:text-gray-light max-w-lg">
                            <p className="text-gray-light-text dark:text-gray-light leading-relaxed">
                                Hello, i'm Gurumurthy!
                            </p>
                            <p>
                                Aspiring Machine Learning Engineer and third-year B.Tech student in Artificial Intelligence
                                and Data Science with a strong foundation in machine learning, data analysis, and
                                full-stack development.
                            </p>

                            <p>
                                Experienced in building and deploying end-to-end ML-driven applications using Python,
                                TensorFlow, and Scikit-learn. Proficient in integrating ML models into real-world web
                                systems with the MERN stack.
                            </p>

                            <button className="btn-primary mt-6">
                                Read more -&gt;
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Content - Image with Decorations */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative flex justify-center"
                    >
                        {/* Image Container */}
                        <div className="relative z-10">
                            <img
                                src="/images/Image-2.png"
                                alt="About Elias"
                                className="max-h-[400px] object-contain relative z-10"
                            />

                            {/* Dots decoration - Top Left */}
                            <div className="absolute -top-8 -left-12 z-0">
                                <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                                    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <circle cx="2" cy="2" r="2" fill="#ABB2BF" />
                                    </pattern>
                                    <rect width="84" height="84" fill="url(#dots)" />
                                </svg>
                            </div>

                            {/* Dots decoration - Bottom Right */}
                            <div className="absolute -bottom-8 -right-4 z-20">
                                <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                                    <rect width="84" height="84" fill="url(#dots)" />
                                </svg>
                            </div>

                            {/* Purple Underline */}
                            <div className="absolute -bottom-0 left-0 w-full h-px bg-primary z-20 mx-auto"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
