const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
    userLiked_id: {                                      // Reference of the user who liked the post
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
      },
},{timestamps:true}) 

module.exports = mongoose.model('like',likeSchema)