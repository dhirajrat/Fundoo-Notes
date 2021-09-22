const mongoose = require("mongoose");
const helper = require("../utility/helper");

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
      user.findOne({ email: userDetails.email }, (err, data) => {
        if (data) {
          return callback("User already exist", null);
        } else {

          helper.hashing(userDetails.Password, (err, hashedPassword) => {
            if(err){
              throw err;
            }
            else{
              newUser.Password = hashedPassword;
              newUser.save();
              return callback(null, newUser);
            }
          })
          
        }
      });
    } catch (error) {
      return callback("Internal Error", null);
    }
  };

  loginUser = (loginData, callback) => {
    
    user.findOne({ email: loginData.email }, (error, data) => {
      if (error) {
        return callback(error, null);
      } else if (!data) {
        return callback("Invalid Login Info", null);
      } else {
        return callback(null, data);
      }
    });

  };

}

module.exports = new userModel();