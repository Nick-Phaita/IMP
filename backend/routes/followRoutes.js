// routes/followRoutes.js
const express = require('express');
const {
    followProject,
    unfollowProject,
    viewFollowedProjects
} = require('../controllers/followController');

const router = express.Router();

router.post('/follow', followProject);
router.delete('/unfollow/:followId', unfollowProject);
router.get('/:userId', viewFollowedProjects);

module.exports = router;
