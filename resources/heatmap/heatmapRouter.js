const express = require('express');
const router = express.Router();
const heatmapController = require('./heatmapController');

router.post('/', heatmapController.createHeatmap);

module.exports = router;
