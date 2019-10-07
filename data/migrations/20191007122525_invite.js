exports.up = function(knex) {
  return knex.schema.createTable('invite', tbl => {
    tbl.increments('id');
    tbl
      .integer('activeUserId')
      .unsigned()
      .references('users.id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');

    tbl
      .integer('invitedUserId')
      .unsigned()
      .references('users.id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');

    tbl
      .integer('teamId')
      .references('team.id')
      .inTable('team')
      .onDelete('CASCADE');
    tbl
      .integer('followersId')
      .references('user_followers.id')
      .inTable('user_followers')
      .onDelete('CASCADE');
    tbl.text('message');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('invite');
};
