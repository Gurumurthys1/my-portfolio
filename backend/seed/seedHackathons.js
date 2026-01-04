import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hackathon from '../models/Hackathon.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const hackathonList = [
    "National Road Safety Hackathon 2025",
    "Agentic Hackathons",
    "XYNTRA",
    "InnovestHack 2025",
    "Paranox 2.O Hackathon",
    "Adobe India Hackathon",
    "NationBuilding Case Study Competition 2025",
    "Tata Imagination Challenge 2024",
    "DeFy'26",
    "brAInwave 2.0",
    "Hacksprint 2.0",
    "DUHacks 5.0",
    "Hackxios 2K25",
    "WinterSpark",
    "NMIT HACKS 2025",
    "DevsHouse '25",
    "PEC Hacks 2.0",
    "HACK HUSTLE"
];

const winningMoment = {
    name: "graVITas'25 - Hackx 3.0",
    type: "win",
    prize: "2nd Runner Up",
    image: "/images/hackathon_comic.png",
    description: "Conducted at VIT Vellore."
};

const importData = async () => {
    try {
        await Hackathon.deleteMany();

        const participations = hackathonList.map(name => ({
            name,
            type: 'participation'
        }));

        await Hackathon.insertMany([...participations, winningMoment]);

        console.log('Hackathon Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
