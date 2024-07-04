// routes/threadRoutes.js
const express = require('express');
const { createThread, viewThreads } = require('../controllers/threadController');

const router = express.Router();

router.post('/create', createThread);
router.get('/:wallId', viewThreads);

module.exports = router;
