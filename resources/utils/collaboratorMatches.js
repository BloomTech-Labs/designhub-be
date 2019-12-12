const db = require('../../data/dbConfig');

const collaboratorMatches = async (token, projectId, editOnly) => {
    const [user] = await db('users').where('auth0Id', token.sub);
    const [invite] = await db('project_teams').where('projectId', projectId).andWhere('email', user.email);

    return editOnly ? invite && !invite.pending && invite.write : invite && !invite.pending;
}

module.exports = collaboratorMatches;