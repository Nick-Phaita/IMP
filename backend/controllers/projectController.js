// controllers/projectController.js

const Project = require('../models/Project');
const User = require('../models/User');
const ProjectMember = require('../models/ProjectMember');
const ConversationWall = require('../models/ConversationWall');

// Create a new project
const createProject = async (req, res) => {
    const { owner_id, title, description } = req.body;

    try {
        const project = await Project.create({
            owner_id,
            title,
            description
        });

        await ProjectMember.create({
            project_id: project.project_id,
            user_id: owner_id,
            role: 'Owner'
        });

        // Create two conversation walls (Public and Private) for the new project
        await ConversationWall.bulkCreate([
            {
                project_id: project.project_id,
                title: `${title} Public Wall`,
                visibility: 'Public'
            },
            {
                project_id: project.project_id,
                title: `${title} Private Wall`,
                visibility: 'Private'
            }
        ]);

        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View a project by ID
const viewProject = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addProjectMember = async (req, res) => {
    const { project_id, user_id, role } = req.body;

    try {
        const project = await Project.findByPk(project_id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const projectMember = await ProjectMember.create({
            project_id,
            user_id,
            role
        });

        res.status(201).json(projectMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createProject, viewProject, addProjectMember };


