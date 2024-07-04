// controllers/conversationWallController.js
const ConversationWall = require('../models/ConversationWall');

const viewConversationWall = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const walls = await ConversationWall.findAll({ where: { project_id: projectId } });
        if (!walls) {
            return res.status(404).json({ error: 'No conversation walls found for this project' });
        }

        res.status(200).json(walls);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { viewConversationWall };
