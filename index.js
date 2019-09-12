require('dotenv').config();
const go = require('./resources/utils/crud');
// middleware imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./data/dbConfig');
const server = express();
// router imports
const userRouter = require('./resources/users/userRouter');

// ***************** MIDDLEWARE **************************

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
server.use(helmet());
// ************************ TEST ENDPOINT ************

server.post('/', async (req, res) => {
  try {
    const response = await go.createOne('users', 'id', req.body);
    res
      .status(201)
      .json({ message: 'Account successfully created!', response });
  } catch (error) {
    res.status(400).json({ message: "Couldn't create account", error: error });
  }
});

//******************** Routes *******************************/

server.use('/api/v1/users', userRouter);

// ****************** PORT SET UP *************************

const PORT = process.env.PORT || 6969;

server.listen(PORT, () => {
  console.log(`Ayyyyy ${PORT} is up baby!`);
});
