const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  publicationYear: {
    type: Number
  },
  coverUrl: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
