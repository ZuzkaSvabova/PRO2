const session = require("express-session");
const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const bcrypt = require("bcrypt");

module.exports.renderRegister = (req, res) => {
  res.render("register");
};

module.exports.register = async (req, res, next) => {
  const { email, username, password } = req.validatedUser;
  const hashedPassword = await bcrypt.hash(password, 10); // the saltRounds parameter can be set
  const user = new User({ email, username, password: hashedPassword });
  await user.save();
  res.redirect("/login");
};

module.exports.renderLogin = (req, res) => {
  res.render("login");
};

module.exports.login = async (req, res, next) => {
  const { username, _id } = req.user;
  req.session.userId = _id;
  console.log("Login successful");
  res.redirect("/comments");
};

module.exports.logout = async (req, res, next) => {
  // delete session
  console.log("deleting session cookie");
  req.session.userId = null;
  req.session.save((err) => {
    if (err) next(err);
    req.session.regenerate((err) => {
      if (err) next(err);
      res.redirect("/");
    });
  });
};
