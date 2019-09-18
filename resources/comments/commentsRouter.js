const express = require('express');
const router = express.Router();
const commentsController = require('./commentsController');

// ********************* PHOTO COMMENTS *************************
//***************************************************************

router.post('/photo', commentsController.createPhotoComment);
router.get('/photo/:imageId', commentsController.getCommentsByImageId);

// ********************* PROJECT COMMENTS *************************
// ****************************************************************
router.post('/project', commentsController.createProjectComment);
router.get('/project/:projectId', commentsController.getCommentsByImageId);

module.exports = router;
