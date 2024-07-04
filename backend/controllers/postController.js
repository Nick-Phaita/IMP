// controllers/postController.js
const Post = require('../models/Post');
const ProjectMember = require('../models/ProjectMember');
const Project = require('../models/Project');
const User = require('../models/User');

// Create a new post
const createPost = async (req, res) => {
    const { project_id, user_id, content, visibility } = req.body;

    try {
        // Check if the user is a member of the project
        const projectMember = await ProjectMember.findOne({ where: { project_id, user_id } });
        if (!projectMember) {
            return res.status(403).json({ error: 'User is not a member of the project' });
        }

        const post = await Post.create({
            project_id,
            user_id,
            content,
            visibility
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View posts for a project
const viewPosts = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const posts = await Post.findAll({
            where: { project_id: projectId },
            include: [{ model: User, attributes: ['username', 'email'] }]
        });
        if (!posts) {
            return res.status(404).json({ error: 'No posts found for this project' });
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createPost, viewPosts };
