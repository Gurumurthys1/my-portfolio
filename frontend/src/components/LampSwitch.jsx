import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const LampSwitch = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };

    return (
        <div className="fixed top-0 right-10 lg:right-20 z-50">
            {/* Lamp Cord - Clickable */}
            <motion.div
                className="flex flex-col items-center cursor-pointer origin-top"
                initial={false}
                animate={isDark ? "off" : "on"}
                whileTap="pulled"
                onClick={toggleTheme}
                variants={{
                    off: { y: -20 },
                    on: { y: 0 },
                    pulled: { y: 20, transition: spring }
                }}
            >
                {/* Wire */}
                <div className="w-0.5 h-24 bg-primary dark:bg-gray-400"></div>

                {/* Lamp Body */}
                <div className="relative group">
                    {/* Bulb Socket */}
                    <div className="w-4 h-6 bg-gray-600 rounded-t-md mx-auto"></div>

                    {/* Bulb */}
                    <div className={`w-8 h-8 rounded-full shadow-lg ${isDark ? 'bg-gray-500' : 'bg-yellow-300 shadow-[0_0_40px_10px_rgba(253,224,71,0.5)]'} transition-all duration-300`}></div>

                    {/* Curved Text Instructions */}
                    <div className="absolute -left-20 -bottom-16 w-48 h-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg viewBox="0 0 200 100" className="w-full h-full">
                            <path id="curve" d="M20,20 Q100,60 180,20" fill="transparent" />
                            <text width="200">
                                <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle" className="text-sm fill-current text-primary dark:text-gray-light font-mono tracking-wider">
                                    Click to Change Theme
                                </textPath>
                            </text>
                        </svg>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LampSwitch;
