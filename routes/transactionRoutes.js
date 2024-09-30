const express = require("express")
const router = express.Router()
const {bookIssue,returnIssuedBook,getBookHistory,getTotalRentGenaratedByBook} = require("../controller/transactionController");



router.post("/issue",bookIssue)
router.post("/return",returnIssuedBook)
router.get("/book-history",getBookHistory)
router.get("/totalrent",getTotalRentGenaratedByBook)

module.exports = router;