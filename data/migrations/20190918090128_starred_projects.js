exports.up = function(knex) {
  return knex.schema.createTable('starred_projects', tbl => {
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
      .references('user_projects.id')
      .notNullable()
      .onDelete('CASCADE');
    tbl.integer('count').defaultTo(1);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('starred_projects');
};
