/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const chai = require('chai');
const chaihttp = require('chai-http');
const faker = require('faker');
const server = require('../server');
const test = require('./user.json');

chai.should();

chai.use(chaihttp);

describe('Forgot Password tests :', () => {
  it('for given forgot password data returned status should (200) after posting data', (done) => {
    const user = test.user.forgotMail;
    chai
      .request(server)
      .post('/forgetpassword')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        if (err) {
          return done(err);
        }
      });
    done();
  });

  it('for given incorrect email forgot password data returned status should (403) after posting data', (done) => {
    const user = {
      email: faker.internet.email(),
    };
    chai
      .request(server)
      .post('/forgetpassword')
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

describe('Reset Password tests :', () => {
  it('for given Reset password data returned status should (200) after posting data', (done) => {
    const userToken = test.user.resetDataToken;
    const userPass = test.user.resetDataPass;
    chai
      .request(server)
      .post('/resetpassword')
      .set({ authorization: userToken })
      .send(userPass)
      .end((err, res) => {
        res.should.have.status(200);
        if (err) {
          return done(err);
        }
      });
    done();
  });

  it('for given Reset password Invalid data returned status should (401) after posting data', (done) => {
    const userToken = test.user.resetDataTokenInvalid;
    const userPass = test.user.resetDataPass;
    chai
      .request(server)
      .post('/resetpassword')
      .set({ authorization: userToken })
      .send(userPass)
      .end((err, res) => {
        res.should.have.status(401);
        if (err) {
          return done(err);
        }
      });
    done();
  });
});
