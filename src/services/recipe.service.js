const { RecipeModel } = require("../models/recipe.model");
const mongoose = require("mongoose");

const saveRecipeInDB = async (data) => {
  return await RecipeModel.create(data);
};

const getRecipesFromDB = async (limit, page) => {
  const offset = Number(page) * Number(limit);
  return await RecipeModel.find().sort({ _id: -1 }).limit(limit).skip(offset);
};

const getRecipeByIdFromDB = async (id) => {
  return await RecipeModel.findById(id);
};

const getRecipesByCategory = async (category) => {
  return await Item.aggregate([
    { $match: { category } },
    { $sample: { size: 5 } },
  ]);
};

module.exports = {
  saveRecipeInDB,
  getRecipesFromDB,
  getRecipeByIdFromDB,
  getRecipesByCategory,
};
