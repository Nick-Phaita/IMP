// routes/postRoutes.js
const express = require('express');
const { createPost, viewPosts } = require('../controllers/postController');

const router = express.Router();

router.post('/create', createPost);
router.get('/:projectId', viewPosts);

module.exports = router;
