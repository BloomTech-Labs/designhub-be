exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('photos')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {
          url: 'www.testing.com',
          projectId: '1',
          title: 'Testing is this thing on?',
          description: 'Hello there',
        },
        {
          url: 'www.testingthis.com',
          projectId: '2',
          title: 'Testing is this thing on?',
          description: 'Hello there',
        },
      ]);
    });
};
