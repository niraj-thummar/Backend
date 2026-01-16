const express = require('express');
const router = express.Router();
const Librarian = require('../models/Librarian');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (librarianId) => {
  return jwt.sign(
    { id: librarianId },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingLibrarian = await Librarian.findOne({ email });
    if (existingLibrarian) {
      return res.status(400).json({ message: "Librarian already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const librarian = await Librarian.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    res.status(201).json({
      message: "Librarian registered successfully",
      librarian
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const librarian = await Librarian.findOne({ email });
    if (!librarian) {
      return res.status(404).json({ message: "Librarian not found" });
    }

    const isMatch = await bcrypt.compare(password, librarian.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(librarian._id);

    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/', async (req, res) => {
  try {
    const librarians = await Librarian.find().select('-password');
    res.json(librarians);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const librarian = await Librarian.findById(req.params.id).select('-password');

    if (!librarian) {
      return res.status(404).json({ message: "Librarian not found" });
    }

    res.json(librarian);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const updatedLibrarian = await Librarian.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');

    if (!updatedLibrarian) {
      return res.status(404).json({ message: "Librarian not found" });
    }

    res.json({
      message: "Librarian updated successfully",
      updatedLibrarian
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedLibrarian = await Librarian.findByIdAndDelete(req.params.id);

    if (!deletedLibrarian) {
      return res.status(404).json({ message: "Librarian not found" });
    }

    res.json({
      message: "Librarian deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
