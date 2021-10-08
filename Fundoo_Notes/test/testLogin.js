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

describe('login tests:', () => {
  it('for given login credentials return status code should (200) login', (done) => {
    const user = test.user.loginData;
    chai
      .request(server)
      .post('/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        if (err) {
          return done(err);
        }
      });
    done();
  });

  it('for given incorrect login credentials return status code should (403) login', (done) => {
    const user = test.user.incorrectloginData;
    chai
      .request(server)
      .post('/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(403);
        if (err) {
          return done(err);
        }
      });
    done();
  });
});
