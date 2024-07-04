// routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');
const projectRoutes = require('./projectRoutes');
const postRoutes = require('./postRoutes');
const conversationWallRoutes = require('./conversationWallRoutes');
const threadRoutes = require('./threadRoutes');
const commentRoutes = require('./commentRoutes');
const mentorshipRequestRoutes = require('./mentorshipRequestRoutes');
const followRoutes = require('./followRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/project', projectRoutes);
router.use('/posts',postRoutes);
router.use('/conversationWalls', conversationWallRoutes);
router.use('/threads', threadRoutes);
router.use('/comments',commentRoutes);
router.use('/mentorshipRequests',mentorshipRequestRoutes);
router.use('/follows',followRoutes);

module.exports = router;
