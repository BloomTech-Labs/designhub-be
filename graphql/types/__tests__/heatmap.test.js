// const { graphql } = require('graphql');
// const typeDefs = require('../schema');
// const {
//   makeExecutableSchema,
//   addMockFunctionsToSchema,
// } = require('graphql-tools');

// const testHeatmapQuery = {
//   id: 'test heatmap string',
//   variables: { id: '1' },
//   context: {},
//   query: `
//         query heatmapget($id: ID!){
//                 heatmapget(id: $id){
//                     count
//                 }
//             }
//     `,
//   expected: {
//     data: {
//       heatmapget: [
//         {
//           count: 1,
//         },
//         {
//           count: 1,
//         },
//       ],
//     },
//   },
// };

// describe('heatmapSchema', () => {
//   // it('gets all heatmap', async () => {
//   const mockSchema = makeExecutableSchema({
//     typeDefs,
//   });

//   const cases = [testHeatmapQuery];
//   addMockFunctionsToSchema({
//     schema: mockSchema,
//     mocks: {
//       Boolean: () => false,
//       ID: () => '1',
//       Int: () => 1,
//       Float: () => 5.5,
//       Array: () => [],
//       String: () => 'Hello World',
//     },
//   });

//   cases.forEach((obj) => {
//     const { id, variables, ctx, query, expected } = obj;
//     test(`query: ${id}`, async () => {
//       return await expect(
//         graphql(mockSchema, query, null, { ctx }, variables)
//       ).resolves.toEqual(expected);
//     });
//   });
// });
