const express = require('express');
const router = express.Router();
const heatmapController = require('./heatmapController');

router.post('/', heatmapController.createHeatmap);
router.get('/:id', heatmapController.getHeatmapsFromUserId);
router.get('/count/:id', heatmapController.getTotalHeatmapContributions);
router.delete(':/id', heatmapController.deleteHeatmapById);

module.exports = router;
