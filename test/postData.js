const {ObjectId} = require("mongodb");
const users = require("./userData");


const posts = [
    {
        _id: new ObjectId(),
        username: users[0]._id,
        title: "Post One Title",
        desc: "This is post one test title",
    },
    {
        _id: new ObjectId(),
        username: users[0]._id,
        title: "Post Two Title",
        desc: "This is post two test title",
    },
    {
        _id: new ObjectId(),
        username: users[1]._id,
        title: "Post three Title",
        desc: "This is post three test title",
    }
];

module.exports  = posts;