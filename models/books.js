const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true }, // Name of the book
  category: { type: String, required: true }, // Genre or category of the book
  rentPerDay: { type: Number, required: true, min: 0 }, // Rent price per day
  createdAt: { type: Date, default: Date.now } // Timestamp when the book was added
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
