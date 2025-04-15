const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

//ver todas las recetas

router.get("/", async (req, res, next) => {
  try {
    let { maxTime, dietary_style, cuisine, search } = req.query;

    let filter = {};

    // Cooking time: máximo tiempo de cocción

    if (!isNaN(parseInt(maxTime))) {
      filter.cooking_time = { $lte: parseInt(maxTime) };
    }
    // Dietary style (si no viene vacío)
    if (dietary_style && dietary_style !== "All") {
      filter.dietary_style = dietary_style;
    }

    // Cuisine (si no viene vacío)
    if (cuisine && cuisine !== "All") {
      filter.cuisine = cuisine;
    }

    // Búsqueda por nombre (case-insensitive)
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const allRecipe = await Recipe.find(filter);

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
