const express = require("express");
const { isAuthenticated } = require("../token/verification");
const { createRecipe } = require("../controllers/recipe.controller");
const router = express.Router();

router.post("/create", isAuthenticated, createRecipe);

module.exports = router;
