const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./src/db/db");
const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const recipeRouter = require("./src/routes/recipe");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/recipe", recipeRouter);

module.exports = app;
