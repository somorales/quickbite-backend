const express = require("express");
const router = express.Router();
const { DIETARY_STYLES } = require("../models/Recipe.model");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(DIETARY_STYLES);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
