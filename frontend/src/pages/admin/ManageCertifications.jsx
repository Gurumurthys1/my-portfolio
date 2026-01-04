import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaImage, FaEdit } from 'react-icons/fa';

const ManageCertifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null); // Track item being edited
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        date: '',
        credentialId: '',
        imageUrl: '',
        skills: ''
    });

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/certifications');
            setCertifications(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching certifications:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (cert) => {
        setEditingId(cert._id);
        setFormData({
            title: cert.title || '',
            issuer: cert.issuer || '',
            date: cert.date || '',
            credentialId: cert.credentialId || '',
            imageUrl: cert.imageUrl || '',
            skills: cert.skills ? cert.skills.join(', ') : ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setLoading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
            console.log('Upload response:', data); // Debug log
            setFormData(prev => ({ ...prev, imageUrl: data.url }));
            setLoading(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            const errorMsg = error.response?.data?.error || error.response?.data?.message || "Upload failed: Server Error";
            alert(`Upload Failed: ${errorMsg}`);
            setLoading(false);
        }
    };


    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({
            title: '',
            issuer: '',
            date: '',
            credentialId: '',
            imageUrl: '',
            skills: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
            const certData = { ...formData, skills: skillsArray };

            if (editingId) {
                // Update existing
                await axios.put(`http://localhost:5000/api/certifications/${editingId}`, certData);
                setEditingId(null);
            } else {
                // Create new
                await axios.post('http://localhost:5000/api/certifications', certData);
            }

            setFormData({
                title: '',
                issuer: '',
                date: '',
                credentialId: '',
                imageUrl: '',
                skills: ''
            });
            fetchCertifications();
        } catch (error) {
            console.error('Error saving certification:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this certification?')) {
            try {
                await axios.delete(`http://localhost:5000/api/certifications/${id}`);
                fetchCertifications();
            } catch (error) {
                console.error('Error deleting certification:', error);
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-8">Manage Certifications</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl text-white mb-6 flex items-center gap-2">
                        {editingId ? <><FaEdit className="text-primary" /> Edit Certification</> : <><FaPlus className="text-primary" /> Add New Certification</>}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Certification Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-gray-700 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Issuer</label>
                                <input
                                    type="text"
                                    name="issuer"
                                    value={formData.issuer}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Date (e.g., Dec 2025)</label>
                                <input
                                    type="text"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Credential ID (Optional)</label>
                            <input
                                type="text"
                                name="credentialId"
                                value={formData.credentialId}
                                onChange={handleChange}
                                className="w-full bg-gray-700 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Image</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full bg-gray-700 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                                placeholder="Enter Image URL directly"
                            />
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer transition">
                                    <FaImage /> Upload File
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={uploadFileHandler}
                                    />
                                </label>
                                {loading && <span className="text-sm text-gray-400">Uploading...</span>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Skills (comma separated)</label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full bg-gray-700 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Python, React, AWS"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded transition duration-300"
                            >
                                {editingId ? 'Update Certification' : 'Add Certification'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded transition duration-300"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl text-white mb-6">Existing Certifications</h2>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {loading ? (
                            <div className="text-center text-gray-400">Loading...</div>
                        ) : certifications.map((cert) => (
                            <div key={cert._id} className="bg-gray-700 p-4 rounded flex justify-between items-start group">
                                <div>
                                    <h3 className="text-white font-semibold">{cert.title}</h3>
                                    <p className="text-primary text-sm">{cert.issuer}</p>
                                    <p className="text-gray-400 text-xs mt-1">{cert.date}</p>
                                    <p className="text-gray-400 text-xs mt-1">{cert.date}</p>
                                    {cert.imageUrl && (
                                        <a
                                            href={cert.imageUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 transition mt-2 inline-block"
                                            title="View Certificate"
                                        >
                                            <FaImage size={24} />
                                        </a>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(cert)}
                                        className="text-gray-400 hover:text-blue-400 transition p-2"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cert._id)}
                                        className="text-gray-400 hover:text-red-500 transition p-2"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {certifications.length === 0 && !loading && (
                            <div className="text-center text-gray-500 py-8">No certifications added yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCertifications;
