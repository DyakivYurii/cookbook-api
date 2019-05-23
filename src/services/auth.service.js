const jwt = require('jsonwebtoken');

/**
 * Createing a new JSON token for user
 *
 * @param {Object} userInfo - info about user
 * @param {String} userInfo.name
 * @param {String} userInfo.email
 *
 * @return {String}
 */
const createToken = (user) => {
  return jwt.sign(
    {
      name: user.name,
      email: user.email
    },
    'secret',
    {
      expiresIn: '1d'
    }
  );
};

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

module.exports = {
  createToken,
  createUser
};
