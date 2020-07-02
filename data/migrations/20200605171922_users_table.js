exports.up = function (knex) {
  return knex.schema.createTable('users', (users) => {
    users.string('id').primary();
    users.string('username').unique();
    users.string('email').unique();
    users.string('firstName');
    users.string('lastName');
    users.string('location');
    users.text('bio');
    users.string('website');
    users.string('avatar');
    users.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
