import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaSave, FaHome } from 'react-icons/fa';

const ManageHome = () => {
    const [homeData, setHomeData] = useState({
        title: '',
        subtitle: '',
        description: '',
        image: '',
        status: ''
    });
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchHome();
    }, []);

    const fetchHome = async () => {
        try {
            const { data } = await api.get('/home');
            if (data) setHomeData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching home data:', error);
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            await api.post('/home', homeData, config);
            alert('Home section updated successfully!');
        } catch (error) {
            console.error('Error updating home:', error);
            alert('Failed to update');
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-6">Manage Home Section</h2>

            <div className="bg-gray-dark border border-gray-border p-8 rounded-xl">
                <h3 className="text-lg text-white font-semibold mb-6 flex items-center gap-2">
                    <FaHome className="text-primary" /> Update Hero Content
                </h3>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-gray-light text-sm mb-2">Main Title (e.g., Name)</label>
                            <input
                                type="text"
                                value={homeData.title}
                                onChange={(e) => setHomeData({ ...homeData, title: e.target.value })}
                                className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-light text-sm mb-2">Subtitle (e.g., Role)</label>
                            <input
                                type="text"
                                value={homeData.subtitle}
                                onChange={(e) => setHomeData({ ...homeData, subtitle: e.target.value })}
                                className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-light text-sm mb-2">Description</label>
                            <textarea
                                value={homeData.description}
                                onChange={(e) => setHomeData({ ...homeData, description: e.target.value })}
                                className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none h-32"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-light text-sm mb-2">Hero Image URL</label>
                                <input
                                    type="text"
                                    value={homeData.image}
                                    onChange={(e) => setHomeData({ ...homeData, image: e.target.value })}
                                    className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-light text-sm mb-2">Current Status (Badge)</label>
                                <input
                                    type="text"
                                    value={homeData.status}
                                    onChange={(e) => setHomeData({ ...homeData, status: e.target.value })}
                                    className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="bg-primary text-white py-3 px-8 rounded font-medium hover:bg-primary/80 transition-colors flex items-center gap-2">
                        <FaSave /> Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManageHome;
