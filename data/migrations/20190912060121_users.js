exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments('id');
    users
      .string('auth0Id')
      .unique()
      .notNullable();
    users.string('username').unique();
    users.string('email');
    users.string('phoneNumber');
    users.string('firstName');
    users.string('lastName');
    users.string('location');
    users.text('bio');
    users.string('website');
    users.string('avatar');
    users.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
