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

module.exports = new ValidatorSchema();

