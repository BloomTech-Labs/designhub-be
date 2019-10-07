exports.up = function(knex) {
  return knex.schema.createTable('team_member', tbl => {
    tbl.increments('id');
    tbl
      .integer('userId')
      .unsigned()
      .references('users.id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    tbl
      .integer('teamId')
      .unsigned()
      .references('team.id')
      .inTable('team')
      .notNullable()
      .onDelete('CASCADE');
    tbl.integer('role').defaultTo(0);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('team_member');
};
