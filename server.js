require('dotenv').config();

// Imports apollo and graphql stuff we need
const { ApolloServer } = require('apollo-server-express');

// middleware imports
const express = require('express');

const app = express();

// ***************** GRAPHQL *********************

const resolvers = require('./resolvers');
const typeDefs = require('./schema');

// ***************** MIDDLEWARE ******************

app.use(express.json());

// ***************** TEST ENDPOINT ***************

app.get('/', async (req, res) => {
  res.send('<h1>She works</h1>');
});

// Creates a new instance of apollo and
// feeds it out gql data
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// wraps our GQL server with our entire
// express app
server.applyMiddleware({ app });

module.exports = app;
