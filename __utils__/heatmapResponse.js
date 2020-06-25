const heatmapById = {
  userId: 'auth0|5d83b8d3d8e1cf0df49647e3',
  projectId: 1,
  imageId: 1,
  count: 2,
  contribution: 'A lot... Like... A lot, a lot...',
};

const heatmapByUserId = [
  {
    id: '1',
    projectId: 1,
    imageId: 1,
    count: 2,
    contribution: 'A lot... Like... A lot, a lot...',
  },
];

const addHeatmap = {
  userId: 'auth0|5d83b8d3d8e1cf0df49647e3',
  projectId: 2,
  imageId: 2,
  count: 3,
  contribution: 'A whole bunch',
};

const updateHeatmap = {
  id: '2',
  userId: 'auth0|5d83b8d3d8e1cf0df49647e3',
  projectId: 2,
  imageId: 2,
  count: 4,
  contribution: 'A whole bunch more',
};
module.exports = { heatmapById, heatmapByUserId, addHeatmap, updateHeatmap };
