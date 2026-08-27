const express = require('express');
const genresRouter = express.Router();
const Genre = require('../models/Genre');

// GET /api/genres - Retorna todos os gêneros
genresRouter.get('/genres', async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/genres/check - Verifica se um gênero existe (case insensitive)
genresRouter.get('/genres/check', async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) return res.status(400).json({ message: 'Nome não fornecido' });
    
    const genre = await Genre.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } });
    if (genre) {
      res.json({ exists: true, genre });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/genres - Cria um novo gênero
genresRouter.post('/genres', async (req, res) => {
  try {
    // Verifica duplicidade antes de salvar
    const existing = await Genre.findOne({ name: { $regex: new RegExp('^' + req.body.name + '$', 'i') } });
    if (existing) {
      return res.status(400).json({ message: 'Gênero já existe', genre: existing });
    }

    const genre = new Genre({ name: req.body.name });
    const newGenre = await genre.save();
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/genres/:id - Atualiza um gênero
genresRouter.put('/genres/:id', async (req, res) => {
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true, runValidators: true });
    if (!updatedGenre) return res.status(404).json({ message: 'Gênero não encontrado' });
    res.json(updatedGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/genres/:id - Remove um gênero
genresRouter.delete('/genres/:id', async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if (!deletedGenre) return res.status(404).json({ message: 'Gênero não encontrado' });
    res.json({ message: 'Gênero deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = genresRouter;
