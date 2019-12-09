const db = require('../data/dbConfig');

const collaboratorMatches = async (token, projectId) => {
    const [user] = await db('users').where('auth0Id', token.sub);
    const [invite] = await db('project_teams').where('projectId', projectId).andWhere('email', user.email);
    if (invite && !invite.pending) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = collaboratorMatches;