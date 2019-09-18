const express = require('express');
const router = express.Router();
const heatmapController = require('./heatmapController');

router.post('/', heatmapController.createHeatmap);
router.get('/:userId', heatmapController.getHeatmapsFromUserId);
router.get('/total/:userId', heatmapController.getTotalHeatmapContributions);
router.delete(':/id', heatmapController.deleteHeatmapById);

module.exports = router;
