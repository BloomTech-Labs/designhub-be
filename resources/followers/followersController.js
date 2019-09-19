const go = require('../utils/crud');
const db = require('../../data/dbConfig');

//test

exports.getAllFollowers = async (req, res) => {
  try {
    const data = await go.getMany('user_followers');
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "couldn't get users" });
  }
};

exports.createFollow = async (req, res) => {
  if (!req.body.followingId) {
    res
      .status(400)
      .json({ message: 'followingId was not attached to the req.body' });
  }
  if (!req.body.followedId) {
    res
      .status(400)
      .json({ message: 'followedId was not attached to the req.body' });
  }

  try {
    const [id] = await go.createOne('user_followers', 'id', req.body);
    const data = await go.getById('user_followers', id);
    res.status(201).json({ message: 'Follow successfully created!', data });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Couldn't create the follow", error: error });
  }
};

exports.getFollowingCount = async (req, res) => {
  if (!req.params.followingId) {
    res
      .status(400)
      .json({ message: 'followingId was not attached to the req.params' });
  }

  const { followingId } = req.params;

  try {
    const data = await db('user_followers')
      .count('id')
      .where('followingId', followingId);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Couldnt find following count' });
  }
};

exports.getFollowersCount = async (req, res) => {
  if (!req.params.followingId) {
    res
      .status(400)
      .json({ message: 'followingId was not attached to the req.params' });
  }

  const { followingId } = req.params;

  try {
    const data = await db('user_followers')
      .count('id')
      .where('followedId', followingId);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Couldnt find followers count' });
  }
};

exports.unfollow = async (req, res) => {
  if (!req.body.followingId) {
    res
      .status(400)
      .json({ message: 'followingId was not attached to the req.body' });
  }

  if (!req.params.followedId) {
    res
      .status(400)
      .json({ message: 'followedId was not attached to the req.params' });
  }

  const { followedId } = req.params;
  const { followingId } = req.body;

  try {
    await db('user_followers')
      .del()
      .where('followedId', followedId)
      .andWhere('followingId', followingId);
    res.status(200).json({ message: 'Follow successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Couldn't delete follow.", error: error });
  }
};
