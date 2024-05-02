const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/comments');
const catchAsync = require('../utils/catchAsync');
const { validateComment } = require('../middleware/comment-validation');
const { isLoggedIn, isAuthor } = require('../middleware/authentication');

router
  .route('/')
  .get(catchAsync(commentControllers.listAllComments))
  .post(
    isLoggedIn,
    validateComment,
    catchAsync(commentControllers.createComment)
  );

router.get('/new', isLoggedIn, commentControllers.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(commentControllers.showComment))
  .patch(
    isLoggedIn,
    catchAsync(isAuthor),
    validateComment,
    catchAsync(commentControllers.updateComment)
  )
  .delete(
    isLoggedIn,
    catchAsync(isAuthor),
    catchAsync(commentControllers.deleteComment)
  );

router.get(
  '/:id/edit',
  isLoggedIn,
  catchAsync(isAuthor),
  catchAsync(commentControllers.renderEditForm)
);

module.exports = router;
