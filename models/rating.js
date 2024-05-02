const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  ratedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comment: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
});


module.exports = mongoose.model("Rating", RatingSchema);
