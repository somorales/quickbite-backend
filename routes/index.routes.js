const router = require("express").Router();

// ruta user
const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

//ruta receta
const recipeRouter = require("./recipe.routes.js");
router.use("/recipes", recipeRouter);

//ruta favorito
const favoritesRouter = require("./favorites.routes.js");
router.use("/favorites", favoritesRouter);

// ruta basket
const basketRouter = require("./basket.routes.js");
router.use("/basket", basketRouter);

module.exports = router;
