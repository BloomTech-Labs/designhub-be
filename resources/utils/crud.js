exports.createOne = (table, returning, object) => {
  return db(table)
    .returning(returning.length > 1 ? returning : [returning])
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
