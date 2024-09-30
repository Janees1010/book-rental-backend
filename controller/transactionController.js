const {
  addBookIssueTransaction,
  findTransaction,
  findTransactionByBook,
  findTotalRentByBook,
} = require("../services/transactionServices");
const { findBookByName } = require("../services/booksServices");

const bookIssue = async (req, res) => {

  let { bookName, userName, issueDate } = req.body;

  try {
    if (!bookName || !userName || !issueDate)
      return res.status(500).json("provide bookName userId issueDate");

    const book = await findBookByName(bookName);
    const transactionExistCheck = await findTransactionByBook(bookName)
    

    if( transactionExistCheck[transactionExistCheck.length-1].returnDate === null && transactionExistCheck[transactionExistCheck.length-1].userName === userName){
        return res.status(500).json("book already issued to you please return or try to issue  anothor books")
    }
   

    if (!book.length) {
      return res
        .status(500)
        .json("enter a valid bookname check /books for getting listed books");
    }

    const transaction = await addBookIssueTransaction(
      bookName,
      userName,
      issueDate
    );
    res.status(200).json({ transaction, message: "issued successfully" });
  } catch (err) {

    res.status(500).json("somethin went wrong");
  }
};

const returnIssuedBook = async (req, res) => {
  try {
    const { bookName, userName, returnDate } = req.body;

    // Ensure returnDate is in the correct format
    if(!bookName || !userName || !returnDate){
        return res.status(500).json("please provide userName bookName returnDate")
    }

    const [day, month, year] = returnDate.split("-").map(Number);
    const returnDateObj = new Date(Date.UTC(year, month - 1, day)); // Month is 0-indexed

    // Find the ongoing transaction for the user and book
    const transaction = await findTransaction(bookName, userName);


    if (!transaction) {
      return res
        .status(404)
        .json({
          message: "No ongoing transaction found for this book and user",
        });
    }

    const issueDate = new Date(transaction.issueDate);
    // Check for invalid return date
    if (returnDateObj < issueDate) {
      return res
        .status(400)
        .json({ message: "Return date cannot be earlier than issue date" });
    }

    // Calculate days rented
    const daysRented = Math.ceil(
      (returnDateObj - issueDate) / (1000 * 60 * 60 * 24)
    );
    console.log("Days Rented:", daysRented); // Debugging log

    // Find the rent per day for the book
    const book = await findBookByName(bookName);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Ensure rentPerDay is a valid number
    const rentPerDay = book[0].rentPerDay;


    // Calculate total rent
    const totalRent = daysRented * rentPerDay;
    console.log("Total Rent:", totalRent); // Debugging log

    // Update the transaction with the return date and calculated rent
    transaction.returnDate = returnDateObj;
    transaction.rent = totalRent;

    await transaction.save();

    res.json({
      message: "Book returned successfully",
      book,
      daysRented,
      rent: totalRent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error returning the book", error: error.message });
  }
};

const getBookHistory = async (req, res) => {

  const { bookName } = req.query;

  try {
    const transactions = await findTransactionByBook(bookName);
    const issuedUsers = transactions.map((t) => t.userName);
    const currentlyIssued = transactions.find((t) => !t.returnDate);
    const numberOfIssuedUsers = issuedUsers.length;

    res.status(200).json({
      issuedUsers,
      numberOfIssuedUsers,
      currentlyIssued: currentlyIssued
        ? currentlyIssued.userName
        : "Not issued currently",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getTotalRentGenaratedByBook = async (req, res) => {
  const { bookName } = req.query;

  try {
    const response = await findTotalRentByBook(bookName);
    let sum = 0;
    response.forEach((book) => (sum += book.rent));

    return res.status(200).json({ totalRentGenaretedBytheBook: sum });
  } catch (error) {}
};

module.exports = {
  bookIssue,
  returnIssuedBook,
  getBookHistory,
  getTotalRentGenaratedByBook,
};
