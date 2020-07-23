exports.up = function (knex) {
  return knex.schema.createTable('projects', (tbl) => {
    tbl.increments('id');
    tbl.string('userId');
    tbl.boolean('private').defaultTo(false);
    tbl.string('name').notNullable();
    tbl.text('description');
    tbl.text('category');
    tbl.string('figma');
    tbl.string('invision');
    tbl.string('mainImg');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('projects');
};
