import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaTrash, FaPlus, FaEdit, FaTimes } from 'react-icons/fa';

const ManageSkills = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState({ name: '', category: 'Tools', level: 'Beginner', icon: 'FaCode', color: '#ffffff' });
    const [editingId, setEditingId] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const { data } = await api.get('/skills');
            setSkills(data);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const handleSaveSkill = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            if (editingId) {
                const { _id, createdAt, updatedAt, __v, ...updateData } = newSkill;
                await api.put(`/skills/${editingId}`, updateData, config);
            } else {
                await api.post('/skills', newSkill, config);
            }

            fetchSkills();
            resetForm();
        } catch (error) {
            console.error('Error saving skill:', error);
            alert(error.response?.data?.message || 'Failed to save skill');
        }
    };

    const handleEditClick = (skill) => {
        setNewSkill(skill);
        setEditingId(skill._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setNewSkill({ name: '', category: 'Tools', level: 'Beginner', icon: 'FaCode', color: '#ffffff' });
        setEditingId(null);
    };

    const handleDeleteSkill = async (id) => {
        if (!window.confirm('Are you sure you want to delete this skill?')) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await api.delete(`/skills/${id}`, config);
            fetchSkills();
        } catch (error) {
            console.error('Error deleting skill:', error);
            alert(error.response?.data?.message || 'Failed to delete skill');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Manage Skills</h2>

            {/* Add Skill Form */}
            <div className="bg-gray-dark border border-gray-border p-6 rounded-xl mb-8">
                <h3 className="text-lg text-white font-semibold mb-4 flex items-center gap-2">
                    {editingId ? <FaEdit className="text-primary" /> : <FaPlus className="text-primary" />}
                    {editingId ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <form onSubmit={handleSaveSkill} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Skill Name"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                        required
                    />
                    <select
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                        className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                    >
                        <option value="Tools">Tools</option>
                        <option value="Languages">Languages</option>
                        <option value="Full-Stack">Full-Stack</option>
                        <option value="Software Dev">Software Dev</option>
                        <option value="AI / Data Science">AI / Data Science</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Soft Skills">Soft Skills</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Color (Hex)"
                        value={newSkill.color}
                        onChange={(e) => setNewSkill({ ...newSkill, color: e.target.value })}
                        className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                    />

                    <div className="md:col-span-2 lg:col-span-1 flex gap-2">
                        <button type="submit" className="bg-primary text-white py-3 px-4 rounded hover:bg-primary/80 transition-colors flex-1">
                            {editingId ? 'Update' : 'Add'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-600 text-white py-3 px-4 rounded hover:bg-gray-500 transition-colors flex items-center gap-1"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Skills List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                    <div key={skill._id} className="bg-gray-dark border border-gray-border p-4 rounded-xl flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: skill.color + '20' }}>
                                <span style={{ color: skill.color }} className="font-bold text-lg">{skill.name[0]}</span>
                            </div>
                            <div>
                                <h4 className="text-white font-medium">{skill.name}</h4>
                                <p className="text-xs text-gray-light">{skill.category}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleDeleteSkill(skill._id)}
                                className="text-gray-500 hover:text-red-500 transition-colors p-2"
                            >
                                <FaTrash />
                            </button>
                            <button
                                onClick={() => handleEditClick(skill)}
                                className="text-gray-500 hover:text-blue-500 transition-colors p-2"
                            >
                                <FaEdit />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageSkills;
