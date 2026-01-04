import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loading = ({ setLoading }) => {
    const [textIndex, setTextIndex] = useState(0);
    const messages = ['Initializing Systems', 'Calibrating Sensors', 'Engaging Thrusters', 'Warp Drive Active', 'Welcome Aboard'];

    useEffect(() => {
        const timer = setInterval(() => {
            setTextIndex((prev) => {
                if (prev < messages.length - 1) {
                    return prev + 1;
                }
                clearInterval(timer);
                setTimeout(() => setLoading(false), 800);
                return prev;
            });
        }, 800);

        return () => clearInterval(timer);
    }, [setLoading]);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
                exit={{ opacity: 0, transition: { duration: 1 } }}
            >
                {/* Starfield Background */}
                <div className="absolute inset-0">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                scale: Math.random() * 0.5 + 0.5,
                                opacity: Math.random() * 0.5 + 0.2,
                            }}
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                                scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: Math.random() * 2 + 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                width: Math.random() * 3 + 'px',
                                height: Math.random() * 3 + 'px',
                            }}
                        />
                    ))}
                </div>

                {/* Cosmic Loader Container */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                    {/* Ring 1 */}
                    <motion.div
                        className="absolute w-full h-full rounded-full border-2 border-primary/30 border-t-primary"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Ring 2 */}
                    <motion.div
                        className="absolute w-48 h-48 rounded-full border-2 border-secondary/30 border-b-secondary"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Ring 3 */}
                    <motion.div
                        className="absolute w-32 h-32 rounded-full border-2 border-purple-500/30 border-l-purple-500"
                        animate={{ rotate: 180 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Central Core */}
                    <motion.div
                        className="relative w-16 h-16 bg-gradient-to-br from-primary via-secondary to-purple-600 rounded-full blur-md"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute inset-0 bg-white/50 rounded-full blur-sm" />
                    </motion.div>
                </div>

                {/* Cinematic Text */}
                <div className="mt-12 h-8 relative w-full text-center">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={messages[textIndex]}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-lg font-mono tracking-[0.2em] text-cyan-100 uppercase glowing-text"
                            style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.7)' }}
                        >
                            {messages[textIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Bar Line */}
                <motion.div
                    className="mt-4 w-64 h-[1px] bg-gray-800 relative overflow-hidden"
                >
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-1/2"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>

            </motion.div>
        </AnimatePresence>
    );
};

export default Loading;
