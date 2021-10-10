const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('../server');
const test = require('./user.json');

chai.should();

chai.use(chaihttp);

describe('Registration tests :', () => {
  it('for given data returned status should (201) after posting data', (done) => {
    const user = test.user.registerAuth;
    chai
      .request(server)
      .post('/forgetpassword')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        if (err) {
          return done(err);
        }
      });
    done();
  });
});