import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    SiPython, SiNumpy, SiPandas, SiKeras, SiPytorch,
    SiJavascript, SiReact, SiHtml5, SiCss3, SiBootstrap,
    SiNodedotjs, SiExpress, SiMongodb, SiMysql,
    SiGit, SiGithub, SiFlutter, SiDart
} from 'react-icons/si';
import { FaBrain, FaCode, FaDatabase, FaMobileAlt, FaHandshake, FaGlobe, FaServer, FaCogs, FaShareAlt, FaEye, FaJava } from 'react-icons/fa';

const Skills = () => {
    // Icon Mapping
    const iconMap = {
        "FaDatabase": <FaDatabase />,
        "FaBrain": <FaBrain />,
        "SiKeras": <SiKeras />,
        "FaEye": <FaEye />,
        "SiNumpy": <SiNumpy />,
        "SiPandas": <SiPandas />,
        "SiPython": <SiPython />,
        "FaCode": <FaCode />,
        "FaJava": <FaJava />,
        "FaCogs": <FaCogs />,
        "FaHandshake": <FaHandshake />,
        "FaGlobe": <FaGlobe />,
        "FaServer": <FaServer />,
        "SiHtml5": <SiHtml5 />,
        "SiCss3": <SiCss3 />,
        "SiJavascript": <SiJavascript />,
        "SiReact": <SiReact />,
        "SiBootstrap": <SiBootstrap />,
        "SiNodedotjs": <SiNodedotjs />,
        "SiExpress": <SiExpress />,
        "SiMysql": <SiMysql />,
        "SiMongodb": <SiMongodb />,
        "FaShareAlt": <FaShareAlt />,
        "SiGit": <SiGit />,
        "SiGithub": <SiGithub />,
        "SiFlutter": <SiFlutter />
    };

    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/skills');
            setSkills(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching skills:', error);
            setLoading(false);
        }
    };

    // Define categories in specific order
    const allCategories = [
        "all",
        "Languages",
        "AI / Data Science",
        "Full-Stack",
        "Software Dev",
        "Soft Skills",
        "Tools",
        "Mobile"
    ];
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredSkills = activeCategory === 'all'
        ? skills
        : skills.filter(s => s.category === activeCategory);

    return (
        <section id="skills" className="py-24 bg-gray-light-bg dark:bg-gray-bg relative overflow-hidden transition-colors duration-300">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 200 200" className="text-primary animate-spin-slow">
                    <path fill="currentColor" d="M100 0 L120 80 L200 100 L120 120 L100 200 L80 120 L0 100 L80 80 Z" />
                </svg>
            </div>

            <div className="container relative z-10">
                <h2 className="section-title">
                    <span className="text-secondary">/</span> skills
                </h2>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {allCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 border rounded-full text-sm font-medium transition-all duration-300 capitalize
                            ${activeCategory === cat
                                    ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(199,120,221,0.5)]'
                                    : 'border-gray-light-border dark:border-gray-border text-gray-light-text dark:text-gray-light hover:border-primary hover:text-primary dark:hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
                >
                    {filteredSkills.map((skill) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            key={skill.name}
                            className="bg-gray-light-bg dark:bg-gray-dark border border-gray-light-border dark:border-gray-border p-6 rounded-xl hover:border-primary hover:-translate-y-2 transition-all duration-300 group cursor-default relative overflow-hidden"
                        >
                            {/* Glow Effect */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                style={{ backgroundColor: skill.color }}
                            ></div>

                            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                <span
                                    className="text-4xl transition-all duration-300 group-hover:scale-110 text-gray-light-text dark:text-gray-light"
                                >
                                    <span className="group-hover:text-[var(--skill-color)]" style={{ '--skill-color': skill.color }}>
                                        {iconMap[skill.icon] || <FaCode />}
                                    </span>
                                </span>
                                <h3 className="text-gray-light-text dark:text-white font-medium text-lg border-b border-transparent group-hover:border-[var(--skill-color)] transition-colors pb-1" style={{ '--skill-color': skill.color }}>
                                    {skill.name}
                                </h3>
                                <p className="text-xs text-gray-light-text dark:text-gray-light uppercase tracking-wider opacity-60">
                                    {skill.category}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
