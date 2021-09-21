const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model.js");

class userService {
  /**
   * Register User
   * @param {*} user 
   * @param {*} callback 
   */
  registerUser = (user, callback) => {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    });
  };

  /**
   * Validate Password And login User
   * @param {LoginInfoData} loginInfoData 
   * @param {CallBack Function} callback 
   */
  loginUser = (loginInfoData, callback) => {
    userModel.loginUser(loginInfoData, (error, data) => {
      if (data) {
        bcrypt.compare(loginInfoData.Password, data.Password, (err, databaseData) => {
        if (!databaseData) {
          return callback("Password not correct", null);
        } else {
          const token = jwt.sign({id: data._id, firstName: data.firstName, lastName: data.lastName}, process.env.SECRET_KEY);
          return callback(null, token);
        }
        });
      } else {
        return callback("Login Info-Error !!");
      }
    });
  };


}
module.exports = new userService();