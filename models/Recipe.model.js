const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Recipe name is required."],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image URL is required."],
  },
  cooking_time: {
    type: String,
    required: [true, "Cooking time is required."],
  },
  ingredients: {
    type: [String],
    required: [true, "Ingredients are required."],
  },
  preparation: {
    type: String,
    required: [true, "Preparation steps are required."],
  },
  dietary_style: {
    type: String,
    enum: ["Vegan", "Vegetarian", "Gluten-Free", "Keto", "Paleo", "None"],
    default: "None",
  },
  cuisine: {
    type: String,
    enum: [
      "Chinese",
      "Greek",
      "Indiam",
      "Italiam",
      "Lebanese",
      "Mexican",
      "Spanish",
      "None",
    ],
    default: "None",
  },
  popularity: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
