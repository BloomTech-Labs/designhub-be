exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          auth0Id: '1sub',
          username: null,
          email: null,
          phoneNumber: null,
          firstName: null,
          lastName: null,
          location: null,
          bio: null,
          email: null,
          website: null,
          avatar: null,
          created_at: '2019-09-17T10:27:12.209Z'
        }
      ]);
    });
};
