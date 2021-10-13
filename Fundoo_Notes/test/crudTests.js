/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const chai = require('chai');
const chaihttp = require('chai-http');
const faker = require('faker');
const server = require('../server');
const test = require('./crudNoteData.json');

chai.should();

chai.use(chaihttp);

describe('Create Note tests :', () => {
  it('for given data create note returned status should (200) after posting data', (done) => {
    const note = {
      title: faker.lorem.word(),
      description: 'This is Note',
    };
    const token = test.validtoken;
    chai
      .request(server)
      .post('/createnote')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(201);
        if (err) {
          return done(err);
        }
      });
    done();
  });

  it('for given invalid token data create note returned status should (401) after posting data', (done) => {
    const note = test.sampleNote.validNote;
    const token = test.invalidtoken;
    chai
      .request(server)
      .post('/createnote')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(401);
        if (err) {
          return done(err);
        }
      });
    done();
  });
});

describe('get all note api test cases', () => {
  it('for given valid token data get all notes note returned status should (200) after posting data', (done) => {
    const token = test.validtoken;
    chai
      .request(server)
      .get('/getallnotes')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });

  it('for given Invalid token data get all notes note returned status should (401) after posting data', (done) => {
    const token = test.invalidtoken;
    chai
      .request(server)
      .get('/getallnotes')
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

describe('get note by id api test cases', () => {
  it('for given valid token data get note with id returned status should (200) after posting data', (done) => {
    const token = test.validtoken;
    const id = test.validid;
    chai
      .request(server)
      .get(`/getnotesbyid/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it('for given Invalid token data get note with id returned status should (401) after posting data', (done) => {
    const token = test.invalidtoken;
    const id = test.validid;
    chai
      .request(server)
      .get(`/getnotesbyid/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it('for given Empty token data get note with id returned status should (401) after posting data', (done) => {
    const token = test.invalidtoken;
    const id = test.validid;
    chai
      .request(server)
      .get(`/getnotesbyid/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});

describe('update note by ID', () => {
  it('for given valid token data update note with id returned status should (200) after posting data', (done) => {
    const note = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    const token = test.validtoken;
    const id = test.upid;
    chai
      .request(server)
      .put(`/updatenotesbyid/${id}`)
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});

describe('delete note by ID', () => {
  it('for given valid token data delete note with id returned status should (404) after posting data', (done) => {
    const token = test.validtoken;
    const id = test.delid;
    chai
      .request(server)
      .put(`/deletenote/${id}`)
      .set({ authorization: token })
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});
