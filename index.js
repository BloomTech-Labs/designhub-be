require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./data/dbConfig');
const server = express();

// ******************* MIDDLEWARE **************************

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
server.use(helmet());

//******* TEST ROUTE */

server.get('/api/users', (req, res) => {
  db.select('*')
    .from('users')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Could not get all users from the DB' });
    });
});

// ************************ PORT SET UP *************************

const PORT = process.env.PORT || 6969;

server.listen(PORT, () => {
  console.log(`Ayyyyy ${PORT} is up baby!`);
});
