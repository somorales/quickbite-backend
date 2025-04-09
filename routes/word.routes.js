const express = require("express");
const router = express.Router();
const Word = require("../models/Word.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

//Crear una nueva palabra

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const response = await Word.create({
      word: req.body.word,
      meaning: req.body.meaning,
      translation: req.body.translation,
      sentences: req.body.sentences,
      language: req.body.language,
      userId: req.payload._id,
    });

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// tamaño de una página
const PAGE_SIZE = 3;

//ver todas las palabras
router.get("/", verifyToken, async (req, res, next) => {
  try {
    let filtros;

    if (req.query.word === undefined) {
      filtros = { userId: req.payload._id };
    } else {
      filtros = {
        userId: req.payload._id,
        word: { $regex: req.query.word, $options: "i" },
      };
    }

    if (req.query.cursor) {
      filtros.createdAt = { $lt: new Date(parseInt(req.query.cursor)) };
    }

    const results = await Word.find(filtros)
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE + 1)
      .exec();
    // hay más resultados?
    let hasMore = false;

    if (results.length > PAGE_SIZE) {
      hasMore = true;
    }

    // removemos el elemento extra
    let allWords = results;

    if (hasMore === true) {
      allWords = allWords.slice(0, PAGE_SIZE);
    }

    // definimos el valor del cursor para la siguiente invocación a éste servicio
    let nextCursor = null;

    if (allWords.length > 0 && hasMore) {
      let lastWord = allWords[allWords.length - 1];
      nextCursor = lastWord.createdAt.getTime().toString();
    }

    // determinamos si hay elementos previos
    let hasPrev = false;
    const prevElements = await Word.find({
      ...filtros,
      createdAt: { $gt: allWords[0].createdAt },
    })
      .sort({ createdAt: -1 })
      .limit(PAGE_SIZE + 1)
      .exec();

    let prevCursor = null;

    if (prevElements.length > 0) {
      hasPrev = true;
    }

    if (prevElements.length > PAGE_SIZE) {
      prevCursor = prevElements[0].createdAt.getTime().toString();
    }

    res
      .status(200)
      .json({ allWords, hasMore, nextCursor, hasPrev, prevCursor });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//ver una palabra

router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const word = await Word.findById(req.params.id);
    if (req.payload._id === word.userId.toString()) {
      res.status(200).json(word);
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//eliminar una palabra
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const word = await Word.findById(req.params.id);
    console.log(req.payload._id, word.userId);

    if (!word) {
      res.status(404).json({ message: "word not found" });
    } else if (req.payload._id === word.userId.toString()) {
      await Word.findByIdAndDelete(req.params.id);
      res.status(200).json(word);
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//editar una palabra
router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const updateWord = await Word.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (req.payload._id === updateWord.userId.toString()) {
      res.status(200).json(updateWord);
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
