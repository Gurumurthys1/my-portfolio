
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const updatePassword = async () => {
    try {
        await connectDB();

        const email = 'gurumurthys001@gmail.com';
        const newPassword = 'Gurus@2526';

        const user = await User.findOne({ email });

        if (user) {
            user.password = newPassword;
            await user.save();
            console.log(`Password updated successfully for ${email}`);
        } else {
            console.log(`User not found with email: ${email}`);
            // Optional: Create if not exists
            const newUser = await User.create({
                email,
                password: newPassword,
                role: 'admin'
            });
             console.log(`User created with email: ${email}`);
        }

        process.exit();
    } catch (error) {
        console.error('Error updating password:', error);
        process.exit(1);
    }
};

updatePassword();
