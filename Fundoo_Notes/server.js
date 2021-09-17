const express = require("express");
const bodyParser = require("body-parser");


//const dotenv = 
require('dotenv').config();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());


//Conneting To the Database
const connection =require("./config/database.config.js");
connection.database();


// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to FundooNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});


// Require user routes
require("./app/routes/user.routes.js")(app);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port "+process.env.PORT);
});