const db = require('../database/dbConfig');

module.exports = {
  add,
  findById,
  findBy,
  find,
  findByDept
};

async function add(user) {
  try {
    const [id] = await db('users').insert(user, 'id');

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db('users').where({ id }).first();
}

function findBy(filter) {
  return db('users').where(filter).orderBy('id');
}

function find() {
  return db('users').select('id', 'username', 'department').orderBy('id');
}

function findByDept(department) {
  return db('users')
    .select('id', 'username', 'department')
    .where(department)
    .orderBy('id');
}
