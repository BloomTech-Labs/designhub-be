require('dotenv').config();
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

//******************** Routes *******************************/

server.use('/api/v1/users', userRouter);

// ****************** PORT SET UP *************************

const PORT = process.env.PORT || 6969;

server.listen(PORT, () => {
  console.log(`Ayyyyy ${PORT} is up baby!`);
});
