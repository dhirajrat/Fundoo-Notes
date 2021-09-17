const userService = require("../service/user.service.js");
const Joi = require("joi");

// Validator Schema
class ValidatorSchema {
  auth = Joi.object({
    firstName: Joi.string()
                .min(3)
                .required()
                .pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')),

    lastName: Joi.string()
                .min(3)
                .required()
                .pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')),

    email: Joi.string()
                .required(),

    Password: Joi.string()
                .required()
  });
}
const validatorObj = new ValidatorSchema();


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