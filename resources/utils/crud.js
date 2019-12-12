const db = require('../../data/dbConfig');

exports.createOne = (table, returning, object) => {
  return db(table)
    .returning(returning)
    .insert(object);
};

exports.getMany = (table, ...columns) => {
  return db(table).select(columns ? columns : '*');
};

exports.getById = (table, id, ...columns) => {
  return db(table)
    .select(columns ? columns : '*')
    .where('id', id);
};

exports.getByUserId = (table, id, ...columns) => {
  return db(table)
    .select(columns ? columns : '*')
    .where('userId', id);
};

exports.getUserByEmail = (email, ...columns) => {
  return db('users')
  .select(columns ? columns : '*')
  .where('email', email);
}

exports.getByUsername = (table, username, ...columns) => {
  return db(table)
    .select(columns ? columns : '*')
    .where('username', username);
};

exports.getByRawWhere = (table, whereQuery, whereBindingArray, ...columns) => {
  return db(table)
    .select(columns ? columns : '*')
    .whereRaw(whereQuery, whereBindingArray);
};

exports.updateById = (table, object, id) => {
  return db(table)
    .update(object)
    .where('id', id);
};

exports.updateByRawWhere = (table, object, whereQuery, whereBindingArray) => {
  return db(table)
    .update(object)
    .whereRaw(whereQuery, whereBindingArray);
};

exports.destroyById = (table, id) => {
  return db(table)
    .del()
    .where('id', id);
};
