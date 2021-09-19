const controller = require("../controllers/user.controller.js");

module.exports = (app) => {
    // Post User Registration
    app.post("/register", controller.register);
  };