import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/projects');
            setProjects(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setLoading(false);
        }
    };



    return (
        <section id="works" className="py-24 bg-gray-light-bg dark:bg-gray-bg transition-colors duration-300">
            <div className="container">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="section-title mb-0">projects</h2>
                    <a href="#" className="text-gray-light-text dark:text-white hover:text-primary transition">
                        View all ~~&gt;
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="border border-gray-light-border dark:border-gray-border group hover:border-primary transition-colors duration-300 bg-white dark:bg-gray-bg"
                        >
                            {/* Project Image */}
                            <div className="border-b border-gray-light-border dark:border-gray-border overflow-hidden h-[200px]">
                                {/* Placeholder for project image since we don't have matching files yet */}
                                <div className="w-full h-full bg-gray-light-dark dark:bg-gray-dark flex items-center justify-center text-gray-light-text dark:text-gray-light">
                                    {project.image ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> : <span>No Image</span>}
                                </div>
                            </div>

                            {/* Tech Stack - Now below image as a strip */}
                            <div className="px-4 py-2 border-b border-gray-light-border dark:border-gray-border">
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="text-gray-light-text dark:text-gray-light text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-4">
                                <h3 className="text-gray-light-text dark:text-white text-2xl font-medium mb-4">{project.title}</h3>
                                <p className="text-gray-light-text dark:text-gray-light mb-6 text-sm leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex gap-4">
                                    <div className="flex gap-4">
                                        <a
                                            href={project.liveUrl || '#'}
                                            className="px-4 py-2 border border-primary text-gray-light-text dark:text-white text-sm hover:bg-primary/10 transition flex items-center gap-2"
                                        >
                                            Live <span className="text-gray-light-text dark:text-gray-light">&lt;~&gt;</span>
                                        </a>
                                        <a
                                            href={project.githubUrl || '#'}
                                            className="px-4 py-2 border border-gray-light-border dark:border-gray-border text-gray-light-text dark:text-gray-light text-sm hover:border-primary hover:text-primary dark:hover:text-white transition flex items-center gap-2"
                                        >
                                            Cached <span className="text-gray-light-text dark:text-white">&gt;=</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
