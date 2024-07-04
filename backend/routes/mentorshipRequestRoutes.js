// routes/mentorshipRequestRoutes.js
const express = require('express');
const {
    createMentorshipRequest,
    viewMentorshipRequests,
    respondMentorshipRequest
} = require('../controllers/mentorshipRequestController');

const router = express.Router();

router.post('/create', createMentorshipRequest);
router.get('/:projectId', viewMentorshipRequests);
router.patch('/:requestId', respondMentorshipRequest);

module.exports = router;
