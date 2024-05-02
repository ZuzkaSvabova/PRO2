const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  label: [{ type: String, enum: ['Drone', 'FPV', 'Tech', 'DJI', 'Robotics', 'camera'] }]
});

LabelSchema.post("save", (error, doc, next) => {
  if (error.name === "ValidationError") {
    const validationErrors = Object.values(error.errors).map(
      (err) => err.message
    );
    next(new Error(validationErrors.join(",")));
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Label", LabelSchema);
