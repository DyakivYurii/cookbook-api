// This file contains model of user, what fields we should have
// with which types we should have them
// also can contain a vidation of this type
const Joi = require('@hapi/joi');

const userSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  access_token: [Joi.string(), Joi.number()]
}).without('password', 'access_token');