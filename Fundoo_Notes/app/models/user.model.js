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
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);

class userModel {
  /**
   * Check User Exist, If not then save the data into database
   * @param {*} userDetails 
   * @param {*} callback 
   * @returns 
   */
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

  /**
   * Confirm Register
   */
  confirmRegister = (data, callback) => {
    user.findOneAndUpdate({ email: data.email },{
      verified: true
      }, (error, data) => {
      if (error) {
        logger.error('data not found in database');
        return callback(error, null);
      } else {
        logger.info('data found in database');
        return callback(null, data);
      }
    });
  }

  /**
   * Login Function
   * @param {*} loginData 
   * @param {*} callback 
   */
  loginUser = (loginData, callback) => {
    // Checking Email into database present or not
    user.findOne({ email: loginData.email }, (error, data) => {
      if (error) {
        logger.error('data not found in database');
        return callback(error, null);
      } else {
        if(data.verified == true){
          logger.info('data found in database');
          return callback(null, data);
        } else {
          logger.info('data found in database but not verified');
          return callback('not verified mail', null);
        }
      }
    });
  };

  /**
   * Forget Password function
   * @param {*} userInfo 
   * @param {*} callback 
   */
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

  /**
   * Reset Password Function
   * @param {*} resetInfo 
   * @param {*} callback 
   */
  resetPassword = (resetInfo, callback) => {
    // Password Hashed
    helper.hashing(resetInfo.newPassword, (err, hashedPassword) => {
      if(err){
        throw err;
      }
      else{
            user.findByIdAndUpdate(resetInfo.id, {Password: hashedPassword}, (error, data) => {
              if (data) {
                logger.info('Password Updated successfully');
                return callback(null, data);
              } else {
                logger.info(error);
                return callback(error, null);
              }
            });
      }
    })
  }

}

module.exports = new userModel();