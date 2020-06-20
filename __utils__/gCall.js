const { graphql } = require('graphql');

const typeDefs = require('../schema/index');

let schema;

const gCall = async ({ source, variableValues }) => {
  if (!schema) {
    schema = typeDefs;
  }
  // console.log('SCHEMA', schema);
  return graphql({
    schema,
    source,
    variableValues,
  });
};

module.exports = gCall;
