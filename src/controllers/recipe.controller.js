const RecipeService = require('../services/recipe.service');
const RecipeModel = require('../models/recipe.model');
const { responseWithDatabaseError } = require('../utils');

const getRecipes = (req, res) => {
  RecipeService.getRecipes()
    .then((recipes) => {
      if (recipes.length) {
        return res
          .status(200)
          .json({ status: 200, data: recipes, message: 'Recipes recived' });
      }
    })
    .catch((error) => {
      return responseWithDatabaseError(res);
    });
};

const getRecipe = async (req, res) => {
  const recipe = await RecipeService.getRecipeById(parseInt(req.params.id))
    .then((resipeResponse) => {
      if (resipeResponse.length) {
        // return res
        //   .status(200)
        //   .json({ status: 200, data: resipe, message: 'Recipe recived' });
        return resipeResponse[0];
      }
    })
    .catch((error) => {
      return responseWithDatabaseError(res);
    });

  const recipesHistory = await RecipeService.getRecipeChanges(recipe.id)
    .then((response) => response)
    .catch((error) => {
      return responseWithDatabaseError(res);
    });

  return res.status(200).json({
    status: 200,
    data: [{ recipe, history: recipesHistory }],
    message: 'Recipe recived'
  });
};

const getMyRecipes = (req, res) => {
  RecipeService.getMyRecipes(req.user._id)
    .then((response) => {
      if (response.length) {
        return res
          .status(200)
          .json({ status: 200, data: response, message: 'Recipes recived' });
      } else {
        return res.status(200).json({
          status: 200,
          data: null,
          message: 'Not exist recipes in database'
        });
      }
    })
    .catch((error) => {
      return responseWithDatabaseError(res);
    });
};

const getMyRecipe = async (req, res) => {
  const recipe = await RecipeService.getMyRecipeById(
    parseInt(req.user._id),
    parseInt(req.params.id)
  )
    .then((response) => {
      if (response) {
        return response[0];
        // return res
        //   .status(200)
        //   .json({ status: 200, data: response, message: 'Got my recipe' });
      } else {
        return req
          .status(404)
          .json({ status: 404, data: null, message: 'Not exist data' });
      }
    })
    .catch((error) => {
      return responseWithDatabaseError(res);
    });

  const recipesHistory = await RecipeService.getRecipeChanges(recipe.id)
    .then((response) => response)
    .catch((error) => {
      return responseWithDatabaseError(res);
    });

  return res.status(200).json({
    status: 200,
    data: [{ recipe, history: recipesHistory }],
    message: 'Recipe recived'
  });
};

const createRecipe = (req, res) => {
  const recipeInfo = {
    ...req.body,
    author_id: req.user._id,
    date_creation: new Date()
  };

  const { error } = RecipeModel.validateCreatingRecipe(recipeInfo);
  if (error) {
    return res
      .status(400)
      .send({ status: 400, message: 'Error with validitaion' });
  }

  RecipeService.createRecipe(recipeInfo)
    .then((response) => {
      if (response.length) {
        return res
          .status(200)
          .json({ status: 200, data: response, message: 'Recipe created' });
      } else {
        return responseWithDatabaseError(res);
      }
    })
    .catch((error) => {
      return responseWithDatabaseError(res);
    });
};

const updateRecipe = async (req, res) => {
  const recipeInfo = {
    ...req.body,
    date_creation: new Date()
  };

  const { error } = RecipeModel.validateUpdatingRecipe(recipeInfo);
  if (error) {
    return res
      .status(400)
      .send({ status: 400, message: 'Error with validitaion' });
  }

  const recipeExistInDB = await RecipeService.getMyRecipeById(
    parseInt(req.user._id),
    parseInt(req.params.id)
  )
    .then((response) => {
      if (response.length) {
        return response[0];
      } else {
        return res
          .status(400)
          .json({ status: 400, message: 'We do not have this recipe' });
      }
    })
    .catch((error) => {
      return responseWithDatabaseError(res);
    });

  if (
    'title' in recipeInfo &&
    'text' in recipeInfo &&
    recipeExistInDB.title === recipeInfo.title &&
    recipeExistInDB.text === recipeInfo.text
  ) {
    return res.status(400).json({ status: 400, message: 'Not changed' });
  } else if (
    'title' in recipeInfo &&
    recipeExistInDB.title === recipeInfo.title
  ) {
    return res.status(400).json({ status: 400, message: 'Not changed' });
  } else if ('text' in recipeInfo && recipeExistInDB.text === recipeInfo.text) {
    return res.status(400).json({ status: 400, message: 'Not changed' });
  }

  const newRecipe = { ...recipeExistInDB, ...recipeInfo };

  await RecipeService.updateRecipe(req.user._id, newRecipe.id, newRecipe)
    .then((response) => {
      if (!response.length) {
        return res
          .status(400)
          .json({ status: 400, message: 'Problem with updating' });
      }
    })
    .catch((error) => {
      return responseWithDatabaseError(res);
    });

  const changes = {
    title: recipeExistInDB.title,
    text: recipeExistInDB.text,
    date_creation: recipeExistInDB.date_creation,
    recipe_id: recipeExistInDB.id
  };

  await RecipeService.saveRecipeChanges(changes)
    .then((response) => {
      return res.status(200).json({ status: 200, message: 'Recipe changed' });
    })
    .catch((error) => {
      return responseWithDatabaseError(res);
    });
};

const deleteRecipe = async (req, res) => {
  await RecipeService.getMyRecipeById(
    parseInt(req.user._id),
    parseInt(req.params.id)
  )
    .then((response) => {
      if (response.length) {
        return response[0];
      } else {
        return res
          .status(400)
          .json({ status: 400, message: 'We do not have this recipe' });
      }
    })
    .catch((error) => {
      return responseWithDatabaseError(res);
    });

  await RecipeService.deleteRecipeChanges(parseInt(req.params.id)).catch(
    (error) => {
      return responseWithDatabaseError(res);
    }
  );

  await RecipeService.deleteRecipe(
    parseInt(req.user._id),
    parseInt(req.params.id)
  )
    .then(() => {
      return res.status(200).json({ status: 200, message: 'Deleted recipe' });
    })
    .catch((error) => {
      return responseWithDatabaseError(res);
    });
};

module.exports = {
  getRecipes,
  getRecipe,
  getMyRecipes,
  getMyRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
