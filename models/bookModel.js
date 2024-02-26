const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: String,
  title: String,
  authors: [String],
  publisher: String,
  averageRating: String,
  description: String,
  pageCount: Number,
  image: String
});

// Ensure unique books based on title and authors
bookSchema.index({ title: 1, authors: 1}, { unique: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
