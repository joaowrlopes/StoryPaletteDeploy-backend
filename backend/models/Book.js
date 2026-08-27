const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  genre: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true
  }],
  description: {
    type: String,
    trim: true
  },
  publicationYear: {
    type: Number
  },
  coverUrl: {
    type: String
  },
  review: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  cryRating: {
    type: Number,
    min: 1,
    max: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
