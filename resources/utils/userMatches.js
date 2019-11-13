const go = require('./crud');

const userMatches = async (token, userId) => {
  const user = await go.getById('users', userId);
  if(user[0] && user[0].auth0Id === token.sub) {
    return true;
  } else return false;
}

module.exports = userMatches;