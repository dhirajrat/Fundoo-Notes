const Joi = require("joi");

// Input Validation Schema
class ValidatorSchema {
  authRegister = Joi.object({
    firstName: Joi.string()
                .min(2)
                .required()
                .pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')),

    lastName: Joi.string()
                .min(2)
                .required()
                .pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')),

    email: Joi.string()
                .required()
                .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$')),

    Password: Joi.string()
                .required()
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))
  });

  // Email and Password json Object Validation
  authLogin = Joi.object({
    email: Joi.string()
                .required()
                .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$')),

    Password: Joi.string()
                .required()
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))
  });

  authLabel = Joi.object({
    labelName: Joi.string()
                  .min(1)
                  .max(25)
                  .required(),

    userId: Joi.string()
              .required()
  });

  authupdateLabel = Joi.object({
    labelName: Joi.string()
                  .min(1)
                  .max(25)
                  .required(),

    userId: Joi.string()
              .required(),

    labelId: Joi.string()
              .required()
              .pattern(new RegExp("^[a-zA-z0-9]{24}$"))
  });

  authCreateNote = Joi.object({
    userId: Joi.string()
              .required(),

    title: Joi.string()
              .min(0)
              .max(200)
              .required(),

    description: Joi.string()
              .min(1)
              .max(3000)
              .required(),
  });

  authUpdateNote = Joi.object({
    userId: Joi.string()
              .required(),

    noteId: Joi.string()
              .required(),

    title: Joi.string()
              .min(0)
              .max(200)
              .required(),

    description: Joi.string()
              .min(1)
              .max(3000)
              .required(),
  });
}

module.exports = new ValidatorSchema();

