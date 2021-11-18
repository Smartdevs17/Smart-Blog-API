// Require All Npm Packages such as express and other file modules from routes
const express = require("express");
const connection = require("./db/config");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute =  require("./routes/categories");
const multer = require("multer");

// Add all Middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json());


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"images");
    },
    filename: (req,file,cb) => {
        cb(null,"my_pic.jpg");
    }
});

const upload = multer({storage: storage});

app.post("/api/upload",upload.single("file"),(req,res) => {
    res.status(201).json({
        message: "New file has just being uploaded"
    })
});

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);





module.exports = app; 