const expect = require("expect").expect;
const request = require("supertest");
const {ObjectId} = require("mongodb");
const app = require("../app");
const Post = require("../models/Post");
const User = require("../models/User");

const { populatePost,users,posts } = require("./data");

beforeEach(populatePost);


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
    });
});

describe("GET /api/posts/:id",() => {
    it("should return post with that valid id",(done) => {
        let postId = posts[0]._id.toHexString();

        request(app)
        .get(`/api/posts/${postId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.success).toBe(true)
            expect(res.body.message.username).toBe(posts[0].username.toHexString())
            expect(res.body.message._id).toBe(postId);
        })
        .end(done)
    });

    it("should return 400 with invalid id",(done) => {
        request(app)
        .get("/api/posts/123abc")
        .expect(400)
        .end(done)
    });

    it("should return 404 if post id not found",(done) => {
        let id = new ObjectId();
        request(app)
        .get(`/api/posts/${id}`)
        .expect(404)
        .end(done)
    });
});

describe("Get /api/posts/user/:id",() => {
    it("should get all the user post with that id",(done) => {
        let id = users[2]._id.toHexString();
        request(app)
        .get(`/api/posts/user/${id}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.success).toBe(true)
            expect(res.body.message.length).toEqual(3)
            expect(res.body.message[0].username).toBe(id)
        })
        .end(done)
    });

    it("should return a 404 post not found if the user id is not found",(done) => {
        let id = new ObjectId();
        request(app)
        .get(`/api/posts/user/${id}`)
        .expect(404)
        .end(done)
    });

    it("should return a 400 with a bad user id",(done) => {
        request(app)
        .get("/api/posts/user/123abc")
        .expect(400)
        .end(done)
    });
});

describe("PUT /api/posts/update_post/:id",() => {
    it("should update user post with that id",(done) => {
        let id = posts[1]._id.toHexString();
        let userId = posts[1].username.toHexString();
        let updatedPost = {
            username: userId,
            photo: "ImageofPostTwo"
        }

        request(app)
        .put(`/api/posts/update_post/${id}`)
        .send(updatedPost)
        .expect(201)
        .expect((res) => {
            expect(res.body.success).toBe(true)
            expect(res.body.message.username).toBe(userId)
        })
        .end((err) => {
            if(err) return done(err)

            Post.findById(id).then((post) => {
                expect(post.username).toBe(userId)
                expect(post.photo).toBe(updatedPost.photo)
            }).then((err) => {
                done(err)
            })
            done()
        })
    });
});