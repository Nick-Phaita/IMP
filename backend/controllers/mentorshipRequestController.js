// controllers/mentorshipRequestController.js
const MentorshipRequest = require('../models/MentorshipRequest');
const ProjectMember = require('../models/ProjectMember');

// Create a new mentorship request
const createMentorshipRequest = async (req, res) => {
    const { project_id, mentor_id } = req.body;

    try {
        const mentorshipRequest = await MentorshipRequest.create({
            project_id,
            mentor_id
        });
        res.status(201).json(mentorshipRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View mentorship requests by project ID
const viewMentorshipRequests = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const requests = await MentorshipRequest.findAll({ where: { project_id: projectId } });
        if (!requests) {
            return res.status(404).json({ error: 'No mentorship requests found for this project' });
        }
        res.status(200).json(requests);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Respond to a mentorship request
const respondMentorshipRequest = async (req, res) => {
    const requestId = req.params.requestId;
    const { status } = req.body;

    try {
        const request = await MentorshipRequest.findByPk(requestId);
        if (!request) {
            return res.status(404).json({ error: 'Mentorship request not found' });
        }

        request.status = status;
        await request.save();

        if (status === 'Accepted') {
            await ProjectMember.create({
                project_id: request.project_id,
                user_id: request.mentor_id,
                role: 'Mentor'
            });
        }

        res.status(200).json(request);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createMentorshipRequest, viewMentorshipRequests, respondMentorshipRequest };
