const { saveRecipeInDB } = require("../services/recipe.service");

const createRecipe = async (req, res) => {
  try {
    const recipeInfo = req.body;
    const recipe = await saveRecipeInDB({
      ...recipeInfo,
      creatorEmail: req.user.email,
    });
    return res.status(201).json(recipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating recipe" });
  }
};

module.exports = { createRecipe };
