const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true,useFindAndModify: false});

const connection = mongoose.connection;
connection.once("error",(error) => console.error(error));
connection.on("open",() => console.log("Connected to DB"));



module.exports = connection;