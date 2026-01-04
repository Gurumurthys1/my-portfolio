import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaTrash, FaPlus, FaEdit, FaTimes, FaImage, FaTrophy, FaList } from 'react-icons/fa';

const ManageHackathons = () => {
    const [hackathons, setHackathons] = useState([]);
    const [newHackathon, setNewHackathon] = useState({
        name: '',
        type: 'participation', // participation or win
        image: '',
        prize: '',
        description: '',
        location: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        fetchHackathons();
    }, []);

    const fetchHackathons = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/hackathons');
            setHackathons(data);
        } catch (error) {
            console.error('Error fetching hackathons:', error);
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };
            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
            setNewHackathon(prev => ({ ...prev, image: data.url }));
            setUploading(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploading(false);
            alert('Upload failed');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            if (editingId) {
                await axios.put(`http://localhost:5000/api/hackathons/${editingId}`, newHackathon, config);
            } else {
                await axios.post('http://localhost:5000/api/hackathons', newHackathon, config);
            }

            fetchHackathons();
            resetForm();
        } catch (error) {
            console.error('Error saving hackathon:', error);
            alert('Failed to save hackathon');
        }
    };

    const handleEditClick = (hackathon) => {
        setNewHackathon(hackathon);
        setEditingId(hackathon._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/hackathons/${id}`, config);
            fetchHackathons();
        } catch (error) {
            console.error('Error deleting hackathon:', error);
        }
    };

    const resetForm = () => {
        setNewHackathon({
            name: '',
            type: 'participation',
            image: '',
            prize: '',
            description: '',
            location: ''
        });
        setEditingId(null);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Manage Hackathons</h2>

            {/* Form */}
            <div className="bg-gray-dark border border-gray-border p-6 rounded-xl mb-8">
                <h3 className="text-lg text-white font-semibold mb-4 flex items-center gap-2">
                    {editingId ? <FaEdit className="text-primary" /> : <FaPlus className="text-primary" />}
                    {editingId ? 'Edit Entry' : 'Add New Entry'}
                </h3>
                <form onSubmit={handleSave} className="space-y-4">

                    {/* Type Selection */}
                    <div className="flex gap-4 mb-4">
                        <label className={`flex items-center gap-2 cursor-pointer p-3 rounded border ${newHackathon.type === 'participation' ? 'bg-primary/20 border-primary text-primary' : 'border-gray-border text-gray-400'}`}>
                            <input
                                type="radio"
                                name="type"
                                value="participation"
                                checked={newHackathon.type === 'participation'}
                                onChange={(e) => setNewHackathon({ ...newHackathon, type: 'participation' })}
                                className="hidden"
                            />
                            <FaList /> Participation Only
                        </label>
                        <label className={`flex items-center gap-2 cursor-pointer p-3 rounded border ${newHackathon.type === 'win' ? 'bg-primary/20 border-primary text-primary' : 'border-gray-border text-gray-400'}`}>
                            <input
                                type="radio"
                                name="type"
                                value="win"
                                checked={newHackathon.type === 'win'}
                                onChange={(e) => setNewHackathon({ ...newHackathon, type: 'win' })}
                                className="hidden"
                            />
                            <FaTrophy /> Winning Moment
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Hackathon Name"
                            value={newHackathon.name}
                            onChange={(e) => setNewHackathon({ ...newHackathon, name: e.target.value })}
                            className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                            required
                        />

                        {newHackathon.type === 'win' && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Prize / Position (e.g. 1st Place)"
                                    value={newHackathon.prize}
                                    onChange={(e) => setNewHackathon({ ...newHackathon, prize: e.target.value })}
                                    className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none"
                                />
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Image URL"
                                            value={newHackathon.image}
                                            onChange={(e) => setNewHackathon({ ...newHackathon, image: e.target.value })}
                                            className="bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none flex-1"
                                        />
                                        <label className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer transition flex items-center justify-center min-w-[100px]">
                                            {uploading ? '...' : <FaImage />}
                                            <input type="file" className="hidden" onChange={uploadFileHandler} />
                                        </label>
                                    </div>
                                    {newHackathon.image && (
                                        <div className="mt-2 relative w-full h-32 bg-gray-700/50 rounded overflow-hidden">
                                            <img src={newHackathon.image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {newHackathon.type === 'win' && (
                        <textarea
                            placeholder="Description / Details"
                            value={newHackathon.description}
                            onChange={(e) => setNewHackathon({ ...newHackathon, description: e.target.value })}
                            className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none h-24"
                        />
                    )}

                    <div className="flex gap-4">
                        <button type="submit" className="bg-primary text-white py-3 px-6 rounded hover:bg-primary/80 transition-colors flex-1">
                            {editingId ? 'Update Entry' : 'Add Entry'}
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

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hackathons.map((h) => (
                    <div key={h._id} className="bg-gray-dark border border-gray-border p-4 rounded-xl relative group">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-xs px-2 py-1 rounded ${h.type === 'win' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-500'}`}>
                                {h.type.toUpperCase()}
                            </span>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEditClick(h)} className="text-blue-400 hover:text-blue-300"><FaEdit /></button>
                                <button onClick={() => handleDelete(h._id)} className="text-red-400 hover:text-red-300"><FaTrash /></button>
                            </div>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-1">{h.name}</h4>
                        {h.type === 'win' && (
                            <div className="text-sm text-gray-400">
                                <p className="text-primary">{h.prize}</p>
                                <p className="line-clamp-2 mt-1">{h.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageHackathons;
