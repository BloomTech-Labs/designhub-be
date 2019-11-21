const go = require('../utils/crud');
const db = require('../../data/dbConfig');

const userMatches = require('../utils/userMatches');

// For testing purposes
exports.getAllInvites = async (req, res) => {
  try {
    const invites = await db('project_teams');

    return res.status(200).json(invites);
  } catch (err) {
    return res.status(500).json({ message: "Ooops!" });
  }
}

// Create an invite to a project
exports.createProjectInvite = async (req, res) => {
  // Project ID
  // User email to invite
  // Write allowed/not allowed
  if (!req.body.projectId) {
    return res.status(400).json({ message: 'A valid projectId is required' });
  }
  if (!req.body.email) {
    return res.status(400).json({ message: 'A valid email is required' });
  }

  const { projectId, email } = req.body;
  const write = req.body.write ? req.body.write : false;

  const project = await go.getById('user_projects', projectId);

  // Does the project exist?
  if (project.length === 0) {
    return res
      .status(404)
      .json({ message: 'A project with that ID does not exist!' });
  }

  // Is this person allowed to make invites?
  if (!(await userMatches(req.user, project[0].userId))) {
    return res
      .status(401)
      .json({ message: 'You may not create invites for this project!' });
  }
  try {
    // Is this user registered?
    // Retrieve user ID from email
    const user = await go.getUserByEmail(email);

    if (user.length === 0) {
      // Send out an email using Twilio
    } else {
      // Create notification for invite
    }

    // Create invite
    await go.createOne('project_teams', 'id', {
      projectId,
      userId: user.length === 0 ? null : user[0].id,
      email,
      write
    });

    return res.status(201).json({ message: 'Invite successfully sent.' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({
        message: 'An unknown error occured while creating this invite.'
      });
  }
};

// Get invites by user
exports.getInvitesByUser = async (req, res) => {
  try {
    const [user] = await db('users').select('id').where('auth0Id', req.user.sub);

    const invites = await db('project_teams').where('userId', user.id);

    res.status(200).json(invites);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "could not access db" })
  }
}


// Get invites by project
exports.getInvitesByProjectId = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await go.getById('user_projects', projectId);

    if (project.length === 0) {
      return res.status(404).json({ message: 'A project does not exist with that id' });
    }
    const invites = await db('project_teams').where('projectId', projectId);

    res.status(200).json(invites);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'could not access db' });
  }

}

// Accept an invite to a project
exports.acceptInviteById = async (req, res) => {
  
  if(req.body.pending === true){
    return res.status(400).json({message: "You have to accept this invite."})

  }

  try {

    const invite = await go.getById('project_teams', req.params.id);

    if(invite.length === 0){
      return res.status(404).json({message: 'A valid invite id is required.'});
    }

    if (!(await userMatches(req.user, invite[0].userId))) {
      return res
        .status(401)
        .json({ message: 'You may not accept invites for this project!' });
    }

    await go.updateById('project_teams', {pending: req.body.pending}, req.params.id);

    const updatedInvite = await go.getById('project_teams', req.params.id);

    res.status(200).json(updatedInvite);

  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: 'There was an error accepting the invite in the database.'})

  }


}
// Update an invite to a project

exports.updateInviteById = async (req, res) =>{
    const id = req.params.id;
    const changes = req.body;

    try{
        const invite = await go.getById('project_teams', id);
        if( invite.length === 0 ){
            return res.status(404).json({message: 'The invite id provided is invalid.'})
        }
        const project = await go.getById('user_projects', invite[0].projectId);
        if (!(await userMatches(req.user, project[0].userId))) {
            console.log(project)
            return res
              .status(401)
              .json({ message: 'You may not update invites for this project!' });
          }

    await go.updateById('project_teams', changes, req.params.id);
    const updatedInvite = await go.getById('project_teams', id);
        res.status(200).json(updatedInvite);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'There was an error updating the invite.'})
    }


}
// Delete an invite to a project
