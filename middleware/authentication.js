const User = require("../models/user");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");
const ExpressError = require("../utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    throw new ExpressError("User not logged in", 401);
  } else {
    console.log("user is logged in");
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.session;
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new ExpressError("Document not found", 404);
  }
  if (!comment.author.equals(userId)) {
    throw new ExpressError(
      "You are not authorized to perform this action",
      403
    );
  }
  console.log("user is the author of the comment");
  next();
};

module.exports.areCredentialsVerified = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return next(new ExpressError("Invalid credentials", 401));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ExpressError("Invalid credentials", 401));
  }
  req.user = user; // Store the user object in the request for later use
  next();
};
