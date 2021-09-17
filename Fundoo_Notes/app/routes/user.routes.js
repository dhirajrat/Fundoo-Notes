module.exports = (app) => {
    const controller = require("../controllers/user.controller.js");
  
    // Post User Registration
    app.post("/register", controller.register);
  };