const express = require('express');
const router = express.Router();
const photoController = require('./photoController');

router.post('/projects/:id', photoController.createPhoto);
