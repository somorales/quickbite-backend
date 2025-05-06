const { Schema, model } = require("mongoose");

const CUISINES = [
  "Chinese",
  "Greek",
  "Indian",
  "Italian",
  "Lebanese",
  "Mexican",
  "Spanish",
];

const DIETARY_STYLES = ["Vegan", "Vegetarian", "Gluten-Free", "Keto", "Paleo"];

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Recipe name is required."],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required."],
    },
    cooking_time_minutes: {
      type: Number,
      required: [true, "Cooking time (in minutes) is required."],
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
      enum: DIETARY_STYLES,
      required: [true, "Dietary style must be defined."],
    },
    cuisine: {
      type: String,
      enum: CUISINES,
      required: [true, "Cuisine must be defined."],
    },
    popularity: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = { Recipe, CUISINES, DIETARY_STYLES };
