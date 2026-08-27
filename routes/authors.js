const express = require('express');
const authorsRouter = express.Router();
const Author = require('../models/Author');

// GET /api/authors - Retorna todos os autores
authorsRouter.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/authors/check - Verifica se um autor existe (case insensitive)
authorsRouter.get('/authors/check', async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) return res.status(400).json({ message: 'Nome não fornecido' });
    
    const author = await Author.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } });
    if (author) {
      res.json({ exists: true, author });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/authors - Cria um novo autor
authorsRouter.post('/authors', async (req, res) => {
  try {
    // Verifica duplicidade antes de salvar
    const existing = await Author.findOne({ name: { $regex: new RegExp('^' + req.body.name + '$', 'i') } });
    if (existing) {
      return res.status(400).json({ message: 'Autor já existe', author: existing });
    }

    const author = new Author({ name: req.body.name });
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/authors/:id - Atualiza um autor
authorsRouter.put('/authors/:id', async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true, runValidators: true });
    if (!updatedAuthor) return res.status(404).json({ message: 'Autor não encontrado' });
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/authors/:id - Remove um autor
authorsRouter.delete('/authors/:id', async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: 'Autor não encontrado' });
    res.json({ message: 'Autor deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = authorsRouter;
