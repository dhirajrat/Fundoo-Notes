const bcrypt = require("bcrypt");
const userModel = require("../models/user.model.js");
const helper = require("../utility/helper.js");
const jwt = require('jsonwebtoken');
const logger = require('../../logger/logger');
const nodemailer = require("nodemailer");

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

            const link = `http://localhost:${process.env.PORT}/resetpassword/${token}`;
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.NODEMAILER_G_USER, // generated ethereal user
                pass: process.env.NODEMAILER_G_PASS, // generated ethereal password
              },
            });

            // send mail with defined transport object
            let info = transporter.sendMail({
              from: '"Fundoo Notes" <no-reply@fundoonotes.com>', // sender address
              to: data.email, // list of receivers
              subject: "Reset Password - Fundoo notes account", // Subject line
              text: `Hello ${data.firstName}.`, // plain text body
              html: `<b>Hello ${data.firstName}. Here is your link to reset Password: <button href="${link}"> <a href="${link}">reset password</a></button></b>`, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

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