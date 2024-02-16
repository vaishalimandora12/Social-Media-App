require("dotenv").config()
const USER = require("../../model/userModel");
const SESSION=require("../../model/sessionModel")
const error = require("../../utils/error");
const bcrypt = require("bcrypt");
const salt = 10;
const JWT=require("jsonwebtoken")

exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const find = await USER.findOne({ email: email });
    if (find) {
      return res.status(error.status.OK).send({
        message: "User Already Exists! Please Login.",
        status: error.status.OK,
      });
    }
    const hashed = await bcrypt.hash(password, salt);
    const refData = {
      email: email,
      password: hashed,
      username: username,
    };
    const create = await USER.create(refData);
    if (create) {
      const signToken = JWT.sign(
        { _id: create._id, email: create.email },
        process.env.SECRET_KEY
      );
      const createSession = await SESSION.create({
        access_token: signToken,
        user_id: create._id,
      });
      return res.status(error.status.OK).send({
        message: "User Created Successfully",
        status: error.status.OK,
        data: create,  
        access_Token: signToken,
        session: createSession,   
      });
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const find = await USER.findOne({ email: email });
    if (find) {
      const com_pass = await bcrypt.compare(password, find.password);
      if (!com_pass) {
        return res.status(error.status.UnprocessableEntity).send({
          message: "Password invalid.",
          status: error.status.UnprocessableEntity,
        });
      }
      const signToken = JWT.sign(
        { _id: find._id, email: find.email },
        process.env.SECRET_KEY
      );
      const createSession = await SESSION.create({
        access_token: signToken,
        user_id: find._id,
      });
      return res.status(error.status.OK).send({
        message: "Login Successfully.",
        status: error.status.OK,
        data: find,
        access_Token: signToken,
        session: createSession,
      });
    }
    return res.status(error.status.NotFound).send({
      message: "No User Found With This Email!Please SignUp .",
      status: error.status.UnprocessableEntity,
    });

  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

exports.changePassword= async(req,res)=>{
    try{
    const {currentPassword, newPassword } = req.body;
    const findUser=await USER.findOne({_id:req.user._id});
    if(findUser){
      const com_pass=await bcrypt.compare(currentPassword,findUser.password)
    if(com_pass){
      const hashed = await bcrypt.hash(newPassword, salt);
      const passwordUpdate = await USER.findByIdAndUpdate({ _id:req.user._id }, { password: hashed });
      if(passwordUpdate){
        return res.status(error.status.OK).send({
          message: "Password Update Successfully.",
          status: error.status.OK,
        });
      }
    }
    return res.status(error.status.OK).send({
      message: "Current Password is Wrong.",
      status: error.status.OK,
    });
    }
  }
  catch(e){
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
}

exports.logout=async (req,res)=>{
  const user_id = req.user._id;
  const access_token = req.userToken;
  await SESSION.deleteMany({ user_id: user_id });
  return res.status(error.status.OK).json({
      message:"Logout",
  })
}  