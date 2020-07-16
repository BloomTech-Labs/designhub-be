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
  res.send(`
  <body style="display: flex; flex-direction: column; align-items: center;">
    <h1>Server is up and running!</h1>
    <p>The GraphQL API is located at <a href="/graphql">/graphql</a></p>
  </body>
  `);
});

// Creates a new instance of apollo and
// feeds it out gql data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

// wraps our GQL server with our entire
// express app
server.applyMiddleware({ app });

module.exports = app;
