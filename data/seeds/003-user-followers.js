exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_followers')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user_followers').insert([
        {
          followingId: 1,
          followedId: 2,
          created_at: '2019-09-19T17:20:31.355Z'
        },
        {
          followingId: 1,
          followedId: 3,
          created_at: '2019-09-19T17:20:31.355Z'
        },
        {
          followingId: 1,
          followedId: 4,
          created_at: '2019-09-19T17:20:31.355Z'
        },
        {
          followingId: 1,
          followedId: 5,
          created_at: '2019-09-19T17:20:31.355Z'
        },
        {
          followingId: 1,
          followedId: 6,
          created_at: '2019-09-19T17:20:31.355Z'
        },
        {
          followingId: 6,
          followedId: 1,
          created_at: '2019-09-19T17:20:31.355Z'
        },
        {
          followingId: 4,
          followedId: 1,
          created_at: '2019-09-19T17:20:31.355Z'
        }
      ]);
    });
};
