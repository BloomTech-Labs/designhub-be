exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects')
    .del()
    .then(function () {
      return knex('projects').insert([
        {
          userId: 'auth0|5d83b8d3d8e1cf0df49647e3',
          name: 'My Public Post',
          description: 'Description',
          category: 'Web Design',
          mainImg: 'https://i.imgur.com/EMlwt0i.png',
        },
        {
          userId: 'auth0|5d83b8d3d8e1cf0df49647e3',
          name: 'My Other Public Post',
          description: 'Other Description',
          category: 'Web Design',
          mainImg: 'https://i.imgur.com/jidEDG6.png',
        },
      ]);
    });
};
