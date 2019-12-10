const go = require('../utils/crud');
const db = require('../../data/dbConfig');

const userMatches = require('../utils/userMatches');

exports.createUser = async (req, res) => {
  const { sub } = req.body;
  let user = [];
  let avatar = null;
  //first search by sub

  if (!sub) {
    res.status(422).json({ message: 'Missing sub field' });
  } else {
    try {
      user = await db('users')
        .select('*')
        .where('auth0Id', sub);

      if (user.length > 0) {
        res.status(200).json({ message: 'User already created', user });
      } else {
        if (req.body.picture) {
          avatar = req.body.picture;
        }
        let userObject = {
          auth0Id: sub,
          avatar: avatar
        };

        const [id] = await go.createOne('users', 'id', userObject);
        const [user] = await go.getById('users', id);

        console.log(user);

        // Look for invites that this email has
        const invites = await db('project_teams').where('email', user.email);

        invites.forEach(async invite => {
          go.updateById('project_teams', {
            ...invite,
            userId: id
          }, invite.id)

          // Create a noticiation for each dormant invite
          const [project] = await go.getById('user_projects', invite.projectId);
          const [activeUser] = await go.getById('users', project.userId);

          const inviteContent = {
            activeUserId: activeUser.id,
            activeUserAvatar: activeUser.avatar,
            invitedUserId: user.id,
            projectId: project.id,
            projectName: project.name,
            mainImgUrl: project.mainImg,
            activeUsername: activeUser.username,
            message: invite.id + " " + user.email,
            type: 'collab'
          };

          go.createOne('invite', 'id', inviteContent);
        })

        res
          .status(201)
          .json({ message: 'Account successfully created!', user });
      }
    } catch ({ message }) {
      res.status(500).json({ message: 'Something went wrong', error: message });
    }
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await go.getById('users', id);
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Couldn't find user." });
    }
  } catch ({ message }) {
    res.status(500).json({ message: 'Something went wrong.', error: message });
  }
};

exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const data = await go.getByUsername('users', username, 'username');
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(204).json({ message: 'user does not exist', data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't find username.", error: error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await go.getMany('users').orderBy('id', 'asc');

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something wen't wrong", error: error });
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;

  const { auth0Id, website } = req.body;
  const regex = /^(https?:\/\/)/i;
  if (!website.match(regex) && website.length > 0)
    req.body.website = 'https://' + website;
  if (!auth0Id) {
    res.status(422).json({ message: 'missing auth0Id fields' });
  } else {
    try {
      if (!(await userMatches(req.user, id))) {
        return res.status(401).json({ message: "You may not update another user's profile." });
      }
      else {
        await go.updateById('users', req.body, id);
        const data = await go.getById('users', id);
        if (data.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: 'User does not exist' });
        }
      }
    } catch ({ message }) {
      res.status(500).json({ message: 'Something went wrong', error: message });
    }
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  if (!(await userMatches(req.user, id))) {
    console.log("No match!");
    return res.status(401).json({ message: "You may not delete another user's profile." })
  }

  console.log("yes match!");

  try {
    const user = await go.destroyById('users', id);
    if (user === 1) {
      res.status(200).json({ message: 'User successfully deleted' });
    } else {
      res.status(404).json({ message: 'Id not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't delete user.", error: error });
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await go.getUserByEmail(email);
    if(user.length > 0){
      res.status(200).json(user);
    }else {
      res.status(204).json({ message: 'user does not exist', user: [] });
    }    
  }
  catch (err) {
    res.status(500).json({ message: "Couldn't find email.", err: error });
  }
};

