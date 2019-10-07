exports.up = function(knex) {
  return knex.schema.createTable('project_photos', tbl => {
    tbl.increments('id');
    tbl
      .integer('projectId')
      .unsigned()
      .references('user_projects.id')
      .notNullable()
      .onDelete('CASCADE');
    tbl
      .string('url')
      .unique()
      .notNullable();
    tbl.text('description');
    tbl.text('title');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('project_photos');
};
