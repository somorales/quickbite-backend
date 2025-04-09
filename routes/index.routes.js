const router = require("express").Router();

// ruta user
const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

//ruta word
const wordRouter = require("./word.routes.js");
router.use("/words", wordRouter);

module.exports = router;
