const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
    user_id:{
        type:String,
    },
    access_token:{
        type:String,
    }
  
},{timestamps:true})

sessionSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('session',sessionSchema)