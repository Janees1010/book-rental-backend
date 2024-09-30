const express = require("express")
const app =express()
const booksRoutes = require("./routes/booksRoutes")
const transactionRoutes = require("./routes/transactionRoutes")
const userRoutes = require("./routes/userRoutes")

const DB = require("./DBconfig.js/DbConnection")
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(7000,()=>{
    console.log("server running on 7000");
})
DB()

app.use("/books",booksRoutes)
app.use("/transactions",transactionRoutes)
app.use("/users",userRoutes)

