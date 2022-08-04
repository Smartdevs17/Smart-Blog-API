const expect = require("expect").expect;
const request = require("supertest");
const {ObjectId} = require("mongodb");
const app = require("../app");
const Post = require("../models/Post");
const User = require("../models/User");

const { populatePost,users,posts } = require("./data");



describe("POST /api/posts/create_post",() => {
    it("should create a new post",(done) => {
        let userId = users[2]._id.toHexString();
        let testPost = {
            username: userId,
            title: "This is the test post title that user 3 made",
            desc: "This is the description of the post made by user 3"
        }

        request(app)
        .post("/api/posts/create_post")
        .send(testPost)
        .expect(201)
        .expect((res) => {
            expect(res.body.success).toBe(true);
            expect(res.body.message.title).toBe(testPost.title);
        })
        .end((err,res) => {
            if(err) return done(err);

            Post.findOne({title: testPost.title}).then((mypost) => {
                expect(mypost.title).toBe(testPost.title);
                expect(mypost.username.toHexString()).toBe(testPost.username);
                done()
            }).catch((err)=> {
                done(err)
            })
        });
    });

    it("should return 403 if the user id is not valid",(done) => {
        let testPost = {
            username: "abc123",
            title: "test title",
            desc: "test description"
        }

        request(app)
        .post("/api/posts/create_post")
        .send(testPost)
        .expect(403)
        .end(done)
    });

    it("should return 404 if the user does not exist with that id",(done) => {
        let id = new ObjectId().toHexString();
        let testPost = {
            username: id,
            title: "test title",
            desc: "test Description"
        }
        
        request(app)
        .post("/api/posts/create_post")
        .send(testPost)
        .expect(404)
        .end(done)
    })
});