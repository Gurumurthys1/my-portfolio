import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaBriefcase, FaCode, FaChartBar, FaSignOutAlt, FaHome, FaEnvelope, FaTrophy } from 'react-icons/fa';
import ManageSkills from './ManageSkills';
import ManageExperience from './ManageExperience';
import ManageProjects from './ManageProjects';
import ManageAbout from './ManageAbout';
import ManageMessages from './ManageMessages';
import ManageCertifications from './ManageCertifications';
import ManageHackathons from './ManageHackathons';
import ManageHome from './ManageHome';
import SectionManager from '../../components/admin/SectionManager';
import { getAllSkills, getAllProjects } from '../../services/api';
import api from '../../services/api';

const ManageOverview = () => {
    const [stats, setStats] = useState({
        skills: 0,
        projects: 0,
        experience: 0,
        messages: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch basic data using existing services
                const skillsRes = await getAllSkills();
                const projectsRes = await getAllProjects();

                // Fetch others using axios directly since services might not exporting getAll for all
                // Assuming endpoints exist based on controllers
                const expRes = await api.get('/experience');
                const msgRes = await api.get('/contact');

                setStats({
                    skills: skillsRes.data.length,
                    projects: projectsRes.data.length,
                    experience: expRes.data.length,
                    messages: msgRes.data.length
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const StatCard = ({ title, count, icon, color }) => (
        <div className="bg-gray-dark border border-gray-border p-6 rounded-xl flex items-center justify-between group hover:border-primary transition-colors duration-300">
            <div>
                <p className="text-gray-light text-sm uppercase tracking-wider mb-2">{title}</p>
                <h3 className="text-4xl font-bold text-white group-hover:text-primary transition-colors">{count}</h3>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${color}`}>
                {icon}
            </div>
        </div>
    );

    if (loading) return <div className="text-white p-8">Loading stats...</div>;

    return (
        <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome, Admin</h2>
            <p className="text-gray-light mb-8">Here's what's happening in your portfolio.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Skills"
                    count={stats.skills}
                    icon={<FaChartBar />}
                    color="bg-purple-500/20 text-purple-400"
                />
                <StatCard
                    title="Total Projects"
                    count={stats.projects}
                    icon={<FaCode />}
                    color="bg-blue-500/20 text-blue-400"
                />
                <StatCard
                    title="Experience"
                    count={stats.experience}
                    icon={<FaBriefcase />}
                    color="bg-green-500/20 text-green-400"
                />
                <StatCard
                    title="Messages"
                    count={stats.messages}
                    icon={<FaEnvelope />}
                    color="bg-orange-500/20 text-orange-400"
                />
            </div>
        </div>
    );
};

const Dashboard = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/admin/dashboard', icon: <FaHome />, label: 'Overview' },
        { path: '/admin/dashboard/home', icon: <FaHome />, label: 'Home / Hero' }, // Added
        { path: '/admin/dashboard/sections', icon: <FaCode />, label: 'Sections' },
        { path: '/admin/dashboard/skills', icon: <FaChartBar />, label: 'Skills' },
        { path: '/admin/dashboard/experience', icon: <FaBriefcase />, label: 'Experience' },
        { path: '/admin/dashboard/projects', icon: <FaCode />, label: 'Projects' },
        { path: '/admin/dashboard/certifications', icon: <FaBriefcase />, label: 'Certifications' },
        { path: '/admin/dashboard/hackathons', icon: <FaTrophy />, label: 'Hackathons' },
        { path: '/admin/dashboard/about', icon: <FaUser />, label: 'About Me' },
        { path: '/admin/dashboard/messages', icon: <FaEnvelope />, label: 'Messages' },
    ];

    return (
        <div className="min-h-screen bg-gray-bg flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-dark border-r border-gray-border flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-gray-border">
                    <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                    <p className="text-gray-light text-sm mt-1">{user?.email}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                ? 'bg-primary text-white'
                                : 'text-gray-light hover:bg-gray-bg hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-border">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-gray-bg hover:text-red-300 rounded-lg transition-colors"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                    <Link to="/" className="text-center block mt-4 text-xs text-gray-500 hover:text-gray-400">
                        View Live Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <Routes>
                    <Route path="/" element={<ManageOverview />} />
                    <Route path="home" element={<ManageHome />} />
                    <Route path="sections" element={<SectionManager token={user?.token} />} />
                    <Route path="skills" element={<ManageSkills />} />
                    <Route path="experience" element={<ManageExperience />} />
                    <Route path="projects" element={<ManageProjects />} />
                    <Route path="certifications" element={<ManageCertifications />} />
                    <Route path="about" element={<ManageAbout />} />
                    <Route path="messages" element={<ManageMessages />} />
                    <Route path="hackathons" element={<ManageHackathons />} />
                </Routes>
            </main>
        </div>
    );
};

export default Dashboard;
