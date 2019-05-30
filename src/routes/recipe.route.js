const router = require('express').Router();
const RecipeController = require('../controllers/recipe.controller');

// /api/recipes/
router.route('/').get((req, res) => {
  RecipeController.getRecipes(req, res);
});

router.route('/recipe/:id').get((req, res) => {
  RecipeController.getRecipe(req, res);
});

router
  .route('/me')
  .post((req, res) => {
    RecipeController.createRecipe(req, res);
  })
  .get((req, res) => {
    RecipeController.getMyRecipes(req, res);
  });

router
  .route('/me/:id')
  .get((req, res) => {
    RecipeController.getMyRecipe(req, res);
  })
  .put((req, res) => {
    RecipeController.updateRecipe(req, res);
  })
  .delete((req, res) => {
    RecipeController.deleteRecipe(req, res);
  });

module.exports = router;
