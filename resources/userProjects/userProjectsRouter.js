const express = require('express');
const router = express.Router();
const projectController = require('./userProjectsController');

const secured = require('../utils/secured');

router.post('/', secured, projectController.createProject);
router.get('/:id', secured, projectController.getProjectById);
router.get('/', projectController.getAllProjects);
router.get('/users/:userId/', secured, projectController.getProjectByUserId);
router.get('/recent/:userId/', secured, projectController.getRecentProjectByUserId);
router.post('/name', projectController.getProjectsByName);
router.put('/:id', secured, projectController.updateProjectById);
router.delete('/:id', secured, projectController.deleteProjectById);

module.exports = router;
