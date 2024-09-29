const Transaction = require("../models/transaction")
const Users  = require("../models/user")

const findBookIssuedToUser = async(userName)=>{
    const response = await Transaction.find({userName})
    console.log((response));
    
    return response
}

const findAllUsers = async()=>{
  const response = await Users.find()
  return response
}


module.exports = {findBookIssuedToUser,findAllUsers}