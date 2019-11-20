exports.up = function(knex) {
    return knex.schema.createTable('project_teams', tbl => {
      tbl.increments();
      tbl.integer('project_id')
      .unsigned()
      .references('user_projects.id')
      .notNullable()
      .onDelete('CASCADE');
      // In the controller, we set if the user with the provided email exists
      tbl.integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE');
      tbl.string('email', 64)
      .unsigned()
      .notNullable();
      tbl.boolean('pending')
      .defaultTo(true);
      tbl.boolean('write')
      .defaultTo(false)
      .notNullable();
    })
  };
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project_teams');
  };
