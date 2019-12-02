const express = require('express');
const router = express.Router();
const userController = require('./userController');

const secured = require('../utils/secured');

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/check/:username', userController.getUserByUsername);
router.get('/', userController.getAllUsers);
router.put('/:id', secured, userController.updateUserById);
router.delete('/:id', secured, userController.deleteUserById);
router.get('/mail/:email', userController.getUserByEmail);

module.exports = router;
