exports.up = function (knex) {
  return knex.schema.createTable('followers', (tbl) => {
    tbl.increments('id');
    tbl.string('followingId');
    tbl.string('followerId');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('followers');
};
