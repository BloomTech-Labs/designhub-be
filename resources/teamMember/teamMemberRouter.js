const express = require('express');
const router = express.Router();
const teamMemberController = require('./teamMemberController');

router.post('/', teamMemberController.createTeamMember);
router.get('/:id', teamMemberController.getTeamMembersByTeamId);
router.delete('/:id', teamMemberController.deleteTeamMemberById);
router.put('/:id', teamMemberController.updateTeamMemberById);

module.exports = router;
