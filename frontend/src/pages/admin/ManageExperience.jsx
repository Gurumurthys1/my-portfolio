import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaTrash, FaPlus, FaBriefcase, FaEdit, FaTimes } from 'react-icons/fa';

const ManageExperience = () => {
    const [experiences, setExperiences] = useState([]);
    const [newExp, setNewExp] = useState({
        role: '',
        company: '',
        period: '',
        description: '',
        technologies: ''
    });
    const [editingId, setEditingId] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const { data } = await api.get('/experience');
            setExperiences(data);
        } catch (error) {
            console.error('Error fetching experience:', error);
        }
    };

    const handleSaveExp = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            const payload = {
                ...newExp,
                technologies: typeof newExp.technologies === 'string'
                    ? newExp.technologies.split(',').map(t => t.trim())
                    : newExp.technologies
            };

            if (editingId) {
                const { _id, createdAt, updatedAt, __v, ...updateData } = payload;
                await api.put(`/experience/${editingId}`, updateData, config);
            } else {
                await api.post('/experience', payload, config);
            }

            fetchExperiences();
            resetForm();
        } catch (error) {
            console.error('Error saving experience:', error);
            alert(error.response?.data?.message || 'Failed to save experience');
        }
    };

    const handleEditClick = (exp) => {
        setNewExp({
            ...exp,
            technologies: exp.technologies.join(', ')
        });
        setEditingId(exp._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setNewExp({ role: '', company: '', period: '', description: '', technologies: '' });
        setEditingId(null);
    };

    const handleDeleteExp = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await api.delete(`/experience/${id}`, config);
            fetchExperiences();
        } catch (error) {
            console.error('Error deleting experience:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Manage Experience</h2>

            <div className="bg-gray-dark border border-gray-border p-6 rounded-xl mb-8">
                <h3 className="text-lg text-white font-semibold mb-4 flex items-center gap-2">
                    {editingId ? <FaEdit className="text-primary" /> : <FaPlus className="text-primary" />}
                    {editingId ? 'Edit Experience' : 'Add New Experience'}
                </h3>
                <form onSubmit={handleSaveExp} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Role (e.g. Software Engineer)"
                            value={newExp.role}
                            onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                            className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Company"
                            value={newExp.company}
                            onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                            className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Period (e.g. 2023 - Present)"
                            value={newExp.period}
                            onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                            className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Technologies (comma separated)"
                            value={newExp.technologies}
                            onChange={(e) => setNewExp({ ...newExp, technologies: e.target.value })}
                            className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                        />
                    </div>
                    <textarea
                        placeholder="Description"
                        value={newExp.description}
                        onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                        className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none h-24"
                        required
                    />
                    <div className="flex gap-4">
                        <button type="submit" className="bg-primary text-white py-3 px-6 rounded hover:bg-primary/80 transition-colors flex-1">
                            {editingId ? 'Update Experience' : 'Add Experience'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-600 text-white py-3 px-6 rounded hover:bg-gray-500 transition-colors flex items-center gap-2"
                            >
                                <FaTimes /> Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div key={exp._id} className="bg-gray-dark border border-gray-border p-6 rounded-xl relative group">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                                <p className="text-primary">{exp.company}</p>
                            </div>
                            <span className="text-sm text-gray-light bg-gray-bg px-3 py-1 rounded-full">{exp.period}</span>
                        </div>
                        <p className="text-gray-light mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                                <span key={i} className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="absolute top-6 right-6 flex gap-2">
                            <button
                                onClick={() => handleEditClick(exp)}
                                className="text-gray-500 hover:text-blue-500 transition-colors p-2"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDeleteExp(exp._id)}
                                className="text-gray-500 hover:text-red-500 transition-colors p-2"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageExperience;
