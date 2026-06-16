const express = require('express');
const booksRouter = express.Router();
const Book = require('../models/Book');

// GET /api/books - Retorna todos os livros
booksRouter.get('/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/books/:id - Retorna um livro específico
booksRouter.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/books - Cria um novo livro
booksRouter.post('/books', async (req, res) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/books/:id - Atualiza um livro
booksRouter.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBook) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/books/:id - Remove um livro
booksRouter.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json({ message: 'Livro deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/authors - Retorna lista de autores distintos
booksRouter.get('/authors', async (req, res) => {
  try {
    const authors = await Book.distinct('author');
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/genres - Retorna lista de gêneros distintos
booksRouter.get('/genres', async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = booksRouter;
