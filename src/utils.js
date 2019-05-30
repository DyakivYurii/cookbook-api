const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Validate fields that we got in request body
 *
 * @param {Object} validatingElement - object that we whant to validate
 * @param {Object} schema - schema with rules for validation
 */
const validateElement = (validatingElement, schema) => {
  const resultOfValidation = Joi.validate(validatingElement, schema);
  return resultOfValidation;
};

/**
 * Createing a new JSON token for user
 *
 * @param {Object} userInfo - info about user
 * @param {Number} userInfo.id
 * @param {String} userInfo.email
 *
 * @return {String}
 */
const createToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      email: user.email
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '1d'
    }
  );
};

/**
 * Hased a passoword for saving in Database
 *
 * @param {String} password - user password for hashing
 * @return {String}
 */
const hashingPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

/**
 * Compare gotten password with hashed password from database
 *
 * @param {String} currentPassword - current password from body
 * @param {String} hashedPassword - hashed password from database
 * @return {Boolean}
 */
const checkPassword = async (currentPassword, hashedPassword) => {
  return await bcrypt.compare(currentPassword, hashedPassword);
};

const responseWithDatabaseError = (res) => {
  return res.status(400).json({ status: 400, message: 'Db error' });
};

module.exports = {
  validateElement,
  createToken,
  hashingPassword,
  checkPassword,
  responseWithDatabaseError
};
