const Joi = require('@hapi/joi');
const { validateElement } = require('../utils');

const signInUserSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required()
});

const signUpUserSchema = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required()
});

const validateSingInUser = (userSignIn) => {
  return validateElement(userSignIn, signInUserSchema);
};

const validateSingUpUser = (userSignUp) => {
  return validateElement(userSignUp, signUpUserSchema);
};

module.exports = {
  validateSingInUser,
  validateSingUpUser
};
