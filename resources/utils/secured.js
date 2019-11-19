require('dotenv').config();
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
    (
      (request, response, next) => {
        console.log('we in here', process.env.DB_ENV)
        //  const secured = jwt({sub: 'asdfadsf?'})
        // request.user = {sub: 'auth0|5d83b8d3d8e1cf0df49647e3'}
        // request.user.sub = 
        next()
      }
    )

module.exports = secured;