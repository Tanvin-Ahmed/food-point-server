const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    purchasedBy: {
      type: [mongoose.Schema.ObjectId],
      default: [],
      ref: "User",
    },
    creatorEmail: {
      type: String,
      required: true,
    },
    reaction: {
      type: [mongoose.Schema.ObjectId],
      default: [],
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  this.video = "https://www.youtube.com/embed/" + this.video;
  next();
});

module.exports.RecipeModel = mongoose.model("Recipe", schema);
