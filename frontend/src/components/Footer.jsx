import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-bg dark:bg-gray-bg border-t border-gray-light-border dark:border-gray-border py-8 text-center transition-colors duration-300">
            {/* Note: Footer often stays dark in many themes, but let's make it consistent or darker */}
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-4 h-4 border border-primary"></div>
                            <span className="text-white font-bold text-lg tracking-wider">Guru</span>
                            <span className="text-gray-light text-sm ml-2">gurumurthys001@gmail.com</span>
                        </div>
                        <p className="text-gray-light text-sm">
                            Web designer and front-end developer based in India
                        </p>
                    </div>

                    {/* Right - Social Links */}
                    <div>
                        <h3 className="text-white mb-4">Media</h3>
                        <div className="flex gap-4">
                            <a href="https://github.com/Gurumurthys1" target="_blank" rel="noopener noreferrer"
                                className="text-gray-light hover:text-white transition">
                                <FaGithub size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/gurumurthys/" target="_blank" rel="noopener noreferrer"
                                className="text-gray-light hover:text-white transition">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="mailto:gurumurthys001@gmail.com"
                                className="text-gray-light hover:text-white transition">
                                <FaEnvelope size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center text-gray-light mt-8 text-sm flex justify-center items-center gap-4">
                    <span>© Copyright {currentYear}. Made by Gurumurthy</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <Link to="/admin/login" className="hover:text-white transition-colors">Admin</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
