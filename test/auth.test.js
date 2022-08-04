const expect = require("expect").expect;
const request = require("supertest");
const bcrypt = require("bcrypt")
const app = require("../app");
const User = require("../models/User");
const Post = require("../models/Post");
const {ObjectId} = require("mongodb");

const { populateUser,populatePost,users } = require("./data");



beforeEach(populateUser);
beforeEach(populatePost);


describe("POST /api/auth/register",() => {
    it("should create a new user",(done) => {
        let newUser = {
            _id: new ObjectId(),
            username: "testuser1",
            email: "testuser1@gmail.com",
            password: "testpassword",
        }
        request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(201)
        .expect((res) => {
            expect(res.body.success).toBe(true);
            expect(res.body.message.username).toBe(newUser.username)
        })
        .end((err,res) => {
            if(err) return done(err);
            User.findOne({username: newUser.username}).then((user) => {
                expect(user.username).toBe(newUser.username);
                expect(user.email).toBe(newUser.email);
                expect(user.password).not.toBe(newUser.password)
                done();
            }).catch((err) => {
                done(err)
            })
        })
    });

    it("should return 400 as bad request if user already exist with username",(done) => {
        let newUser = {
            _id: new ObjectId(),
            username: "johndoe",
            email: "johndoe@gmail.com",
            password: "testpassword",
        }
        request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(400)
        .end(done)
    });
});

describe("POST /api/auth/login",()=> {
    it("should login user with the right credentials",(done) => {
        let user = {
            username: "johndoe",
            password: "testpassword"
        };
        request(app)
        .post("/api/auth/login")
        .send(user)
        .expect(200)
        .expect((res) => {
            expect(res.body.success).toBe(true);
            expect(res.body.message.username).toBe(users[0].username);
        })
        .end(done)
    });

    it("should return 403 if user has the wrong credentials",(done) => {
        let user = {
            username: "johndoe",
            password: "testpassword1"
        };
        request(app)
        .post("/api/auth/login")
        .send(user)
        .expect(403)
        .end(done)
    });


});