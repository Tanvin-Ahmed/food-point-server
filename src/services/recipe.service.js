const { RecipeModel } = require("../models/recipe.model");

const saveRecipeInDB = async (data) => {
  return await RecipeModel.create(data);
};

const getRecipeCountFromDB = async (search, country, category) => {
  let query = RecipeModel.find().countDocuments();

  // Apply filters based on user input
  if (search) {
    query = query.where("title", new RegExp(search, "i"));
  }
  if (country) {
    query = query.where("country", country);
  }
  if (category) {
    query = query.where("category", category);
  }

  return await query.exec();
};

const getRecipesFromDB = async (search, country, category, limit, page) => {
  const offset = Number(page) * Number(limit);
  let query = RecipeModel.find()
    .sort({ _id: -1 })
    .limit(Number(limit))
    .skip(offset)
    .select("_id title image country creatorEmail purchasedBy");

  // Apply filters based on user input
  if (search) {
    query = query.where("title", new RegExp(search, "i"));
  }
  if (country) {
    query = query.where("country", country);
  }
  if (category) {
    query = query.where("category", category);
  }

  return await query.exec();
};

const getRecipeByIdFromDB = async (id) => {
  return await RecipeModel.findById(id);
};

const getRecipesByCategory = async (category, idToExclude) => {
  return await RecipeModel.aggregate([
    { $match: { _id: { $ne: idToExclude } } },
    { $match: { category } },
    { $sample: { size: 3 } },
  ]);
};

const updateRecipeReaction = async (id, userId, action) => {
  if (action === "like") {
    return RecipeModel.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          reaction: userId,
        },
      },
      { new: true }
    );
  } else if (action === "dislike") {
    return RecipeModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          reaction: userId,
        },
      },
      { new: true }
    );
  }
};

module.exports = {
  saveRecipeInDB,
  getRecipesFromDB,
  getRecipeByIdFromDB,
  getRecipesByCategory,
  getRecipeCountFromDB,
  updateRecipeReaction,
};
