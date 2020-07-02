exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('followers')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('followers').insert([
        {
          followerId: 'auth0|5d83b8d3d8e1cf0df49647e3',
          followingId: 'auth0|5dc999e4d958d80e7bb7b597',
        },
      ]);
    });
};
