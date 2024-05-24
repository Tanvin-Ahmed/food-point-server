const mongoose = require("mongoose");
const { config } = require("../config/config");

(async () => {
  try {
    if (!config.db_uri) return console.log("Error: db_uri is required");
    await mongoose.connect(config.db_uri);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to db");
  }
})();
