import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loading from './components/Loading';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

import Navbar from './components/Navbar';
import LampSwitch from './components/LampSwitch';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Hackathons from './components/Hackathons';
import { getSections } from './services/api';

// Map database names to Components
const SECTION_COMPONENTS = {
    'home': Hero,
    'projects': Projects,
    'skills': Skills,
    'experience': Experience,
    'certifications': Certifications,
    'hackathons': Hackathons,
    'about': About,
    'contact': Contact
};

function App() {
    const [loading, setLoading] = useState(true);
    const [sectionsConfig, setSectionsConfig] = useState([]);
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await getSections();
                // Backend returns sorted by 'order'
                setSectionsConfig(data);
            } catch (error) {
                console.error("Failed to fetch section settings");
            } finally {
                // Ensure loading is set to false even if fetch fails to avoid blank screen
                // Note: The original Loading component handles its own timeout, 
                // but we can signal it's ready if we wanted to. 
                // Keeping original loading logic for now, but fetching happened parallel.
            }
        };
        fetchSettings();
    }, []);

    return (
        <AuthProvider>
            <ThemeProvider>
                {loading ? (
                    <Loading setLoading={setLoading} />
                ) : (
                    <div className="App min-h-screen relative transition-colors duration-300">
                        {!isAdminRoute && (
                            <>
                                <Navbar />
                                <LampSwitch />
                                {/* Global Left Sidebar - Fixed Layout */}
                                <div className="hidden lg:flex flex-col items-center fixed left-0 top-0 bottom-0 w-24 z-40">
                                    <div className="w-px h-48 bg-gray-light mt-24"></div>
                                    <div className="flex flex-col gap-6 my-6">
                                        <a href="https://github.com/Gurumurthys1" target="_blank" rel="noopener noreferrer" className="text-gray-light hover:text-white transition"><FaGithub size={24} /></a>
                                        <a href="https://www.linkedin.com/in/gurumurthys/" target="_blank" rel="noopener noreferrer" className="text-gray-light hover:text-white transition"><FaLinkedin size={24} /></a>
                                        <a href="mailto:gurumurthys001@gmail.com" className="text-gray-light hover:text-white transition"><FaEnvelope size={24} /></a>
                                    </div>
                                </div>
                            </>
                        )}

                        <Routes>
                            {/* Public Portfolio Routes */}
                            <Route path="/" element={
                                <main>
                                    {sectionsConfig.length > 0 ? (
                                        sectionsConfig
                                            .filter(section => section.isVisible)
                                            .map(section => {
                                                const Component = SECTION_COMPONENTS[section.name];
                                                return Component ? <Component key={section._id} /> : null;
                                            })
                                    ) : (
                                        // Fallback if fetch failed or runs first time slowly
                                        <>
                                            <Hero />
                                            <Projects />
                                            <Skills />
                                            <Experience />
                                            <Certifications />
                                            <Hackathons />
                                            <About />
                                            <Contact />
                                        </>
                                    )}
                                </main>
                            } />

                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<Login />} />

                            <Route path="/admin" element={<ProtectedRoute />}>
                                <Route path="dashboard/*" element={<Dashboard />} />
                            </Route>
                        </Routes>

                        {!isAdminRoute && <Footer />}
                    </div>
                )}
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
