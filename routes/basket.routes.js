const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id).populate("basket");

    if (user === undefined) {
      res.status(404).send("Not found");
      return;
    }
    res.status(200).json(user.basket);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id);

    const recipeId = req.body.recipeId;

    if (!recipeId) {
      return res.status(400).json({ message: "recipeId es requerido." });
    }

    // Verificar si ya está en favoritos
    const alreadyInBasket = user.basket.some(
      (basketId) => basketId.toString() === recipeId
    );

    if (alreadyInBasket) {
      return res
        .status(200)
        .json({ message: "La receta ya está en tus favoritos." });
    }

    // Agregar si no está
    user.basket.push(recipeId);

    const updateUser = await User.findByIdAndUpdate(
      req.payload._id,
      { basket: user.basket },
      { new: true }
    );

    res.status(200).json(updateUser.basket);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/recipes/:recipeId", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id);

    const recipeIdToRemove = req.params.recipeId;

    const basketFiltered = user.favorites.filter(
      (eachRecipeId) => eachRecipeId.toString() !== recipeIdToRemove
    );

    await User.findByIdAndUpdate(
      req.payload._id,
      { favorites: basketFiltered },
      { new: true }
    );

    res.status(204).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
