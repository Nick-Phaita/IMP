const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = async (email, token) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking the following link: 
        http://localhost:5000/api/auth/verify-email?token=${token}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
