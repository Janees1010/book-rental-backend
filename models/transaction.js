const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
  bookName: { type: String, ref: 'Book', required: true }, // Reference to the book
  userName: { type:String, ref: 'User', required: true }, // Reference to the user
  issueDate: { type: Date, required: true }, // Date the book was issued
  returnDate: { type:Date }, // Date the book was returned (can be null if not returned)
  rent: { type: Number, default: 0 } // Rent calculated based on issue and return dates
});

// Create the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
