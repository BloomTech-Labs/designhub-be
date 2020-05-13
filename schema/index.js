const { gql } = require('apollo-server-express');
const queryTypes = require('./Query');
const mutationTypes = require('./Mutation');
const tableTypes = require('./Tables');
const inputTypes = require('./Inputs');

const typeDefs = gql`
  ${queryTypes}
  ${mutationTypes}
  ${tableTypes}
  ${inputTypes}
`;
module.exports = typeDefs;
