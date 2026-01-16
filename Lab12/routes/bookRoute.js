const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

router.post('/add', verifyToken, async (req, res) => {
  try {
    const { title, author, totalQuantity, availableQuantity } = req.body;

    const book = await Book.create({
      title,
      author,
      totalQuantity,
      availableQuantity
    });

    res.status(201).json({
      message: "Book added successfully",
      book
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const books = await Book.find();
    res.json({
      message: "Books fetched successfully",
      books
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/update/:id', verifyToken, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      message: "Book updated successfully",
      updatedBook
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      message: "Book deleted successfully",
      deletedBook
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
