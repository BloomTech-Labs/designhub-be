const express = require('express');
const router = express.Router();
const projectController = require('./userProjectsController');

router.post('/', projectController.createProject);
router.get('/:id', projectController.getProjectById);
router.get('/', projectController.getAllProjects);
router.post('/name', projectController.getProjectsByName);
router.put('/:id', projectController.updateProjectById);
router.delete('/:id', projectController.deleteProjectById);

module.exports = router;
