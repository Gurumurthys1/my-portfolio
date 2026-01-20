import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Use centralized API
import { useAuth } from '../../context/AuthContext';
import { FaSave, FaUserEdit } from 'react-icons/fa';

const ManageAbout = () => {
    const [about, setAbout] = useState({
        bio: '',
        role: '',
        email: '',
        github: '',
        linkedin: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            const { data } = await api.get('/about'); // Uses base URL from api.js
            if (data) {
                // Ensure we handle case where data might be wrapped or just the object
                setAbout(data[0] || data); // Assuming endpoint returns array or object
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching about:', error);
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            // Check if we are creating or updating. API might expect POST for both or PUT. 
            // Previous code used POST. Sticking to it.
            await api.post('/about', about, config);
            alert('About section updated successfully!');
        } catch (error) {
            console.error('Error updating about:', error);
            alert('Failed to update');
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-6">Manage About Me</h2>

            <div className="bg-gray-dark border border-gray-border p-8 rounded-xl">
                <h3 className="text-lg text-white font-semibold mb-6 flex items-center gap-2">
                    <FaUserEdit className="text-primary" /> Update Information
                </h3>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-light text-sm mb-2">Role / Title</label>
                            <input
                                type="text"
                                value={about.role}
                                onChange={(e) => setAbout({ ...about, role: e.target.value })}
                                className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-light text-sm mb-2">Email</label>
                            <input
                                type="email"
                                value={about.email}
                                onChange={(e) => setAbout({ ...about, email: e.target.value })}
                                className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-light text-sm mb-2">GitHub URL</label>
                            <input
                                type="text"
                                value={about.github}
                                onChange={(e) => setAbout({ ...about, github: e.target.value })}
                                className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-light text-sm mb-2">LinkedIn URL</label>
                            <input
                                type="text"
                                value={about.linkedin}
                                onChange={(e) => setAbout({ ...about, linkedin: e.target.value })}
                                className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-light text-sm mb-2">Profile Image URL</label>
                            <input
                                type="text"
                                value={about.image}
                                onChange={(e) => setAbout({ ...about, image: e.target.value })}
                                className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-light text-sm mb-2">Bio / Description</label>
                        <textarea
                            value={about.bio}
                            onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                            className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none h-40"
                        />
                    </div>

                    <button type="submit" className="bg-primary text-white py-3 px-8 rounded font-medium hover:bg-primary/80 transition-colors flex items-center gap-2">
                        <FaSave /> Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManageAbout;
