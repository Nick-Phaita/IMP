const Profile = require('../models/Profile');
const User = require('../models/User');

const createProfile = async (req, res) => {
    const { user_id, first_name, last_name, occupation, interests, skills, experience, achievements, links, bio } = req.body;

    try {
        const profile = await Profile.create({
            user_id,
            first_name,
            last_name,
            occupation,
            interests,
            skills,
            experience,
            achievements,
            links,
            bio
        });
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const viewProfile = async (req, res) => {
    const userId = req.params.userId;

    try {
        const profile = await Profile.findOne({ where: { user_id: userId } });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        const user = await User.findOne({ where: { user_id: userId } });

        const profileData = {
            username: user.username,
            email: user.email,
            role: user.role,
            first_name: profile.first_name,
            last_name: profile.last_name,
            occupation: profile.occupation,
            interests: profile.interests,
            skills: profile.skills,
            experience: profile.experience,
            achievements: profile.achievements,
            links: profile.links,
            bio: profile.bio,
            created_at: profile.created_at,
            updated_at: profile.updated_at
        };

        res.status(200).json(profileData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createProfile, viewProfile };
