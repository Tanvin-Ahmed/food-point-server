const express = require("express");
const { isAuthenticated } = require("../token/verification");
const {
  createRecipe,
  getRecipes,
  getRecipeCount,
  getRecipeDetails,
  getRecipesOfSimilarCategory,
  updateReaction,
} = require("../controllers/recipe.controller");
const router = express.Router();

router.post("/create", isAuthenticated, createRecipe);
router.get("/get-recipes", getRecipes);
router.get("/get-recipe-count", getRecipeCount);
router.get("/details/:id", isAuthenticated, getRecipeDetails);
router.get(
  "/recipes-by-category/:category/:idToExclude",
  getRecipesOfSimilarCategory
);

router.put("/reaction", isAuthenticated, updateReaction);

module.exports = router;
