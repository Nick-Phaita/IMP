// controllers/followController.js
const Follow = require('../models/Follow');
const Project = require('../models/Project');

// Follow a project
const followProject = async (req, res) => {
    const { follower_id, followed_project_id } = req.body;

    try {
        const follow = await Follow.create({
            follower_id,
            followed_project_id
        });
        res.status(201).json(follow);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Unfollow a project
const unfollowProject = async (req, res) => {
    const followId = req.params.followId;

    try {
        const follow = await Follow.findByPk(followId);
        if (!follow) {
            return res.status(404).json({ error: 'Follow not found' });
        }
        await follow.destroy();
        res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View followed projects by user ID
const viewFollowedProjects = async (req, res) => {
    const userId = req.params.userId;

    try {
        const follows = await Follow.findAll({ where: { follower_id: userId }, include: Project });
        if (!follows) {
            return res.status(404).json({ error: 'No followed projects found for this user' });
        }
        res.status(200).json(follows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { followProject, unfollowProject, viewFollowedProjects };
