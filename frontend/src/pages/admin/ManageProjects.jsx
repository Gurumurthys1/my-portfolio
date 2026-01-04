import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaTrash, FaPlus, FaGithub, FaExternalLinkAlt, FaEdit, FaTimes, FaImage } from 'react-icons/fa';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        technologies: '',
        image: '/images/project-placeholder.jpg',
        githubUrl: '',
        liveUrl: '',
        category: 'web',
        featured: false
    });
    const [editingId, setEditingId] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/projects');
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const [uploading, setUploading] = useState(false);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
            console.log('Upload response:', data);
            setNewProject(prev => ({ ...prev, image: data.url }));
            setUploading(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            const errorMsg = error.response?.data?.error || error.response?.data?.message || "Upload failed: Server Error";
            alert(`Upload Failed: ${errorMsg}`);
            setUploading(false);
        }
    };



    const handleSaveProject = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            const payload = {
                ...newProject,
                technologies: typeof newProject.technologies === 'string'
                    ? newProject.technologies.split(',').map(t => t.trim())
                    : newProject.technologies
            };

            if (editingId) {
                const { _id, createdAt, updatedAt, __v, ...updateData } = payload;
                await axios.put(`http://localhost:5000/api/projects/${editingId}`, updateData, config);
            } else {
                await axios.post('http://localhost:5000/api/projects', payload, config);
            }

            fetchProjects();
            resetForm();
        } catch (error) {
            console.error('Error saving project:', error);
            alert(error.response?.data?.message || 'Failed to save project');
        }
    };

    const handleEditClick = (project) => {
        setNewProject({
            ...project,
            technologies: project.technologies.join(', ')
        });
        setEditingId(project._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setNewProject({
            title: '',
            description: '',
            technologies: '',
            image: '/images/project-placeholder.jpg',
            githubUrl: '',
            liveUrl: '',
            category: 'web',
            featured: false
        });
        setEditingId(null);
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/projects/${id}`, config);
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Manage Projects</h2>

            <div className="bg-gray-dark border border-gray-border p-6 rounded-xl mb-8">
                <h3 className="text-lg text-white font-semibold mb-4 flex items-center gap-2">
                    {editingId ? <FaEdit className="text-primary" /> : <FaPlus className="text-primary" />}
                    {editingId ? 'Edit Project' : 'Add New Project'}
                </h3>
                <form onSubmit={handleSaveProject} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Project Title"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            required
                        />
                        <select
                            value={newProject.category}
                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                            className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                        >
                            <option value="web">Web Development</option>
                            <option value="mobile">Mobile App</option>
                            <option value="ai">AI / Data Science</option>
                            <option value="fullstack">Full Stack</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="text"
                            placeholder="GitHub URL"
                            value={newProject.githubUrl}
                            onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                            className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Live Demo URL"
                            value={newProject.liveUrl}
                            onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                            className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                        />

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400 text-sm">Project Image</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Image Path / URL"
                                    value={newProject.image}
                                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                    className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none flex-1"
                                />
                                <label className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer transition flex items-center justify-center min-w-[120px]">
                                    {uploading ? <span className="text-sm">Uploading...</span> : <><FaImage className="mr-2" /> Upload</>}
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={uploadFileHandler}
                                    />
                                </label>
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Technologies (comma separated)"
                            value={newProject.technologies}
                            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                            className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                        />
                    </div>
                    <textarea
                        placeholder="Project Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none h-24"
                        required
                    />
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={newProject.featured}
                            onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                            className="w-4 h-4 accent-primary"
                        />
                        <label htmlFor="featured" className="text-gray-light cursor-pointer">Featured Project</label>
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="bg-primary text-white py-3 px-6 rounded hover:bg-primary/80 transition-colors flex-1">
                            {editingId ? 'Update Project' : 'Add Project'}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-gray-dark border border-gray-border rounded-xl overflow-hidden group relative">
                        <div className="h-48 overflow-hidden">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-6">
                            <div className="flex justifying-between items-start mb-2">
                                <h4 className="text-xl font-bold text-white flex-1">{project.title}</h4>
                                <div className="flex gap-2 text-gray-light">
                                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer"><FaGithub /></a>}
                                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer"><FaExternalLinkAlt /></a>}
                                </div>
                            </div>
                            <p className="text-sm text-primary mb-2 uppercase tracking-wide">{project.category}</p>
                            <p className="text-gray-light text-sm line-clamp-2">{project.description}</p>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEditClick(project)}
                                className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                            >
                                <FaEdit size={14} />
                            </button>
                            <button
                                onClick={() => handleDeleteProject(project._id)}
                                className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                            >
                                <FaTrash size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProjects;
