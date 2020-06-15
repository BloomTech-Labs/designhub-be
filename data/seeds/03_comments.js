exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          text: 'This is a comment',
          userId: 'google-oauth2|115383560506192673006',
          projectId: '1',
        },
        {
          text: 'This is another comment',
          userId: 'google-oauth2|115383560506192673006',
          projectId: '2',
        },
      ]);
    });
};
