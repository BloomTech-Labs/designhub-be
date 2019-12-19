
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('category_names').del()
    .then(function () {
      // Inserts seed entries
      return knex('category_names').insert([
        {category: 'Illustration'},
        {category: 'Web Design'},
        {category: 'Graphic Design'},
        {category: 'UX Design'},
        {category: 'UI Design'},
        {category: 'Motion Design'},
        {category: 'Animation'},    
        {category: 'Product Design'}
      ]);
    });
};
