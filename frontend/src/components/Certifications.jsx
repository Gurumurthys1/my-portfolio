import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Certifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/certifications');
            setCertifications(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching certifications:', error);
            setLoading(false);
        }
    };

    const [visibleCount, setVisibleCount] = useState(6);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    return (
        <section id="certifications" className="py-24 bg-gray-light-bg dark:bg-gray-bg transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="section-title mb-0">
                        <span className="text-secondary">#</span> certifications
                    </h2>
                </div>

                {loading ? (
                    <div className="text-center text-gray-500">Loading certifications...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certifications.slice(0, visibleCount).map((cert, index) => (
                                <motion.div
                                    key={cert._id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="border border-gray-light-border dark:border-gray-border p-6 bg-white dark:bg-gray-bg hover:border-primary transition-all duration-300 group flex flex-col h-full"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-gray-light-text dark:text-white text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                                            {cert.title}
                                        </h3>
                                        <span className="text-xs font-mono text-gray-light-text dark:text-gray-light border border-gray-light-border dark:border-gray-border px-2 py-1 rounded whitespace-nowrap ml-2">
                                            {cert.date}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <span className="text-secondary font-medium text-sm">{cert.issuer}</span>
                                    </div>

                                    {cert.credentialId && (
                                        <div className="mb-4 text-xs text-gray-light-text dark:text-gray-light font-mono break-all">
                                            ID: {cert.credentialId}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {cert.skills && cert.skills.map((skill, i) => (
                                            <span key={i} className="text-xs text-gray-light-text dark:text-gray-light bg-gray-light-dark dark:bg-gray-dark px-2 py-1 rounded">
                                                # {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-gray-light-border dark:border-gray-border">
                                        <a
                                            href={cert.imageUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-gray-light-text dark:text-white hover:text-primary transition-colors w-full justify-center py-2 border border-gray-light-border dark:border-gray-border hover:border-primary rounded"
                                        >
                                            <FaExternalLinkAlt size={12} />
                                            View Credential
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {visibleCount < certifications.length && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={handleLoadMore}
                                    className="px-6 py-2 border border-primary text-white hover:bg-primary/10 transition-colors duration-300"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}

                {!loading && certifications.length === 0 && (
                    <div className="text-center text-gray-500">No certifications found.</div>
                )}
            </div>
        </section>
    );
};

export default Certifications;
