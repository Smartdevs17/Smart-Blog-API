const {ObjectId} = require("mongodb");
const expect = require("expect").expect;
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const {users} = require("./data");



describe("GET /api/users/:id",() => {
    it("should return the user that has that id",(done) => {
        let user = users[0]._id.toHexString();
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

describe("DELETE /api/users/delete/id",()=> {
    it("should delete a user",(done) => {
        let id = users[1]._id.toHexString();
        let user = {
            userId: id
        }
        request(app)
        .delete(`/api/users/delete/${id}`)
        .send(user)
        .expect(200)
        .expect((res) => {
            expect(res.body.success).toBe(true);

        })
        .end((err,res) => {
            if(err) return done(err);
            User.findById(id).then((user) => {
                expect(user).toBeNull();
                done();
            }).catch((err) => done(err))
        });
    });

    it("should return 403 if user credentials not valid",(done) => {
        let id = users[1]._id.toHexString();
        let user = {
            userId: new ObjectId().toHexString()
        }

        request(app)
        .delete(`/api/users/delete/${id}`)
        .send(user)
        .expect(403)
        .end(done)
    })
});






