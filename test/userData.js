const {ObjectId} = require("mongodb")
const users = [
    {
        _id: new ObjectId(),
        username: "johndoe",
        email: "johndoe@gmail.com",
        password: "$2b$10$U8DyY2Lw0GA.udbHxb6QzeyM.7k3zRyRpJtU4pm5K2vo0KCdM/yrK"
    },
    {
        _id: new ObjectId(),
        username: "mariagrey",
        email: "mariagrey@gmail.com",
        password: "$2b$10$U8DyY2Lw0GA.udbHxb6QzeyM.7k3zRyRpJtU4pm5K2vo0KCdM/yrK"
    },
    {
        _id: new ObjectId(),
        username: "tobisteve",
        email: "tobisteve@gmail.com",
        password: "$2b$10$U8DyY2Lw0GA.udbHxb6QzeyM.7k3zRyRpJtU4pm5K2vo0KCdM/yrK"
    }
];

module.exports = users;