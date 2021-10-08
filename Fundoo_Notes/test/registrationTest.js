/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
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
      .post('/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        if (err) {
          return done(err);
        }
      });
    done();
  });

  it('for given Invalid data returned status should (400) after posting data', (done) => {
    const user = test.user.registerunAuth;
    chai
      .request(server)
      .post('/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        if (err) {
          return done(err);
        }
      });
    done();
  });

  it('for given Invalid data without firstName returned status should (400) after posting data', (done) => {
    const user = test.user.registerInvalid;
    chai
      .request(server)
      .post('/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        if (err) {
          return done(err);
        }
      });
    done();
  });
});
