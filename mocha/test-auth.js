/**
 * 
 * @Author chenxiangyu
 */

var should = require("should");
var app = require("../server");
var request = require("supertest").agent(app.listen());
var databaseHelper = require("./middlewares/database");
var authHelper = require("./middlewares/authenticator");

var URLS = {
  auth: "/auth",
  signOut: "/signout",
  signUp: "/signup",
};

describe("Auth", function() {
    describe("Salt", function() {
        it("should generate salt", co.wrap(function * () {
            var salt = yield bcrypt.genSalt(ROUNDS);
            should.exist(salt);
            salt.length.should.be.above(0);
            salt.should.match(new RegExp("\\$.{2}\\$" + ROUNDS + "\\$.{22}"));
        }));
        
        it("should throw on bad round", co.wrap(function * () {
            try {
                yield bcrypt.genSalt("b");
                should.fail("should have thrown an error");
            } catch(err) {
                should.exist(err);
            }
        }));
    });

    describe("Hash", function() {
        it("should hash password", co.wrap(function * () {
            var hash = yield bcrypt.hash(PASSWORD, SALT);
            should.exist(hash);
            hash.length.should.be.above(0);
            hash.should.equal(HASH);
        }));

        it("should throw on bad salt", co.wrap(function * () {
            try {
                yield bcrypt.hash(PASSWORD, "BAD_SALT");
                should.fail("should have thrown an error");
            } catch(err) {
                should.exist(err);
            }
        }));
    });

    describe("Match", function() {
        it("should match passwords", co.wrap(function * () {
            var match = yield bcrypt.compare(PASSWORD, HASH);
            match.should.be.true;
        }));

        it("should not match passwords", co.wrap(function * () {
            var match = yield bcrypt.compare(PASSWORD + "ERROR", HASH);
            match.should.be.false;
        }));
    });
});
