const express = require('express');
const router = express.Router();
const userController = require('./userController');

const securing = require('../utils/secured');

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/check/:username', userController.getUserByUsername);
router.get('/', userController.getAllUsers);
router.put('/:id', securing, userController.updateUserById);
router.delete('/:id', securing, userController.deleteUserById);

module.exports = router;
