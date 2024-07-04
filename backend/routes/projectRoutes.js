// routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// POST /api/project/create
router.post('/create', projectController.createProject);

// GET /api/project/:projectId
router.get('/:projectId', projectController.viewProject);

router.post('/add-member', projectController.addProjectMember);

module.exports = router;
