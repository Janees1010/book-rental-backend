const express = require("express")
const {getAllBooks,findBooksByNameHealper,findBookByRangeHelper,findBooksByCategoryHelper,filterBooks,getBooksIssuedInDateRange} = require("../controller/booksController")

const router = express.Router()

router.get("/",getAllBooks)
router.get("/bookname",findBooksByNameHealper)
router.get("/rentrage",findBookByRangeHelper)
router.get('/category',findBooksByCategoryHelper)
router.get("/filter",filterBooks)
router.get("/issued",getBooksIssuedInDateRange)


module.exports = router;