// controllers/threadController.js
const Thread = require('../models/Thread');

// Create a new thread
const createThread = async (req, res) => {
    const { wall_id, title } = req.body;

    try {
        const thread = await Thread.create({
            wall_id,
            title
        });
        res.status(201).json(thread);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View threads by wall ID
const viewThreads = async (req, res) => {
    const wallId = req.params.wallId;

    try {
        const threads = await Thread.findAll({ where: { wall_id: wallId } });
        if (!threads) {
            return res.status(404).json({ error: 'No threads found for this wall' });
        }
        res.status(200).json(threads);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createThread, viewThreads };
