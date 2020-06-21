exports.up = function (knex) {
  return knex.schema.createTable('comments', (tbl) => {
    tbl.increments('id');
    tbl.string('userId');
    tbl.string('username');
    tbl.string('projectId');
    tbl.text('text');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments');
};
