const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const secured = (process.env.DB_ENV !== 'testing') ? 
  jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.AUTH0URI}/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUDIENCE_URL,
    issuer: `${process.env.AUTH0URI}/`,
    algorithms: ['RS256']
    }) :
    (req, res, next) => { next() };

module.exports = secured;