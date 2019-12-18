
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('category_names').del()
    .then(function () {
      // Inserts seed entries
      return knex('category_names').insert([
        {category: 'Animation'},
        {category: 'Branding'},
        {category: 'Illustration'},
        {category: 'Mobile'},
        {category: 'Typography'},
        {category: 'Web Design'},
        {category: 'Product Design'}
      ]);
    });
};
