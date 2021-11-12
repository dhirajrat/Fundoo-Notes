/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const chai = require('chai');
const chaihttp = require('chai-http');
const faker = require('faker');
const server = require('../server');
const test = require('./lableData.json');

chai.should();

chai.use(chaihttp);

describe('Add Label To Note', () => {
  it.only('GivenAddLabelToNoteDetails_When_AddedNote_Successfully', (done) => {
    const token = test.validtoken;
    const addLabelIntoNote = test.validid;
    chai
      .request(server)
      .put('/addlabeltonote')
      .set({ authorization: token })
      .send(addLabelIntoNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });

  it.only('GivenAddLabelToNoteDetails_When_AddNote_TokenExpiered', (done) => {
    const token = test.invalidtoken;
    const addLabelIntoNote = test.validid;
    chai
      .request(server)
      .put('/addlabeltonote')
      .set({ authorization: token })
      .send(addLabelIntoNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });

  it.only('GivenAddLabelToNoteDetails_When_TokenExpiered_NotesId_And_LabelId_Is_Empty', (done) => {
    const token = test.invalidtoken;
    const addLabelIntoNote = test.validid;
    chai
      .request(server)
      .put('/addlabeltonote')
      .set({ authorization: token })
      .send(addLabelIntoNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});
