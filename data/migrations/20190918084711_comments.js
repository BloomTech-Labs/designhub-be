exports.up = function(knex) {
  return knex.schema.createTable('comments', tbl => {
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
      .nullable()
      .onDelete('CASCADE');

    tbl
      .string('username')
      .notNullable()
      .references('users.username')
      .onDelete('CASCADE');
    tbl
      .integer('imageId')
      .unsigned()
      .references('project_photos.id')
      .nullable()
      .onDelete('CASCADE');
    tbl.string('top').nullable();
    tbl.string('left').nullable();

    tbl.text('text').notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments');
};
