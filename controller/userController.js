const {findBookIssuedToUser,findAllUsers} = require("../services/userServices")

const getBookIssuedToUser = async(req,res)=>{
    console.log(req.query);
    
    const {userName} = req.query;
  try {
    const books = await findBookIssuedToUser(userName)
    return  res.status(200).json(books)
  }catch (error) {
     return res.status(500).json(error.message) 
  }
}

const getAllUsers = async(req,res)=>{
  try {
    const users = await findAllUsers()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = {getBookIssuedToUser,getAllUsers}  