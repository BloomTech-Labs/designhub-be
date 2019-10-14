const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.getExploreOptions = async (req, res) => {
  //   if (!req.params.id) {
  //     res.status(400).json({ message: 'id was not attached to the req.params' });
  //   }
  //   const { id } = req.params;
  try {
    const recent = await go
      .getMany('user_projects')
      .orderBy('created_at', desc);
    res.status(200).json({ recent });
  } catch (err) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Couldn't find the photo's comments", error: error });
  }
};
