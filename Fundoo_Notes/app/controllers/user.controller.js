const userService = require("../service/user.service.js");
const validatorObj = require('../utility/validation.js');

// Controller Class
class Controller {
  /**
   * Register User
   * @param {Request} req 
   * @param {Response} res 
   * @returns 
   */
  register = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        Password: req.body.Password
      };

      const validUser = validatorObj.auth.validate(user);

      if (validUser.error) {
        console.log(validUser.error)
        return res.status(400).send({
          success: false,
          message: 'Invalid Input',
          data: validUser
        });           
      }

      userService.registerUser(user, (error, data) => {
        if (error) {
          return res.status(409).json({
            success: false,
            message: "Already exist User",
          });
        } else {
          return res.status(201).json({
            success: true,
            data: data,
            message: "User Data Inserted successfully",
          });
        }
      });
      } catch (error) {
          return res.status(500).json({
            success: false,
            data: null,
            message: "server-error",
          });
        }
  };

  login = (req, res) => {
    try {
      const loginInfo = {
        email : req.body.email,
        Password : req.body.Password
      }


      userService.loginUser(loginInfo, (error, data) => {
        if (error) {
          return res.status(403).json({
            success: false,
            message: "Incorrect email or password",
            error,
          });
        } if(data) {
          return res.status(200).json({
            success: true,
            message: "login successfull",
            token: data,
          });
        }
      });


    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
        message: "server-error",
      });
    }
  }
  

}


module.exports = new Controller();