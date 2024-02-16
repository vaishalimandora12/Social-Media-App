const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
      },
      content: {
        type: String
      },

  
},{timestamps:true})

commentSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})


module.exports = mongoose.model('comments',commentSchema)