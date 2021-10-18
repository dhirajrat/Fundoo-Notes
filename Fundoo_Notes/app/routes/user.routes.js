/* eslint-disable linebreak-style */
const controller = require('../controllers/user.controller');
const noteController = require('../controllers/notes');
const helper = require('../utility/helper');
const labelController = require('../controllers/label');
const redis = require('../utility/redis');

module.exports = (app) => {
  // Post: User Registration
  app.post('/register', controller.register);

  // Post: Login
  app.post('/login', controller.login);

  // Post: Forgot Password
  app.post('/forgetpassword', controller.forgetPassword);

  // Post: Reset Password
  app.post('/resetpassword', helper.verifyTokenForReset, controller.resetPassword);

  // Post: Create Note
  app.post('/createnote', helper.verifyToken, noteController.createNote);

  // Get: Notes
  app.get('/getallnotes', helper.verifyToken, redis.checkCacheNotes, noteController.getAllNotes);

  // Get: Notes by Id
  app.get('/getnotesbyid/:id', helper.verifyToken, redis.checkCacheNote, noteController.getNoteById);

  // Update: Note by Id
  app.put('/updatenotesbyid/:id', helper.verifyToken, noteController.updateNoteById);

  // Delete: Note by Id
  app.delete('/deletenote/:id', helper.verifyToken, noteController.deleteNoteById);

  // Create: Lable API
  app.post('/createlabel', helper.verifyToken, labelController.createLabel);

  // get: Lable API
  app.get('/getlabels', helper.verifyToken, redis.checkCacheLabels, labelController.getLabel);

  // get: Lable by id API
  app.get('/getlabel/:id', helper.verifyToken, redis.checkCacheLabel, labelController.getLabelById);

  // Update: Lable API
  app.put('/updatelabel/:id', helper.verifyToken, labelController.updateLabelById);

  // Delete: Lable API
  app.delete('/deletelabel/:id', helper.verifyToken, labelController.deleteLabelById);

  // Update: add Labbel to Note API
  app.put('/addlabeltonote', helper.verifyToken, noteController.addLabelToNote);

  // Update: delete Labbel to Note API
  app.put('/deletelabelfromnote', helper.verifyToken, noteController.deleteLabelFromNote);
};
