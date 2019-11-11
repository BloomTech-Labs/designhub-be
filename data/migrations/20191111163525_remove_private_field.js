exports.up = function(knex) {
    return knex.schema.table('user_projects', tbl => {       
      tbl.dropColumn('private');
      
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('user_projects', tbl => {
        tbl.boolean('private').defaultTo(false);
    });
  };