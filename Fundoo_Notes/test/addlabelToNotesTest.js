// /* eslint-disable consistent-return */
// /* eslint-disable no-undef */
// const chai = require('chai');
// const chaihttp = require('chai-http');
// const faker = require('faker');
// const server = require('../server');
// const test = require('./lableData.json');

// chai.should();

// chai.use(chaihttp);

// describe('Add Label', () => {
//   it('GivenLabelDetails_When_Label_Created_Successfully', (done) => {
//     const token = test.validtoken;
//     const createLabel = {
//       labelName: faker.lorem.word(),
//     };
//     chai
//       .request(server)
//       .post('/createlabel')
//       .set({ authorization: token })
//       .send(createLabel)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         res.should.have.status(201);
//         done();
//       });
//   });
// });
