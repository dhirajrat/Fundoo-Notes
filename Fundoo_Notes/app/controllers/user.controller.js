const userService = require("../service/user.service.js");
const validatorObj = require('../utility/validation.js');
const logger = require('../../logger/logger')
// const helper = require("../utility/helper.js");


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

      logger.info('controller started');
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        Password: req.body.Password
      };
      // Check Validation of User Data
      const validUser = validatorObj.authRegister.validate(user);
      if (validUser.error) {
        logger.error(validUser.error);
        console.log(validUser.error)
        return res.status(400).send({
          success: false,
          message: 'Invalid Input',
          data: validUser
        });           
      }
      //Register user function from User Service
      userService.registerUser(user, (error, data) => {
        if (error) {
          logger.error('Already exist User');
          return res.status(409).json({
            success: false,
            message: "Already exist User",
          });
        } else {
          logger.info('User Data Inserted successfully');
          return res.status(201).json({
            success: true,
            message: "User Data Inserted successfully",
          });
        }
      });
      } catch (error) {
        logger.error('Server Error');
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
      // Validate Login Info
      const validLoginDetails = validatorObj.authLogin.validate(loginInfo)
      if (validLoginDetails.error) {
        logger.error('Invalid Email or Password');
        return res.status(400).json({
          success: false,
          message: "InValid email or password",
          data: loginInfo
        });
      }
      // Call Login User function from User Service
      userService.loginUser(loginInfo, (error, data) => {
        if (error) {
          logger.error('Incorrect Email or Password');
          return res.status(403).json({
            success: false,
            message: "Incorrect email or password",
            error,
          });
        } if(data) {
          logger.info('Login Successfull');
          return res.status(200).json({
            success: true,
            message: "login successfull",
            token: data,
          });
        }
      });


    } catch (error) {
      logger.error('Server Error');
      return res.status(500).json({
        success: false,
        data: null,
        message: "server-error",
      });
    }
  }

  forgotPassword = (req, res) => {
    try {
      const info = {
        email: req.body.email
      }

      userService.forgotPasswordService(info, (error, data) => {
        if (error){
          return res.status(403).json({
            success: false,
            data:null,
            message: 'Incorrect email'
          })
        } else {
          
        }
      });
    } catch (error) {

    }
  }
  

}


module.exports = new Controller();