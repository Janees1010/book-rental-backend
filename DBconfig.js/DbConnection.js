const mongoose  = require("mongoose")


async function ConnectDb(){

    try{
       await mongoose.connect(process.env.DB_URL)
       console.log("mongodb connected");
       
    }catch(err){
      console.log(err);
    }  
}

module.exports = ConnectDb;