const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

CommentSchema.post("save", (error, doc, next) => {
  if (error.name === "ValidationError") {
    const validationErrors = Object.values(error.errors).map(
      (err) => err.message
    );
    next(new Error(validationErrors.join(",")));
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
