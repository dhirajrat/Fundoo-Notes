/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const chai = require('chai');
const chaihttp = require('chai-http');
const faker = require('faker');
const server = require('../server');
const test = require('./noteData.json');

chai.should();

chai.use(chaihttp);

describe('Create Note tests :', () => {
  it.only('for given data create note returned status should (200) after posting data', (done) => {
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

  it.only('for given invalid token data create note returned status should (401) after posting data', (done) => {
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
  it.only('for given valid token data get all notes note returned status should (200) after posting data', (done) => {
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

  it.only('for given Invalid token data get all notes note returned status should (401) after posting data', (done) => {
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
  it.only('for given valid token data get note with id returned status should (200) after posting data', (done) => {
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
  it.only('for given Invalid token data get note with id returned status should (401) after posting data', (done) => {
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
  it.only('for given Empty token data get note with id returned status should (401) after posting data', (done) => {
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
  it.only('for given valid token data delete note with id returned status should (404) after posting data', (done) => {
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

describe('get redis note by id api for positive and negative test case', () => {
  it.only('GivenGetRedisNoteByIdDetails_When_Note_Get_Successfully', (done) => {
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

  it.only('GivenGetRedisNoteByIdDetails_When_Note_RedisGet_SortTime_Successfully', (done) => {
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
});
