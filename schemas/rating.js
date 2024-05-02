const Joi = require('joi');

const ratingSchema = Joi.object({
  likes: Joi.number().integer().min(0).required(),
  dislikes: Joi.number().integer().min(0).required(),
  ratedBy: Joi.array().items(Joi.string()).required(),
});

module.exports = ratingSchema;