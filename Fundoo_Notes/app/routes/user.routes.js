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
};
