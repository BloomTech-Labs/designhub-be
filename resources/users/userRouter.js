const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/check/:username', userController.getUserByUsername);
router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
