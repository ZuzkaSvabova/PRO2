const Joi = require('joi');

module.exports.createUserSchema = Joi.object({
  user: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    passwordRepeated: Joi.string().required().valid(Joi.ref('password')),
  }).required(),
});
