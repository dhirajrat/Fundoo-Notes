const bcrypt = require("bcrypt");
const userModel = require("../models/user.model.js");
const helper = require("../utility/helper.js");
const logger = require('../../logger/logger');
const sendLinkMail = require('../utility/sendresetlink')
class userService {
  /**
   * Register User
   * @param {*} user 
   * @param {*} callback 
   */
  registerUser = (user, callback) => {
    // helper.sendWelcomeMail(user);
    userModel.registerUser(user, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        // Send Welcome Mail to User on his Mail
        helper.sendWelcomeMail(user);
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
          const secretkey = process.env.SECRET_KEY
          console.log("login ser: "+data);
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

  /**
   * Forget Password function
   */
  forgetPasswordService = (userInfo, callback) => {
    userModel.forgetPasswordModel(userInfo, (error, data) => {
      if(data){

        console.log("data ser: "+data);
        // Generate JWT token
        const secretkey = process.env.SECRET_KEY
        helper.jwtTokenGenerate(data, secretkey, (err, token) =>{
          if(token){
            console.log("service forget id and token : ",data.id," ",token);
            // Send mail
            sendLinkMail.sendResetPasswordMail(token, data);
            return callback(null, token);
          }
          else {
            return callback(err, null);
          }
        });
      }else {
        return callback(error, null);
      }
    });
  }

  resetPassword = (resetInfo, callback) => {
    userModel.resetPassword(resetInfo, (error, data) => {
      if (data) {
        return callback(null, data);
      } else {
        return callback(error, null);
      }
    })
  }

}
module.exports = new userService();