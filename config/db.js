const mongoose = require("mongoose");
const colors = require("colors");
//function mongodb database connection
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB ${mongoose.connection.host}`.bgGreen.white.bold);
    }
    catch(error){
        console.log("DB Error", error, colors.red.bold);
    }
}

module.exports = connectDB;