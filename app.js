// Require All Npm Packages such as express and other file modules from routes
require("dotenv").config();
const express = require("express");
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



app.use("/api",imageRoute);
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoute);
// app.use("/api/categories",categoryRoute);





const port = process.env.PORT || 5000;
app.listen(port,() => 
    console.log(`Server has started on port ${port}`)
    );