exports.up = function (knex) {
  return knex.schema.createTable('photos', (tbl) => {
    tbl.increments('id');
    tbl.string('projectId');
    tbl.string('description');
    tbl.string('title');
    tbl.text('url');
    tbl.datetime('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('photos');
};
