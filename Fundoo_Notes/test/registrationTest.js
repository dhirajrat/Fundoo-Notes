const server = require("../server");
const chai = require("chai");
const chaihttp = require("chai-http");
const test = require("./user.json")

chai.should();

chai.use(chaihttp);

describe("Registration tests :", () => {
  it("for given data returned status should (201) after posting data", (done) => {

    const user = test.user.registerAuth;
    chai
      .request(server)
      .post("/register")
      .send(user)
      .end((err, res) => {
        if (err) {
            return "error";
          }
        res.should.have.status(201);
      });
      done();
  });



  it("for given Invalid data returned status should (400) after posting data", (done) => {

    const user = test.user.registerunAuth;
    chai
      .request(server)
      .post("/register")
      .send(user)
      .end((err, res) => {
        if (err) {
            return "error";
          }
        res.should.have.status(400);
      });
      done();
  });

  it("for given Invalid data without firstName returned status should (400) after posting data", (done) => {

    const user = test.user.registerInvalid;
    chai
      .request(server)
      .post("/register")
      .send(user)
      .end((err, res) => {
        if (err) {
            return "error";
          }
        res.should.have.status(400);
      });
      done();
  });

});

