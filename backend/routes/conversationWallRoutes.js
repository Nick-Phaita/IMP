// routes/conversationWallRoutes.js
const express = require('express');
const { viewConversationWall } = require('../controllers/conversationWallController');

const router = express.Router();

router.get('/:projectId', viewConversationWall);

module.exports = router;
