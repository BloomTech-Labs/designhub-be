const express = require('express');
const router = express.Router();

const secured = require('../utils/secured');

const controller = require('./projectInvitesController');

// For testing purposes
router.get('/all', controller.getAllInvites);

router.post('/create', secured, controller.createProjectInvite);
router.get('/', secured, controller.getInvitesByUser);


module.exports = router;
