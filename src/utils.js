const Joi = require('@hapi/joi');

const validateElement = (validatingElement, schema) => {
  const resultOfValidation = Joi.validate(validatingElement, schema);
  return resultOfValidation;
};

module.exports = {
  validateElement
};
