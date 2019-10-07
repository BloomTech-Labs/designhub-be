exports.up = function(knex) {
  return knex.schema.createTable('starred_projects', tbl => {
    tbl.increments('id');
    tbl
      .integer('userId')
      .unsigned()
      .references('users.id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    tbl
      .integer('projectId')
      .unsigned()
      .references('user_projects.id')
      .inTable('user_projects')
      .notNullable()
      .onDelete('CASCADE');
    tbl.integer('count').defaultTo(1);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('starred_projects');
};
