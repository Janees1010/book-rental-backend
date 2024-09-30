const Books = require("../models/books")
const Transactions = require("../models/transaction")

const findAllBooks = async()=>{
    const response  = await Books.find()
    return response
}

const findBookByName = async(name)=>{
    const books = await Books.find({ bookName: new RegExp(name, 'i') });
    return books;
}

const findBookByRange = async(minRent,maxRent)=>{
    const books = await Books.find({
        rentPerDay: { $gte: minRent, $lte: maxRent }
      });
      return books
}

const findBooksByCategory = async(category)=>{
    const books = await Books.find({category:new RegExp(category,'i')});
    return books;
}

const filterBooksByData = async(name,minRent,maxRent,category)=>{
    
   const books = await Books.find({
    category:new RegExp(category,"i"),
    bookName:{$regex:name,$options:'i'},
    rentPerDay:{$gte: minRent, $lte: maxRent}
   }) 
   return books
}

const findBooksIssuedInDateRange = async(startDate,endDate)=>{
    let [startDay, startMonth, startYear] = startDate.split('-');
    const start =  new Date(startYear, startMonth - 1, startDay);

    let [endDay, endMonth, endYear] = endDate.split('-');
    const end =  new Date(endYear, endMonth - 1, endDay);

    const response  = await Transactions.find({issueDate:{$gte:start},returnDate:{$lte:end}}) 
    return response
}


module.exports = {findAllBooks,findBookByName,findBookByRange,findBooksByCategory,filterBooksByData,findBooksIssuedInDateRange}