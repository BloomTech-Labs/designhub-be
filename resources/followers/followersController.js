const go = require('../utils/crud');
const db = require('../../data/dbConfig');

const userMatches = require('../utils/userMatches');

//test

// exports.getAllFollowers = async (req, res) => {
//   try {
//     const data = await go.getMany('user_followers');
//     res.status(200).json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: "couldn't get users" });
//   }
// };

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
    if (await userMatches(req.headers.openToken, req.body.followingId)) {
    const [id] = await go.createOne('user_followers', 'id', req.body);
    const data = await go.getById('user_followers', id);
    res.status(201).json({ message: 'Follow successfully created!', data });
    } else {
      res
      .status(401)
      .json({
        message:
          "Unauthorized: You are not authorized to follow users for this account."
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Couldn't create the follow", error: error });
  }
};

exports.isFollowed = async (req, res) => {
  if (!req.params.followingId) {
    res
      .status(422)
      .json({ message: 'followingId was not attached to the req.params' });
  }
  if (!req.params.followedId) {
    res
      .status(422)
      .json({ message: 'followedId was not attacked to the req.params' });
  }
  try {
    const result = await db('user_followers')
      .where('followingId', req.params.followingId)
      .andWhere('followedId', req.params.followedId);
    if (result.length === 0) {
      res.json({ isFollowed: false });
    } else {
      res.json({ isFollowed: true });
    }
  } catch ({ message }) {
    console.error(message);
    res.status(400).json({ message: 'something went wrong', message });
  }
};

exports.getFollowingCount = async (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .json({ message: 'followingId was not attached to the req.params' });
  }

  const { id } = req.params;

  try {
    const data = await db('user_followers')
      .count('id')
      .where('followingId', id);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Couldnt find following count' });
  }
};

exports.getFollowingByUserId = async (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .json({ message: 'followingId was not attached to the req.params' });
  }

  const { id } = req.params;

  try {
    const data = await db('user_followers as uf')
      .select(
        'uf.id',
        'u.firstName',
        'u.lastName',
        'u.avatar',
        'u.username',
        'u.id as userId',
        'u.bio'
      )
      .where('followingId', id)
      .innerJoin('users as u', 'uf.followedId', '=', 'u.id');
    const newData = data.map(item => {
      return {
        id: item.id,
        name: `${item.firstName} ${item.lastName}`,
        avatar: item.avatar,
        username: item.username,
        userId: item.userId,
        bio: item.bio
      };
    });

    res.status(200).json(newData);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Couldnt find following count' });
  }
};

exports.getFollowersByUserId = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'id was not attached to the req.params' });
  }

  const { id } = req.params;

  try {
    const data = await db('user_followers as uf')
      .select(
        'uf.id',
        'u.firstName',
        'u.lastName',
        'u.avatar',
        'u.username',
        'u.id as userId',
        'u.bio'
      )
      .where('uf.followedId', id)
      .innerJoin('users as u', 'uf.followingId', '=', 'u.id');
    const newData = data.map(item => {
      return {
        id: item.id,
        name: `${item.firstName} ${item.lastName}`,
        avatar: item.avatar,
        username: item.username,
        userId: item.userId,
        bio: item.bio
      };
    });

    res.status(200).json(newData);
  } catch ({ message }) {
    console.error(message);
    res.status(400).json({ message: 'Couldnt find followers count', message });
  }
};

exports.getFollowersCount = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'id was not attached to the req.params' });
  }

  const { id } = req.params;

  try {
    const data = await db('user_followers')
      .count('id')
      .where('followedId', id);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Couldnt find followers count' });
  }
};

exports.unfollow = async (req, res) => {
  if (!req.body.id) {
    res.status(400).json({ message: 'id was not attached to the req.body' });
  }

  if (!req.params.id) {
    res.status(400).json({ message: 'id was not attached to the req.params' });
  }

  try {
    if (await userMatches(req.headers.openToken, req.body.id)) {
    await db('user_followers')
      .del()
      .where('followedId', req.params.id)
      .andWhere('followingId', req.body.id);
    res.status(200).json({ message: 'Follow successfully deleted' });
    } else {
      res
      .status(401)
      .json({
        message:
          "Unauthorized: You are not authorized to unfollow for this account."
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Couldn't delete follow.", error: error });
  }
};
