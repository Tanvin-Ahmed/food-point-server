const { RecipeModel } = require("../models/recipe.model");
const { UserSchema } = require("../models/user.model");
const mongoose = require("mongoose");

const purchaseRecipe = async (buyerId, creatorId, recipeId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Decrease buyer's coins by 10
    await UserSchema.findByIdAndUpdate(
      buyerId,
      { $inc: { coins: -10 } },
      { session }
    );

    // Step 2: Increase creator's coins by 1
    await UserSchema.findByIdAndUpdate(
      creatorId,
      { $inc: { coins: 1 } },
      { session }
    );

    // Step 3: Update recipe's purchase array
    await RecipeModel.findByIdAndUpdate(
      recipeId,
      { $addToSet: { purchasedBy: buyerId } },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    const buyerInfo = await UserSchema.findById(buyerId);
    const recipeInfo = await RecipeModel.findById(recipeId);

    return { buyerInfo, recipeInfo };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = { purchaseRecipe };
