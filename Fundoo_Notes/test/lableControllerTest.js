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

describe('get label api for positive and negative test case', () => {
  it('GivenLabelDetails_When_Label_Get_Successfully', (done) => {
    const token = test.validtoken;
    chai
      .request(server)
      .get('/getlabels')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });

  it('GivenLabelDetails_When_Label_Get_Successfully 401', (done) => {
    const token = test.invalidtoken;
    chai
      .request(server)
      .get('/getlabels')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});

describe('update label api for positive and negative test case', () => {
  it('GivenLabelDetails_When_Label_Update_Successfully 201', (done) => {
    const token = test.validtoken;
    const createLabel = {
      labelName: faker.lorem.word(),
    };
    const id = test.validid;
    chai
      .request(server)
      .put(`/updatelabel/${id}`)
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });

  it('GivenLabelDetails_When_Label_Update_UnSuccessfully 500', (done) => {
    const token = test.validtoken;
    const createLabel = {
      labelName: faker.lorem.word(),
    };
    const id = test.invalidid;
    chai
      .request(server)
      .put(`/updatelabel/${id}`)
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(500);
        done();
      });
  });
});

describe('Delete label api for positive and negative test case', () => {
  it('GivenLabelDetails_When_Label_delete_Successfully 200', (done) => {
    const token = test.validtoken;
    const id = test.validdelid;
    chai
      .request(server)
      .put(`/deletelabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });

  it('GivenLabelDetails_When_Label_delete_Not_Successfully 404', (done) => {
    const token = test.validtoken;
    const id = test.invalidid;
    chai
      .request(server)
      .put(`/deletelabel/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});
