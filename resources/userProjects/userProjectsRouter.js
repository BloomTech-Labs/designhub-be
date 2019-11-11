const express = require('express');
const router = express.Router();
const projectController = require('./userProjectsController');

const secured = require('../utils/secured');

router.post('/', projectController.createProject);
router.get('/:id', secured, projectController.getProjectById);
router.get('/', projectController.getAllProjects);
router.get('/users/:userId/', projectController.getProjectByUserId);
router.get('/recent/:userId/', projectController.getRecentProjectByUserId);
router.post('/name', projectController.getProjectsByName);
router.put('/:id', projectController.updateProjectById);
router.delete('/:id', projectController.deleteProjectById);

module.exports = router;
