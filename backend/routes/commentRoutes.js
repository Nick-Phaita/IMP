// routes/commentRoutes.js
const express = require('express');
const { createComment, viewComments } = require('../controllers/commentController');

const router = express.Router();

router.post('/create', createComment);
router.get('/:threadId', viewComments);

module.exports = router;
