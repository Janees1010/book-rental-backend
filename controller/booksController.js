const {
  findAllBooks,
  findBookByName,
  findBookByRange,
  findBooksByCategory,
  filterBooksByData,
  findBooksIssuedInDateRange
} = require("../services/booksServices");

const getAllBooks = async (req, res) => {
  try {
    const Books = await findAllBooks();
    res.send(Books);
  } catch (err) {
    console.log(err);
  }
};

const findBooksByNameHealper = async (req, res) => {
  const { name } = req.query;
  console.log(name);

  try {
    const books = await findBookByName(name);
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const findBookByRangeHelper = async (req, res) => {
  const { minRent, maxRent } = req.query;
  try {
    const books = await findBookByRange(minRent, maxRent);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by rent range" });
  }
};

const findBooksByCategoryHelper = async (req, res) => {
  const { category } = req.query;
  console.log(category);

  try {
    const Books = await findBooksByCategory(category);
    return res.status(200).json(Books);
  } catch (error) {}
};

const filterBooks = async (req, res) => {
  console.log(req.query);

  const { name, minRent, maxRent, category } = req.query;

  try {
    const books = await filterBooksByData(name, minRent, maxRent, category);
    console.log(books);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json("invalid querys use name minRent maxRent category");
  }
};

const getBooksIssuedInDateRange = async(req,res)=>{
  const {startDate,endDate} = req.query;
 try {
   const books = await findBooksIssuedInDateRange(startDate,endDate)
   return res.status(200).json(books)
 }catch (error) {
   return res.status(500).json(error.message)
 }
}

module.exports = {
  getAllBooks,
  findBooksByNameHealper,
  findBookByRangeHelper,
  findBooksByCategoryHelper,
  filterBooks,
  getBooksIssuedInDateRange
};
