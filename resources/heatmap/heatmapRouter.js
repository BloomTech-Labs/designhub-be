const express = require('express');
const router = express.Router();
const heatmapController = require('./heatmapController');

router.post('/', heatmapController.createHeatmap);
router.get('/:id', heatmapController.getHeatmapsFromUserId);
router.get('/all/:id', heatmapController.getAllHeatmapsFromUserId);
router.get('/count/:id', heatmapController.getTotalHeatmapContributions);
router.delete(':/id', heatmapController.deleteHeatmapById);
router.put('/:id', heatmapController.editHeatmap);

module.exports = router;
