import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Certification from '../models/Certification.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const certifications = [
    {
        title: "Computer Vision for Industrial Inspection",
        issuer: "NVIDIA",
        date: "Dec 2025",
        credentialId: "PV8c_jE3QomEE0TyJpgd5g",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=NVIDIA+Certificate",
        skills: ["Python", "Deep Learning", "Computer Vision"]
    },
    {
        title: "GPU Programming Specialization",
        issuer: "Johns Hopkins University",
        date: "Nov 2025",
        credentialId: "LV0E510RW732",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=JHU+GPU+Spec",
        skills: []
    },
    {
        title: "Introduction to Concurrent Programming with GPUs",
        issuer: "Johns Hopkins University",
        date: "Aug 2025",
        credentialId: "6VJJE78K3HR4",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=JHU+Concurrent",
        skills: []
    },
    {
        title: "Introduction to Machine Learning on AWS",
        issuer: "United Latino Students Association",
        date: "Mar 2025",
        credentialId: "VW15ZCWXKE79",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=AWS+ML",
        skills: []
    },
    {
        title: "The Complete Full-Stack Web Development Bootcamp",
        issuer: "Udemy",
        date: "Feb 2025",
        credentialId: "UC-a59ea4a6-4256-48e1-a1c5-0f0536f157d4",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Udemy+Fullstack",
        skills: ["Web Development", "React.js", "Node.js", "SQL"]
    },
    {
        title: "Tata Imagination Challenge 2024",
        issuer: "Unstop",
        date: "Dec 2024",
        credentialId: "9e481e8c-4a34-4579-8639-c4c1844613a6",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Tata+Challenge",
        skills: []
    },
    {
        title: "Generative AI: Introduction and Applications",
        issuer: "IBM",
        date: "Mar 2025",
        credentialId: "H27YC9FFA0EV",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=IBM+GenAI",
        skills: []
    },
    {
        title: "Introduction to Artificial Intelligence (AI)",
        issuer: "IBM",
        date: "Mar 2025",
        credentialId: "WD1YKBIZEWNV",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=IBM+AI",
        skills: []
    },
    {
        title: "React js",
        issuer: "GUVI Support",
        date: "Jul 2024",
        credentialId: "242m78sFA0CH513117",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=GUVI+React",
        skills: ["React.js", "API"]
    },
    {
        title: "Front End Development - CSS",
        issuer: "Great Learning",
        date: "Apr 2024",
        credentialId: "QMURATNY",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=CSS+Cert",
        skills: ["CSS"]
    },
    {
        title: "Front End Development - HTML",
        issuer: "Great Learning",
        date: "Apr 2024",
        credentialId: "IYTIVZSR",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=HTML+Cert",
        skills: ["HTML5"]
    },
    {
        title: "Javascript Bootcamp",
        issuer: "LetsUpgrade",
        date: "Mar 2024",
        credentialId: "LUEJSMAR124113",
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=JS+Bootcamp",
        skills: ["JavaScript"]
    }
];

const seedCertifications = async () => {
  try {
    await Certification.deleteMany();
    console.log('Certifications cleared');

    await Certification.insertMany(certifications);
    console.log('Certifications seeded!');

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedCertifications();
