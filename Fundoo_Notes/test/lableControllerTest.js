/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const chai = require('chai');
const chaihttp = require('chai-http');
const faker = require('faker');
const server = require('../server');
const test = require('./lableData.json');

chai.should();

chai.use(chaihttp);

describe('create label api for positive and negative test case', () => {
  it('GivenLabelDetails_When_Label_Created_Successfully', (done) => {
    const token = test.validtoken;
    const createLabel = {
      labelName: faker.lorem.word(),
    };
    chai
      .request(server)
      .post('/createlabel')
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });

  it('GivenLabelDetails_When_Label_Name_Empty', (done) => {
    const token = test.validtoken;
    const createLabel = {
      labelName: ' ',
    };
    chai
      .request(server)
      .post('/createlabel')
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
});
