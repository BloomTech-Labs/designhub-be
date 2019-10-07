const moment = require('moment');

exports.up = function(knex) {
  return knex.schema.createTable('heatmap', tbl => {
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
      .onDelete('CASCADE');
    tbl
      .integer('imageId')
      .unsigned()
      .references('project_photos.id')
      .inTable('project_photos')
      .onDelete('CASCADE');
    tbl.integer('count').defaultTo(1);
    tbl.string('date').defaultTo(moment(new Date()).format('YYYY-MM-DD'));
    tbl.text('contribution');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('heatmap');
};
