import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaCode } from 'react-icons/fa';
import axios from 'axios';

const Hackathons = () => {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHackathons = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/hackathons');
                setHackathons(data);
            } catch (error) {
                console.error('Error fetching hackathons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHackathons();
    }, []);

    const participations = hackathons.filter(h => h.type === 'participation');
    const winningMoments = hackathons.filter(h => h.type === 'win');

    if (loading) return <div className="py-20 text-center text-white">Loading Hackathons...</div>;

    return (
        <section id="hackathons" className="py-24 bg-gray-light-bg dark:bg-gray-bg transition-colors duration-300 overflow-hidden relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex justify-between items-center mb-16">
                    <h2 className="section-title mb-0">
                        <span className="text-secondary">#</span> hackathons
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left Column: List of Participations */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col"
                    >
                        <div className="relative mb-8">
                            <h3 className="text-6xl md:text-8xl font-bold text-gray-light-dark dark:text-gray-dark opacity-20 dark:opacity-40 absolute -top-10 -left-6 z-0 pointer-events-none select-none">
                                {participations.length}+
                            </h3>
                            <h3 className="text-3xl font-bold text-gray-light-text dark:text-white relative z-10">
                                Participated Hackathons
                            </h3>
                        </div>

                        <div className="space-y-4 border-l-2 border-gray-light-border dark:border-gray-border pl-6">
                            {participations.map((hackathon, index) => (
                                <motion.div
                                    key={hackathon._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 text-lg text-gray-light-text dark:text-gray-light hover:text-primary transition-colors cursor-default group"
                                >
                                    <FaCode className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110" size={14} />
                                    <span>{hackathon.name}</span>
                                </motion.div>
                            ))}
                            <div className="pt-4 text-primary font-mono text-sm animate-pulse">
                                ...and counting!
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Winning Moments (Visual Showcase) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        <h3 className="text-3xl font-bold text-gray-light-text dark:text-white mb-4 flex items-center gap-3">
                            <FaTrophy className="text-yellow-400" /> Winning Moments
                        </h3>

                        {winningMoments.length === 0 && (
                            <p className="text-gray-500 italic">No winning moments added yet.</p>
                        )}

                        {winningMoments.map((win, index) => (
                            <motion.div
                                key={win._id}
                                whileHover={{ scale: 1.02 }}
                                className="relative group overflow-hidden rounded-xl border border-gray-light-border dark:border-gray-border bg-gray-dark"
                            >
                                <div className="w-full h-full relative">
                                    <img
                                        src={win.image || '/images/project-placeholder.jpg'}
                                        alt={win.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    />
                                    <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
                                        <FaMedal /> {win.prize}
                                    </div>
                                </div>
                                <div className="p-4 bg-white dark:bg-gray-800 absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{win.name}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{win.description}</p>
                                </div>

                                {/* Always visible title overlay gradient if not hovering */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                                    <h4 className="text-lg font-bold text-white">{win.name}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hackathons;
