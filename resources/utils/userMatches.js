const go = require('./crud');

const userMatches =
  process.env.DB_ENV === 'testing'
    ? () => true
    : async (token, userId) => {
        const user = await go.getById('users', userId);
        console.log(
          '~~~~usermatches log. token: ',
          token.sub,
          'USERID: ',
          user[0].auth0Id
        );
        if (user[0] && user[0].auth0Id === token.sub) {
          return true;
        } else return false;
      };

module.exports = userMatches;
