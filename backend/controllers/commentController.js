// controllers/commentController.js
const Comment = require('../models/Comment');
const Thread = require('../models/Thread');
const User = require('../models/User');

// Create a new comment
const createComment = async (req, res) => {
    const { thread_id, user_id, content } = req.body;

    try {
        const comment = await Comment.create({
            thread_id,
            user_id,
            content
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View comments by thread ID
const viewComments = async (req, res) => {
    const threadId = req.params.threadId;

    try {
        const comments = await Comment.findAll({ where: { thread_id: threadId } });
        if (!comments) {
            return res.status(404).json({ error: 'No comments found for this thread' });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createComment, viewComments };
