const jwt = require('jsonwebtoken');

const secured = (req, res, next) => {
  if(!req.headers.authorization) {
    res.status(401).json({message: 'Please provide an authorization header to access this resource.'});
  } else {
    const openToken = jwt.decode(req.headers.authorization);

    req.headers.openToken = openToken;
    next();
  }
}

module.exports = secured;