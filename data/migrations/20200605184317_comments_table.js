exports.up = function (knex) {
  return knex.schema.createTable('comments', (tbl) => {
    tbl.increments('id');
    tbl.string('userId');
    tbl.string('projectId');
    tbl.text('text');
    tbl.datetime('created_at').defaultTo(knex.fn.now());
    tbl.datetime('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments');
};
