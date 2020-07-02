exports.up = function (knex) {
  return knex.schema.createTable('heatmap', (tbl) => {
    tbl.increments('id');
    tbl
      .text('userId')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
    tbl
      .integer('projectId')
      .unsigned()
      .references('projects.id')
      .onDelete('CASCADE');
    tbl
      .integer('imageId')
      .unsigned()
      .references('photos.id')
      .onDelete('CASCADE');
    tbl.integer('count').defaultTo(1);
    tbl.datetime('date').defaultTo(knex.fn.now());
    tbl.text('contribution');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('heatmap');
};
