const express = require('express');
const router = express.Router();
const {
  renderRegister,
  register,
  renderLogin,
  login,
  logout,
} = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const { validateUser } = require('../middleware/user-validation');
const { areCredentialsVerified } = require('../middleware/authentication');

router
  .route('/register')
  .get(renderRegister)
  .post(validateUser, catchAsync(register));

router
  .route('/login')
  .get(renderLogin)
  .post(catchAsync(areCredentialsVerified), catchAsync(login));

router.route('/logout').get(catchAsync(logout));

module.exports = router;
