module.exports = (app) => {
    const controller = require("../controllers/user.controller.js");
  
    // Create a new Note
    app.post("/register", controller.register);
  };