const express = require("express");
const router = express.Router();
const { Recipe } = require("../models/Recipe.model");
const { verifyToken } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

//ver todas las recetas

router.get("/", async (req, res, next) => {
  try {
    let { cooking_time, dietary_style, cuisine, name, sort_by } = req.query;

    let filter = {};

    // Cooking time: máximo tiempo de cocción

    if (!isNaN(parseInt(cooking_time))) {
      filter.cooking_time_minutes = { $lte: parseInt(cooking_time) };
    }
    // Dietary style (si no viene vacío)
    if (dietary_style) {
      filter.dietary_style = dietary_style;
    }

    // Cuisine (si no viene vacío)
    if (cuisine) {
      filter.cuisine = cuisine;
    }

    // Búsqueda por nombre (case-insensitive)
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    let allRecipe = [];
    if (sort_by && sort_by === "popularity") {
      allRecipe = await Recipe.find(filter).sort({ popularity: -1 });
    } else {
      allRecipe = await Recipe.find(filter);
    }

    res.status(200).json(allRecipe);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
