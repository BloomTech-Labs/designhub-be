
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_projects').insert([
    {
      userId: 1,
      name: 'My Public Post',
      description: 'Description',
      figma: '',
      invision: '',
      mainImg: ''
    },
    {
      userId: 1,
      name: 'My Other Public Post',
      description: 'Other Description',
      figma: '',
      invision: '',
      mainImg: ''
    }
  ])
};
