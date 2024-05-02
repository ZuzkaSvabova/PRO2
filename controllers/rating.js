const Rating = require("../models/rating");

module.exports.likeComment = async (req, res, next) => {
    const { id } = req.params;
    let rating = await Rating.findOne({comment: id});
    if (!rating) {
      rating = new Rating({comment: id});
    }
    
    if(rating.ratedBy.includes(req.session.userId)){
      rating.likes -= 1;
      rating.ratedBy = removeFromArray(rating.ratedBy, req.session.userId);
    } else {
      rating.ratedBy.push(req.session.userId)
      rating.likes += 1;
    }
    await rating.save();
    res.redirect("/comments/"+id);
  };
  
  const removeFromArray = (array, value) => {    
    return array.filter(item => item != value)
  }

