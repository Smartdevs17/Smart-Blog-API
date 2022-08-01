const {ObjectId} = require("mongodb");
const expect = require("expect").expect;
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const users = require("./data");



describe("GET /api/users/:id",() => {
    it("should return the user that has that id",(done) => {
        let user = users[0]._id.toHexString();
        console.log(user)
        request(app)
        .get(`/api/users/${user}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.success).toBe(true);
            expect(res.body.message.username).toBe(users[0].username);
        })
        .end(done)
    });
});

describe("PUT /api/users/update/:id",() => {
    it("should update a user",(done) => {
        let id = users[1]._id.toHexString();
        let updateUser = {
            userId: id,
            profilePic: "mariagreyPicture"
        }

        request(app)
        .put(`/api/users/update/${id}`)
        .send(updateUser)
        .expect(200)
        .expect((res) => {
            expect(res.body.success).toBe(true);
            expect(res.body.message.profilePic).toBe(updateUser.profilePic);
        })
        .end(done)
    });

    it("should return 403 if credentials does not match",(done) => {
        let id = users[2]._id.toHexString();
        let userId = new ObjectId().toHexString();
        let updateUser = {
            userId: userId,
            email: "user3@tmail.com"
        }
        request(app)
        .put(`/api/users/update/${id}`)
        .send(updateUser)
        .expect(403)
        .end(done)
    })
});






