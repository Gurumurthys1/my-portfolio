import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendar, FaEnvelope, FaUser } from 'react-icons/fa';

const ManageMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/contact');
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-white">Loading messages...</div>;

    return (
        <div className="text-white">
            <h2 className="text-3xl font-bold mb-8">Messages</h2>

            <div className="grid gap-6">
                {messages.length === 0 ? (
                    <p className="text-gray-400">No messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id} className="bg-gray-dark border border-gray-border p-6 rounded-xl">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <FaUser />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{msg.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <FaEnvelope size={12} />
                                            <a href={`mailto:${msg.email}`} className="hover:text-primary transition">{msg.email}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-bg px-3 py-1 rounded-full border border-gray-border w-fit">
                                    <FaCalendar size={12} />
                                    {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>

                            <div className="bg-gray-bg/50 p-4 rounded-lg border border-gray-border/50">
                                <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageMessages;
