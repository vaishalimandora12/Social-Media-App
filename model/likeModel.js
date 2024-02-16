const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
    user_id: {                                      // Reference to the user who liked the post
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
      },
},{timestamps:true})

likeSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('session',likeSchema)