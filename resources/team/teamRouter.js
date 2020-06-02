const express = require('express');
const router = express.Router();
const teamController = require('./teamController');

router.post('/', teamController.createTeam);
router.get('/:id', teamController.getTeamById);
router.get('/', teamController.getAllTeams);
router.delete('/:id', teamController.deleteTeamById);
router.put('/:id', teamController.updateTeamById);

module.exports = router;
