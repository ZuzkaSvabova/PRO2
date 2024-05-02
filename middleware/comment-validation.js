const {
  createCommentSchema,
  updateCommentSchema,
} = require('../schemas/comment');
const ExpressError = require('../utils/ExpressError');
const Joi = require('joi');

module.exports.validateComment = (req, res, next) => {
  let schemaToUse;
  if (req.method === 'POST') {
    schemaToUse = createCommentSchema;
  } else if (req.method === 'PATCH') {
    schemaToUse = updateCommentSchema;
  }
  const { error, value } = schemaToUse.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(',');
    throw new ExpressError(message, 400);
  } else {
    req.validatedComment = value.comment;
    next();
  }
};
