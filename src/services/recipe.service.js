const db = require('../db');

/**
 * Get list of recipes from Database
 * Sorted by created time
 *
 * @returns {Promise}
 */
const getRecipes = () => {
  return db
    .select('*')
    .from('recipes')
    .orderBy('date_creation', 'desc');
};

/**
 * Get one recipe using id
 *
 * @param {Number} id - id of recipe
 * @returns {Promise}
 */
const getRecipeById = (id) => {
  return db
    .select('*')
    .from('recipes')
    .where('id', '=', id);
};

/**
 * Get my recipes
 *
 * @param {Number} userId - id of user
 * @returns {Promise} <Promise>
 */
const getMyRecipes = (userId) => {
  return db
    .select('*')
    .from('recipes')
    .where('author_id', '=', userId)
    .orderBy('date_creation', 'desc');
};

/**
 * Get one my recipe
 *
 * @param {Number} userId - user id
 * @param {Number} recipeId - recipe id
 * @returns {Promise} <Promise>
 */
const getMyRecipeById = (userId, recipeId) => {
  return db
    .select('*')
    .from('recipes')
    .where('id', '=', recipeId)
    .andWhere('author_id', '=', userId);
};

/**
 * Created recipe
 *
 * @param {Object} recipeInfo - iformatiion about new recipe
 * @returns {Promise}
 */
const createRecipe = (recipeInfo) => {
  return db
    .returning('*')
    .insert(recipeInfo)
    .into('recipes');
};

const updateRecipe = (userId, recipeId, updatedInfo) => {
  return db('recipes')
    .returning('*')
    .where('id', '=', recipeId)
    .andWhere('author_id', '=', userId)
    .update({ ...updatedInfo });
};

const saveRecipeChanges = (recipeInfo) => {
  return db
    .returning('*')
    .insert(recipeInfo)
    .into('recipe_changes');
};

/**
 * Return all recipe changes
 *
 * @param {Number} id - recipe id
 * @returns {Promis} - <Promise>
 */
const getRecipeChanges = (id) => {
  return db
    .select('*')
    .from('recipe_changes')
    .where('recipe_id', '=', id)
    .orderBy('date_creation', 'desc');
};

const deleteRecipe = (userId, recipeId) => {
  return db('recipes')
    .where('id', '=', recipeId)
    .andWhere('author_id', '=', userId)
    .del();
};

const deleteRecipeChanges = (recipeId) => {
  return db('recipe_changes')
    .returning('*')
    .where('recipe_id', recipeId)
    .del();
};

module.exports = {
  getRecipes,
  getRecipeById,
  getMyRecipes,
  getMyRecipeById,
  createRecipe,
  updateRecipe,
  saveRecipeChanges,
  getRecipeChanges,
  deleteRecipe,
  deleteRecipeChanges
};
