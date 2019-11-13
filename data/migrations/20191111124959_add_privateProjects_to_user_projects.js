
exports.up = function(knex) {
    return knex.schema.table('user_projects', tbl => {       
      tbl.boolean('privateProjects').defaultTo(false);
      
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('user_projects', tbl => {
        tbl.dropColumn('privateProjects')
    });
  };

