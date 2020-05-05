require('dotenv').config();
const go = require('./resources/utils/crud');
const { ApolloServer, gql } = require('apollo-server-express');
// middleware imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
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
const userResearchRouter = require('./resources/userResearch/userResearchRouter');
const categoriesRouter = require('./resources/categories/categoriesRouter');

const db = require('./data/dbConfig');

// ***************** MIDDLEWARE **************************

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());
// ************************ TEST ENDPOINT ************

app.get('/', async (req, res) => {
  res.send('<h1>She works</h1>');
});

//******************** Routes *******************************/

app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/photo/projects', photoRouter);
app.use('/api/v1/followers', followersRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/heatmap', heatmapRouter);
app.use('/api/v1/star', starRouter);
app.use('/api/v1/search', searchBarRouter);
app.use('/api/v1/team', teamRouter);
app.use('/api/v1/teamMember', teamMemberRouter);
app.use('/api/v1/invite', inviteRouter);
app.use('/api/v1/explore', exploreRouter);
app.use('/api/v1/projectInvites', projectInvitesRouter);
app.use('/api/v1/research', userResearchRouter);
app.use('/api/v1/categories', categoriesRouter);

const typeDefs = gql`
  input FullGreetInput {
    firstName: String!
    lastName: String!
  }

  type Query {
    hello: String!
    greet(name: String!): String!
    fullGreet(data: FullGreetInput!): String!
  }
`;

const resolvers = {
  Query: {
    hello() {
      return 'Hello, world!';
    },
    greet(parent, args, ctx) {
      return `Hello, ${args.name}!`;
    },
    fullGreet(_, { data }) {
      return `Hello, ${data.firstName} ${data.lastName}! 💖`;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

module.exports = app;
