exports.up = function(knex) {
  return knex.schema.createTable('invite', tbl => {
    tbl.increments('id');
    tbl
      .integer('activeUserId')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');

    tbl
      .integer('invitedUserId')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');

    tbl
      .integer('starredProjectsId')
      .unsigned()
      .references('starred_projects.id')
      .onDelete('CASCADE');

    tbl
      .integer('commentsId')
      .unsigned()
      .references('comments.id')
      .onDelete('CASCADE');

    tbl
      .integer('imageId')
      .unsigned()
      .references('project_photos.id')
      .onDelete('CASCADE');

    tbl.string('activeUserAvatar').notNullable();

    tbl.string('mainImgUrl');

    tbl.text('commentText');

    tbl
      .string('activeUsername')
      .notNullable()
      .references('users.name')
      .onDelete('CASCADE');

    tbl
      .integer('teamId')
      .unsigned()
      .references('team.id')
      .onDelete('CASCADE');
    tbl
      .integer('followersId')
      .references('user_followers.id')
      .onDelete('CASCADE');

    tbl.string('type');

    tbl.text('message');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('invite');
};
