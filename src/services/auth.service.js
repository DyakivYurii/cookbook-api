const db = require('../db');

/**
 * @param {Object} userInfo - Information about
 * @param {String} userInfo.name - user name
 * @param {String} userInfo.email - user email
 * @param {String} userInfo.password - user password
 * @return {Promise}
 */
const createUser = ({ name, email, password }) => {
  return db
    .returning('*')
    .insert({ name, email, password })
    .into('users');
};

/**
 * Get specific user from DB using E-mail of user
 *
 * @param {String} email - e-mail of user
 * @returns {Promise}
 */
const getUserByEmail = (email) => {
  return db
    .select('*')
    .from('users')
    .where('email', '=', email);
};

module.exports = {
  createUser,
  getUserByEmail
};
