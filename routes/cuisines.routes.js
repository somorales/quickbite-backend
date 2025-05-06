const express = require("express");
const router = express.Router();
const { CUISINES } = require("../models/Recipe.model");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(CUISINES);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
