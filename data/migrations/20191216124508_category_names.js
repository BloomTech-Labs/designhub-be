
exports.up = function(knex) {
    return knex.schema.createTable('category_names', tbl => {
      tbl.increments();      
      tbl.string('category', 64) 
      .unique()    
      .notNullable();      
    })
  };
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('category_names');
  };
