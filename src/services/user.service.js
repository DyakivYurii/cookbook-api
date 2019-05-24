const db = require('../db');

/**
 * Get list of users from DB
 *
 * @returns {Promise}
 */
const getUsers = () => {
  return db.select('*').from('users');
};

/**
 * Get specific user from DB using ID of user
 *
 * @param {String|Number} id - id of user
 * @returns {Promise}
 */
const getUserById = (id) => {
  console.log(id);
  return db
    .select('*')
    .from('users')
    .where('id', '=', id);
};

/**
 * Updating user info
 *
 * @param {Number} id - user ID
 * @param {Object} updateInfo - info about user for updating
 * @return {Promise}
 */
const updateUser = (id, updateInfo) => {
  return db('users')
    .returning('*')
    .where('id', '=', id)
    .update({ ...updateInfo });
};

/**
 * Using for deliting user
 *
 * @param {Number} id - user id
 * @returns {Promise}
 */
const deleteUser = (id) => {
  return db('users')
    .returning('*')
    .where('id', '=', id)
    .del();
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
