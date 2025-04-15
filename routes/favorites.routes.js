const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

router.post("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.payload._id);

    if (req.body.recipeId) {
      user.favorites.recipes.push(req.body.recipeId);
    }

    const updateUser = await User.findByIdAndUpdate(req.payload._id, user, {
      new: true,
    });

    res.status(200).json(updateUser.favorites);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/recipes/:recipeId", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id);

    const favoritesFiltered = user.favorites.recipes.filter(
      (eachRecipeId) => eachRecipeId.toString() !== req.params.recipeId
    );
    user.favorites.recipes = favoritesFiltered;

    const updateUser = await User.findByIdAndUpdate(req.payload._id, user, {
      new: true,
    });

    res.status(204).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
