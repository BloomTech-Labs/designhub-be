const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.get('/:id/projects', userController.getProjectByUserId);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
