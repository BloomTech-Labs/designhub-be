const typeDefs = require('../schema');

const gCall = async ({ source, variableValues }) => {
	return graphql({
		typeDefs,
		source,
		variableValues
	});
};

module.exports = { gCall };
