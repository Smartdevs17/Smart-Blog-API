const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const express = require("express");

const AddImages  = require("../../controllers/files/files");

router.use("/img",express.static(path.join(__dirname + "../../img")));

const imageStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,multer.join(__dirname + "../../img"));;
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname.toLowerCase());
    }
});

const imageUpload = multer({storage: imageStorage});

router.post("/upload",imageUpload.single("file"),AddImages);



module.exports = router;