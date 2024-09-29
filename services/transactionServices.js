const Transaction = require("../models/transaction")
const User = require("../models/user")

const addBookIssueTransaction = async(bookName,userName,issueDateString)=>{
 
    const [day, month, year] = issueDateString.split('-');
    const issueDate = new Date(year, month - 1, day); // 
    console.log(issueDate.toString()); 
    console.log(issueDate);
    
    const newTransaction = new Transaction({
      bookName,
      userName,
      issueDate,
      returnDate: null, // Not returned yet
      rent: 0 // Will be calculated on return
    })
  const response = await newTransaction.save()
  console.log(response);
  return response
}
 const findTransactionByBook = async(name)=>{
    const response  = await Transaction.find({bookName:name})
    console.log(response);
    return response;

}
const findTransaction = async(bookName,userName)=>{
    const transaction = await Transaction.findOne({
        bookName,
        userName,
        returnDate: null // Only get transactions that haven't been returned
    });
    return transaction
}
const  findTotalRentByBook = async(bookName)=>{
    
  const response = await Transaction.find({bookName:bookName,returnDate:{$ne:null}})
  
  return response  
}

module.exports = {addBookIssueTransaction,findTransaction,findTransactionByBook, findTotalRentByBook}