
exports.up = function(knex) {
    return knex.schema.createTable('project_categories', tbl => {
      tbl.increments();  
      tbl.integer('projectId')
      .unsigned()
      .references('user_projects.id')
      .notNullable()
      .onDelete('CASCADE');
      tbl.integer('userId')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');    
      tbl.integer('categoryId')
      .unsigned()
      .references('category_names.id')
      .notNullable();      
    })
  };
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project_categories');
  };

