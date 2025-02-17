const express = require('express');
const router = express.Router();
const { registerUser, verifyEmail, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.get('/verify-email', verifyEmail);
router.post('/login', loginUser);

module.exports = router;

