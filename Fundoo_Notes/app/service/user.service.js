const bcrypt = require("bcrypt");
const userModel = require("../models/user.model.js");
const helper = require("../utility/helper.js");

class userService {
  /**
   * Register User
   * @param {*} user 
   * @param {*} callback 
   */
  registerUser = (user, callback) => {
    // Send Welcome Mail to User on his Mail
    helper.sendWelcomeMail(user);
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
        // Compare Input Password with The Database Password
        bcrypt.compare(loginInfoData.Password, data.Password, (err, databaseData) => {
        if (!databaseData) {
          return callback("Password not correct", null);
        } else {
          // Generate JWT token
          const secretkey = data.Password + process.env.SECRET_KEY
          helper.jwtTokenGenerate(data, secretkey, (err, token) =>{
            if(token){
              return callback(null, token);
            }
            else {
              throw err;
            }
          });
          }
        });
      } else {
        return callback("Login Info-Error !!");
      }
    });
  };

  forgotPasswordService = (userInfo, callback) => {
    userModel.forgotPasswordModel(userInfo, (error, data) => {
      if(error){
        return callback(error, null);
      }else {
        // Generate JWT token
        const secretkey = data.Password + process.env.SECRET_KEY
        helper.jwtTokenGenerate(data.email, secretkey, (err, token) =>{
          if(token){
            return callback(null, token);
          }
          else {
            throw err;
          }
        });
      }
    });
  }


}
module.exports = new userService();