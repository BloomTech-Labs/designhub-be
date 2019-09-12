exports.up = function(knex) {
  return knex.schema.createTable('user_projects', tbl => {
    tbl.increments('id');
    tbl
      .integer('userId')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');

    tbl.boolean('private').defaultTo(false);

    tbl.string('projectName').notNullable();

    users.timestamp('created_at').defaultTo(knex.fn.now());
    users.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_projects');
};
