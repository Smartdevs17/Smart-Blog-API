const User = require("../models/User");
const Post = require("../models/Post");
const {ObjectId} = require("mongodb");

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const userThreeId = new ObjectId();

const users = [
    {
        _id: userOneId,
        username: "johndoe",
        email: "johndoe@gmail.com",
        password: "$2b$10$U8DyY2Lw0GA.udbHxb6QzeyM.7k3zRyRpJtU4pm5K2vo0KCdM/yrK"
    },
    {
        _id: userTwoId,
        username: "mariagrey",
        email: "mariagrey@gmail.com",
        password: "$2b$10$U8DyY2Lw0GA.udbHxb6QzeyM.7k3zRyRpJtU4pm5K2vo0KCdM/yrK"
    },
    {
        _id: userThreeId,
        username: "tobisteve",
        email: "tobisteve@gmail.com",
        password: "$2b$10$U8DyY2Lw0GA.udbHxb6QzeyM.7k3zRyRpJtU4pm5K2vo0KCdM/yrK"
    }
];


const posts = [
    {
        _id: new ObjectId(),
        username: userOneId,
        title: "Post One Title",
        desc: "This is post one test title",
    },
    {
        _id: new ObjectId(),
        username: userTwoId,
        title: "Post Two Title",
        desc: "This is post two test title",
    },
    {
        _id: new ObjectId(),
        username: userThreeId,
        title: "Post three Title",
        desc: "This is post three test title",
    }
    ,
    {
        _id: new ObjectId(),
        username: userThreeId,
        title: "Second Post made by user three Title",
        desc: "This is post three test title",
    },
    {
        _id: new ObjectId(),
        username: userThreeId,
        title: "Third post made my user three Title",
        desc: "This is post three test title",
    }
];

const populateUser = (done) => {
    User.deleteMany().then(() => {
        return User.insertMany(users).then(()=> done());
    });
};

const populatePost = (done) => {
    Post.deleteMany().then(() => {
        return Post.insertMany(posts).then(() => done());
    });
};




module.exports = {populateUser,populatePost,users,posts};