import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

// @desc    Create contact submission
// @route   POST /api/contact
export const createContact = async (req, res) => {
  console.log('📨 Contact form submission received'); // Debug log

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const contact = new Contact({
      name,
      email,
      message
    });

    const createdContact = await contact.save();

    console.log('💾 Contact saved to database');

    // Check Env Vars
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Email credentials missing in .env. Skipping email notification.');
    } else {
       console.log('📧 Attempting to send email...');
       
       const transporter = nodemailer.createTransport({
        service: 'gmail', // or your preferred service
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const time = new Date().toLocaleString();

      const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: 'gurumurthys001@gmail.com', 
        subject: `New Portfolio Message from ${name}`,
        text: `
          New message received at: ${time}
          
          Name: ${name}
          Email: ${email}
          
          Message:
          ${message}
        `,
        html: `
          <h3>New Portfolio Message</h3>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">
            <p>${message}</p>
          </div>
        `,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email notification sent:', info.response);
      } catch (emailError) {
        console.error('❌ Error sending email:', emailError);
        console.error('Make sure you are using an App Password if using Gmail (2FA enabled).'); 
      }
    }

    res.status(201).json({
      message: 'Message sent successfully!',
      contact: createdContact
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
