const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.getAllFollowers = async (req, res) => {
  try {
    const data = await go.getMany('user_followers');
    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "couldn't get users" });
  }
};
