const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

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

/**
 * Convert Password Into Hashed before Save
 */
userSchema.pre('save', async function (next){
  try {
    const hashpassword = await bcrypt.hash(this.Password, 10);
    this.Password = hashpassword;
    next();
  } catch(error){
    next(error);
  }
});


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
          newUser.save();
          return callback(null, newUser);
        }
      });
    } catch (error) {
      return callback("Internal Error", null);
    }
  };
}

module.exports = new userModel();