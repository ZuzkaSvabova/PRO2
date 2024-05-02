const Comment = require("../models/comment");
const LabelSchema = require("../models/label");
const Rating = require("../models/rating");
const ExpressError = require("../utils/ExpressError");

module.exports.listAllComments = async (req, res, next) => {
  const comments = await Comment.find({});
  res.render("index", { comments });
};

module.exports.renderNewForm = (req, res) => {
  const labels = LabelSchema.schema.path('label').caster.enumValues;
  res.render("new", {labels});
};

module.exports.showComment = async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id).populate("author");
  if (!comment) {
    throw new ExpressError("Document not found", 404);
  }
  const savedLabels = await LabelSchema.findOne({comment: id})
  let labels = [];
  if(savedLabels){
    labels = savedLabels.label;
  }

  const rating = await Rating.findOne({comment: id})

  res.render("show", { comment, labels, rating });
};

module.exports.renderEditForm = async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  const labels = LabelSchema.schema.path('label').caster.enumValues;
  if (!comment) {
    throw new ExpressError("Document not found", 404);
  }  

  const selectedLabels = await LabelSchema.findOne({comment: id})

  res.render("edit", { comment, labels, selectedLabels });
};

module.exports.createComment = async (req, res, next) => {
  const { title, text, labels } = req.validatedComment;
  const comment = new Comment({ title, text });
  comment.author = req.session.userId;
  await comment.save(); // to be catched by DB error handling  
  const label = new LabelSchema({comment: comment._id, label: labels})
  await label.save()
  res.redirect("/comments");
};

module.exports.updateComment = async (req, res, next) => {
  const { id } = req.params;
  const { title, text, labels } = req.validatedComment;
  const updatedComment = await Comment.findByIdAndUpdate(id, { title, text });  
  if (!updatedComment) {
    throw new ExpressError("Document not found", 404);
  }
  const updatedLabels = await LabelSchema.findOneAndUpdate({comment: id}, {label: labels})
  res.redirect("/comments");
};

module.exports.deleteComment = async (req, res, next) => {
  const { id } = req.params;
  const deletedComment = await Comment.findByIdAndDelete(id);
  if (!deletedComment) {
    throw new ExpressError("Document not found", 404);
  }
  res.redirect("/comments");
};