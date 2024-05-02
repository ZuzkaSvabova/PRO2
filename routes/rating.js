const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ratings = require('../controllers/rating');

router.route('/:id/like').get(catchAsync(ratings.likeComment));
router.route('/:id/dislike').get(catchAsync(ratings.dislikeComment));;

module.exports = router;