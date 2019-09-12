exports.up = function(knex) {
  return knex.schema.createTabe('users', users => {
    users.increments('id');
    users
      .string('auth0Id')
      .unique()
      .notNullable();
    users
      .string('username')
      .unique()
      .notNullable();
    users
      .string('firstName')
      .defaultTo(null)
      .nullable();
    users
      .string('lastName')
      .defaultTo(null)
      .nullable();
    users
      .string('location')
      .defaultTo(null)
      .nullable();
    users
      .text('bio')
      .defaultTo(null)
      .nullable();
    users
      .string('website')
      .defaultTo(null)
      .nullable();
    users
      .string('avatar')
      .defaultTo(null)
      .nullable();
    users.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
