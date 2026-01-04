import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContact } from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await submitContact(formData);
            setStatus({
                type: 'success',
                message: 'Message sent successfully!'
            });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Something went wrong. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contacts" className="py-24 bg-gray-light-bg dark:bg-gray-bg transition-colors duration-300">
            <div className="container">
                <h2 className="section-title">contacts</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side - Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-light-text dark:text-gray-light leading-relaxed mb-8">
                            I'm interested in freelance opportunities. However, if you have other requests or questions,
                            don't hesitate to contact me
                        </p>

                        {/* Contact Info Box */}
                        <div className="border border-gray-light-border dark:border-gray-border p-6">
                            <h3 className="text-gray-light-text dark:text-white font-medium mb-4">Message me here</h3>
                            <div className="space-y-3 text-gray-light-text dark:text-gray-light">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:gurumurthys001@gmail.com" className="hover:text-primary dark:hover:text-white transition">
                                        gurumurthys001@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Name"
                                    className="w-full px-4 py-3 bg-transparent border border-gray-light-border dark:border-gray-border 
                    text-gray-light-text dark:text-white placeholder-gray-light-text/50 dark:placeholder-gray-light focus:outline-none focus:border-primary 
                    transition-colors"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Email"
                                    className="w-full px-4 py-3 bg-transparent border border-gray-light-border dark:border-gray-border 
                    text-gray-light-text dark:text-white placeholder-gray-light-text/50 dark:placeholder-gray-light focus:outline-none focus:border-primary 
                    transition-colors"
                                />
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Message"
                                    className="w-full px-4 py-3 bg-transparent border border-gray-light-border dark:border-gray-border 
                    text-gray-light-text dark:text-white placeholder-gray-light-text/50 dark:placeholder-gray-light focus:outline-none focus:border-primary 
                    transition-colors resize-none"
                                />
                            </div>

                            {status.message && (
                                <div className={`p-4 border ${status.type === 'success'
                                    ? 'border-primary text-primary'
                                    : 'border-red-500 text-red-500'
                                    }`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn-primary disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
