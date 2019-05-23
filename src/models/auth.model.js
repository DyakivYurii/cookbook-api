const Joi = require('@hapi/joi');
const { validateElement } = require('../utils');

const authUserSchema = Joi.object()
  .keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()]
  })
  .without('password', 'access_token');

const validateAuthUser = (authUser) => {
  return validateElement(authUser, authUserSchema);
};

module.exports = {
  validateUser
};
