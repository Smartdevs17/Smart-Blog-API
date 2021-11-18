const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/smartBlogDB",
                    {useNewUrlParser: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once("error",(error) => console.error());
connection.on("open",() => console.log("Connected to DB"));



module.exports = connection