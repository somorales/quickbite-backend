const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id).populate("favorites");

    if (user === undefined) {
      res.status(404).send("Not found");
      return;
    }
    res.status(200).json(user.favorites);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id);

    if (req.body.recipeId) {
      user.favorites.push(req.body.recipeId);
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

    const favoritesFiltered = user.favorites.filter(
      (eachRecipeId) => eachRecipeId.toString() !== req.params.recipeId
    );
    user.favorites = favoritesFiltered;

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
