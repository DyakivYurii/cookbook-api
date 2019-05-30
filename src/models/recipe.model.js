const Joi = require('@hapi/joi');
const { validateElement } = require('../utils');

const recipeCreatingSchema = Joi.object().keys({
  title: Joi.string()
    .min(5)
    .max(100)
    .required(),
  text: Joi.string()
    .min(5)
    .max(3000)
    .required(),
  date_creation: Joi.date().required(),
  author_id: Joi.number().required()
});

const recipeUpdatingSchema = Joi.object().keys({
  title: Joi.string().min(5),
  text: Joi.string(),
  date_creation: Joi.date().required()
});

const validateCreatingRecipe = (recipe) => {
  return validateElement(recipe, recipeCreatingSchema);
};
const validateUpdatingRecipe = (recipe) => {
  return validateElement(recipe, recipeUpdatingSchema);
};

module.exports = {
  validateCreatingRecipe,
  validateUpdatingRecipe
};
