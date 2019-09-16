exports.up = function(knex) {
  return knex.schema.createTable('user_followers', tbl => {
    tbl.increments('id');
    tbl
      .integer('userId')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');

    tbl
      .integer('followerId')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_followers');
};
