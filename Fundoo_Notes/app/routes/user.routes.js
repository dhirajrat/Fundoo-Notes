/* eslint-disable linebreak-style */
const controller = require('../controllers/user.controller');
const noteController = require('../controllers/notes');
const helper = require('../utility/helper');

module.exports = (app) => {
  // Post User Registration
  app.post('/register', controller.register);

  // Post Login
  app.post('/login', controller.login);

  // Post Forgot Password
  app.post('/forgetpassword', controller.forgetPassword);

  // Post Reset Password
  app.post('/resetpassword', helper.verifyTokenForReset, controller.resetPassword);

  // Post Create Note
  app.post('/createnote', helper.verifyToken, noteController.createNote);

  // Get Notes
  app.get('/getallnotes', helper.verifyToken, noteController.getAllNotes);

  // Get Notes by Id
  app.get('/getnotesbyid/:id', helper.verifyToken, noteController.getNoteById);

  // Update Note by Id
  app.put('/updatenotesbyid/:id', helper.verifyToken, noteController.updateNoteById);

  // delete Note by Id
  app.delete('/deletenote/:id', helper.verifyToken, noteController.deleteNoteById);
};
