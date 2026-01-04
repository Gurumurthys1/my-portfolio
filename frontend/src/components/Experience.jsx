import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const { data } = await api.get('/experience');
            setExperiences(data);
        } catch (error) {
            console.error('Error fetching experience:', error);
        }
    };

    return (
        <section id="experience" className="py-24 bg-gray-light-bg dark:bg-gray-bg relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-6">
                <h2 className="section-title mb-16">
                    <span className="text-secondary">#</span> experience
                </h2>

                <div className="relative border-l border-gray-light-border dark:border-gray-border ml-3 md:ml-6 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp._id || index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot */}
                            <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-white dark:ring-gray-bg"></span>

                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-2">
                                <h3 className="text-gray-light-text dark:text-white text-xl font-semibold">{exp.role}</h3>
                                <span className="text-gray-light-text dark:text-gray-light font-mono text-sm">{exp.period}</span>
                            </div>

                            <div className="text-primary font-medium mb-4">{exp.company}</div>

                            <p className="text-gray-light-text dark:text-gray-light mb-4 max-w-2xl leading-relaxed">
                                {exp.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 border border-gray-light-border dark:border-gray-border rounded-full text-xs text-gray-light-text dark:text-gray-light hover:border-primary hover:text-white dark:hover:text-white hover:bg-primary transition-colors cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
