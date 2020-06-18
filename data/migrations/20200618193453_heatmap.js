const moment = require('moment');
exports.up = function (knex) {
  return knex.schema.createTable('heatmap', (tbl) => {
    tbl.increments('id');
    tbl
      .integer('id')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
    tbl.integer('id').unsigned().references('projects.id').onDelete('CASCADE');
    tbl.integer('id').unsigned().references('photos.id').onDelete('CASCADE');
    tbl.integer('count').defaultTo(1);
    tbl.string('date');
    tbl.text('contribution');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('heatmap');
};
