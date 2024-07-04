const express = require('express');
const router = express.Router();
const { createProfile, viewProfile } = require('../controllers/profileController');

router.post('/create', createProfile);
router.get('/:userId', viewProfile);

module.exports = router;
