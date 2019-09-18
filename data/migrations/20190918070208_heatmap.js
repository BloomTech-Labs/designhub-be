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
      .integer('projectId')
      .unsigned()
      .references('users.id')
      .nullable()
      .onDelete('CASCADE');

    tbl.integer('count').defaultTo(1);
    tbl.date(Date.now());

    tbl.text('contribution').defaultTo(null);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_followers');
};
