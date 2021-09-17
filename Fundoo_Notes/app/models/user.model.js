const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    Password: String
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("user", userSchema);

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