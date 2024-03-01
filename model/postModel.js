const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      content: {
        type: String,
      },
      media_url: {
        type: String,
      },
      likes_count: {
        type: Number,
        default:0
      },
      comments_count: {
        type: Number,
        default:0
      },
  
},{timestamps:true})

postSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('post',postSchema)    