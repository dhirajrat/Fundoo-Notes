const mongoose = require("mongoose");
const helper = require("../utility/helper");
const logger = require('../../logger/logger')

/**
 * Mongoose Schema
 */
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: 5
    }
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);

/**
 * Check User Exist, If not then save the data into database
 */
class userModel {
  registerUser = (userDetails, callback) => {
    const newUser = new user({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      Password: userDetails.Password
    });
    try {
          // Password Hashed
          helper.hashing(userDetails.Password, (err, hashedPassword) => {
            if(err){
              throw err;
            }
            else{
              logger.info('password hashed');
              newUser.Password = hashedPassword;
              newUser.save((error, data) => {
                if (error) {
                  callback(error, null);
                } else {
                  callback(null, data);
                }
              });
            }
          })
    } catch (error) {
      return callback("Internal Error", null);
    }
  };

  loginUser = (loginData, callback) => {
    // Checking Email into database present or not
    user.findOne({ email: loginData.email }, (error, data) => {
      if (error) {
        logger.error('data not found in database');
        return callback(error, null);
      } else {
        logger.info('data found in database');
        return callback(null, data);
      }
    });
  };

  forgetPasswordModel = (userInfo, callback) => {
    user.findOne({ email: userInfo.email }, (error, data) => {
      if (error) {
        logger.error('data not found in database');
        return callback(error, null);
      } else {
        logger.info('data found in database');
        return callback(null, data);
      }
    });
  }
  
}

module.exports = new userModel();