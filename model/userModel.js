const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String
    },
    username: {
        type: String,
        unique: true,
      },
    bio: {
        type: String,
      },
      accountType: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
      },
      gender: {
        type: String,
        enum: ['Male', 'Female','Transgender'],
      },
      birthday: {
        type: Date,
      },
      photo: {
        type: String
      },
      followers: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
      },
      followings: {
        type:  [mongoose.Schema.Types.ObjectId],
        default: [],
      },
  
},{timestamps:true})

userSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('user',userSchema)