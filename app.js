// Require All Npm Packages such as express and other file modules from routes
const env = process.env.NODE_ENV || "development";
// console.log(env);

if(env === "test"){
    process.env.PORT = 3000;
    process.env.MONGO_URL = "mongodb://localhost:27017/smartBlogDBTest"
}else{
    process.env.PORT = 5000;
    process.env.MONGO_URL = "mongodb://localhost:27017/smartBlogDB"
}

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connection = require("./db/config");
const app = express();


const imageRoute = require("./routes/files/files");
const authRoute = require("./routes/auth/auth");
const userRoute = require("./routes/user/user");
const postRoute = require("./routes/post/post");
const commentRoute = require("./routes/comment/comment");
// const multer = require("multer");

// Add all Middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(morgan("common"));
app.use(cors());


app.use("/api",imageRoute);
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoute);





const port = process.env.PORT;
app.listen(port,() => 
    console.log(`Server has started on port ${port}`)
    );


module.exports = app;