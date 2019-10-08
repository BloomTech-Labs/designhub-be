exports.up = function(knex) {
  return knex.schema.createTable('team', tbl => {
    tbl.increments('id');
    tbl.string('avatar');
    tbl.string('name').notNullable();
    tbl.text('description').defaultTo(null);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('team');
};
