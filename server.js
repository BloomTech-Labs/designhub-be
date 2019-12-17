require('dotenv').config();
const go = require('./resources/utils/crud');
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
const starRouter = require('./resources/starredProjects/starRouter');
const searchBarRouter = require('./resources/searchBar/searchBarRouter');
const teamRouter = require('./resources/team/teamRouter');
const teamMemberRouter = require('./resources/teamMember/teamMemberRouter');
const inviteRouter = require('./resources/invite/inviteRouter');
const exploreRouter = require('./resources/explore/exploreRouter');
const projectInvitesRouter = require('./resources/projectInvites/projectInvitesRouter');
const categoriesRouter = require('./resources/categories/categoriesRouter');

// ***************** MIDDLEWARE **************************

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
server.use(helmet());
// ************************ TEST ENDPOINT ************

server.get('/', async (req, res) => {
  res.send('<h1>She works</h1>');
});

//******************** Routes *******************************/

server.use('/api/v1/users', userRouter);
server.use('/api/v1/projects', projectRouter);
server.use('/api/v1/photo/projects', photoRouter);
server.use('/api/v1/followers', followersRouter);
server.use('/api/v1/comments', commentsRouter);
server.use('/api/v1/heatmap', heatmapRouter);
server.use('/api/v1/star', starRouter);
server.use('/api/v1/search', searchBarRouter);
server.use('/api/v1/team', teamRouter);
server.use('/api/v1/teamMember', teamMemberRouter);
server.use('/api/v1/invite', inviteRouter);
server.use('/api/v1/explore', exploreRouter);
server.use('/api/v1/projectInvites', projectInvitesRouter);
server.use('/api/v1/categories', categoriesRouter);

module.exports = server;
