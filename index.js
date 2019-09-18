require('dotenv').config();
const go = require('./resources/utils/crud');
// sentry imports
const Sentry = require('@sentry/node');
// middleware imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
// router imports
const userRouter = require('./resources/users/userRouter');
const projectRouter = require('./resources/userProjects/userProjectsRouter');
const photoRouter = require('./resources/projectPhoto/photoRouter');
const followersRouter = require('./resources/followers/followersRouter');
const commentsRouter = require('./resources/comments/commentsRouter');
const heatmapRouter = require('./resources/heatmap/heatmapRouter');

// ***************** MIDDLEWARE **************************

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
server.use(helmet());
// ************************ TEST ENDPOINT ************

// server.get('/', async (req, res) => {
//   try {
//     const response = await go.getMany('starred_projects');
//     res.status(200).json({ response });
//   } catch (error) {
//     res.status(400).json({ message: "Couldn't create account", error: error });
//   }
// });

//******************** Routes *******************************/

server.use('/api/v1/users', userRouter);
server.use('/api/v1/projects', projectRouter);
server.use('/api/v1/photo/projects', photoRouter);
server.use('/api/v1/followers', followersRouter);
server.use('/api/v1/comments', commentsRouter);
server.use('/api/v1/heatmap', heatmapRouter);

// ****************** SENTRY *************************

Sentry.init({ dsn: `${process.env.SENTRY_DSN}` });

// ****************** PORT SET UP *************************

const PORT = process.env.PORT || 6969;

server.listen(PORT, () => {
  console.log(`Ayyyyy ${PORT} is up baby!`);
});
