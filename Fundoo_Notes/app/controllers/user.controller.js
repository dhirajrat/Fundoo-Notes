const userService = require("../service/user.service.js");
const validatorObj = require('../validation/validation.js');

// Controller Class
class Controller {
  register = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        Password: req.body.Password
      };

      const validUser = validatorObj.auth.validate(user);

      if(!validUser.error){
        userService.registerUser(user, (error, data) => {
          if (error) {
            return res.status(409).json({
              success: false,
              message: "Already exist User",
            });
          } else {
            res.status(201).json({
              success: true,
              data: data,
              message: "User Data Inserted successfully",
            });
          }
        });
      }

    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
        message: "server-error",
      });
    }
  };

  
}
module.exports = new Controller();