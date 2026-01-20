import { useState, useEffect } from 'react';
/* eslint-disable react/prop-types */
import { getSections, toggleSection } from '../../services/api';
import { FaSave, FaEdit, FaTimes } from 'react-icons/fa';

const SectionManager = ({ token }) => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({ label: '', order: 0 });

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const { data } = await getSections();
            setSections(data);
        } catch (err) {
            setError('Failed to fetch sections');
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (id, currentStatus) => {
        try {
            const { data } = await toggleSection(id, { isVisible: !currentStatus }, token);
            setSections(sections.map(sec => sec._id === id ? data : sec));
        } catch (err) {
            console.error("error during toggling section", err);
            alert('Failed to update section visibility');
        }
    };

    const startEdit = (section) => {
        setEditingId(section._id);
        setEditValues({ label: section.label, order: section.order || 0 });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValues({ label: '', order: 0 });
    };

    const saveEdit = async (id) => {
        try {
            const { data } = await toggleSection(id, { ...editValues }, token);
            setSections(sections.map(sec => sec._id === id ? data : sec).sort((a, b) => a.order - b.order));
            setEditingId(null);
        } catch (err) {
            console.error("error during updating section", err);
            alert('Failed to update section details');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Manage Navbar Sections</h2>
                <button onClick={fetchSections} className="text-sm text-primary hover:underline">Refresh</button>
            </div>

            <div className="grid gap-4">
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-gray-400 text-sm font-semibold border-b border-gray-700">
                    <div className="col-span-1">Order</div>
                    <div className="col-span-3">System Name</div>
                    <div className="col-span-4">Display Label</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                {sections.map((section) => (
                    <div key={section._id} className="flex flex-col md:grid md:grid-cols-12 gap-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600 items-center">

                        {/* Order */}
                        <div className="col-span-1 w-full md:w-auto">
                            {editingId === section._id ? (
                                <input
                                    type="number"
                                    value={editValues.order}
                                    onChange={(e) => setEditValues({ ...editValues, order: parseInt(e.target.value) })}
                                    className="w-full bg-gray-900 border border-gray-500 rounded px-2 py-1 text-white text-center"
                                />
                            ) : (
                                <span className="text-gray-300 font-mono bg-gray-900/50 px-2 py-1 rounded">{section.order}</span>
                            )}
                        </div>

                        {/* System Name */}
                        <div className="col-span-3 text-gray-400 text-sm">
                            <span className="md:hidden font-semibold mr-2">Id:</span>
                            {section.name}
                        </div>

                        {/* Label */}
                        <div className="col-span-4 w-full">
                            {editingId === section._id ? (
                                <input
                                    type="text"
                                    value={editValues.label}
                                    onChange={(e) => setEditValues({ ...editValues, label: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-500 rounded px-2 py-1 text-white"
                                />
                            ) : (
                                <span className="text-white font-medium text-lg md:text-base">{section.label}</span>
                            )}
                        </div>

                        {/* Status */}
                        <div className="col-span-2 flex items-center justify-between md:justify-start w-full gap-2">
                            <span className="md:hidden text-gray-400">Visibility:</span>
                            <button
                                onClick={() => handleToggle(section._id, section.isVisible)}
                                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${section.isVisible
                                        ? 'bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400'
                                        : 'bg-red-500/20 text-red-500 hover:bg-green-500/20 hover:text-green-400'
                                    }`}
                            >
                                {section.isVisible ? 'Visible' : 'Hidden'}
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="col-span-2 flex justify-end gap-2 w-full">
                            {editingId === section._id ? (
                                <>
                                    <button onClick={() => saveEdit(section._id)} className="p-2 bg-primary text-white rounded hover:bg-primary/80" title="Save">
                                        <FaSave />
                                    </button>
                                    <button onClick={cancelEdit} className="p-2 bg-gray-600 text-white rounded hover:bg-gray-500" title="Cancel">
                                        <FaTimes />
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => startEdit(section)} className="p-2 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/40" title="Edit Details">
                                    <FaEdit />
                                </button>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionManager;
