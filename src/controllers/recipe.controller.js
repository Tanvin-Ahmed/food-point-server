const {
  saveRecipeInDB,
  getRecipesFromDB,
  getRecipeCountFromDB,
  getRecipeByIdFromDB,
  getRecipesByCategory,
  updateRecipeReaction,
} = require("../services/recipe.service");

const createRecipe = async (req, res) => {
  try {
    const recipeInfo = req.body;
    const recipe = await saveRecipeInDB({
      ...recipeInfo,
      creatorEmail: req.user.email,
    });
    return res.status(201).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: "Error creating recipe" });
  }
};

const getRecipes = async (req, res) => {
  try {
    const { limit, page, country, category, search } = req.query;
    const result = await getRecipesFromDB(
      search,
      country,
      category,
      limit,
      page
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: "Recipe not found!" });
  }
};

const getRecipeCount = async (req, res) => {
  try {
    const { country, category, search } = req.query;
    const result = await getRecipeCountFromDB(search, country, category);

    return res.status(200).json({ count: result });
  } catch (error) {
    return res.status(404).json({ message: "Recipe not found!" });
  }
};

const getRecipeDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getRecipeByIdFromDB(id);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: "Recipe not found!" });
  }
};

const getRecipesOfSimilarCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const idToExclude = req.params.idToExclude;

    const data = await getRecipesByCategory(category, idToExclude);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: "Recipe not found!" });
  }
};

const updateReaction = async (req, res) => {
  try {
    const data = req.body;
    const newRecipe = await updateRecipeReaction(
      data.id,
      data.userId,
      data.action
    );

    return res.status(200).json(newRecipe);
  } catch (error) {
    return res.status(500).json({ message: "Reaction not updated!" });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeCount,
  getRecipeDetails,
  getRecipesOfSimilarCategory,
  updateReaction,
};
