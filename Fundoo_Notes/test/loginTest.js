const server = require("../server");
const chai = require("chai");
const chaihttp = require("chai-http");
const test = require("./user.json")

chai.should();

chai.use(chaihttp);

describe("login tests:", () => {
    it ("for given login credentials return status code should (200) login", (done) => {
        const user = test.user.loginData;
    chai
      .request(server)
      .post("/login")
      .send(user)
      .end((err, res) => {
        if (err) {
            return "error";
          }
        res.should.have.status(200);
      });
      done();
    });

    it ("for given incorrect login credentials return status code should (403) login", (done) => {
      const user = test.user.incorrectloginData;
  chai
    .request(server)
    .post("/login")
    .send(user)
    .end((err, res) => {
      if (err) {
          return "error";
        }
      res.should.have.status(403);
    });
    done();
  })
})