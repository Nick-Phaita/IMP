const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/email');

const registerUser = async (req, res) => {
    const { email, username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    try {
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
            role,
            verification_token: verificationToken,
        });

        // Send verification email
        await sendVerificationEmail(newUser.email, verificationToken);

        res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const user = await User.findOne({ where: { verification_token: token } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.verified = true;
        user.verification_token = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Error verifying email' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if user is verified
        if (!user.verified) {
            return res.status(400).json({ message: 'Please verify your email first' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, user: { email: user.email, username: user.username, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, verifyEmail, loginUser };
