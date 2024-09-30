const express = require("express")
const router = express.Router()
const {getBookIssuedToUser,getAllUsers} = require("../controller/userController")

router.get("/",getAllUsers)
router.get("/books",getBookIssuedToUser)

module.exports = router;