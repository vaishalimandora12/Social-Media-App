const USER = require("../../model/userModel");
const error = require("../../utils/error");

exports.editProfile = async (req, res) => {
  try {
    const arrayOfEditKeys = ["bio","gender","birthday","photo",];
    const objectUpdate = {};
    for (const key of arrayOfEditKeys) {
        if (req.body[key] != null) {
            objectUpdate[key] = req.body[key];
        }
    }
    const update = await USER.findOneAndUpdate({ _id: req.user._id }, objectUpdate, { new: true });
    if(update){
        return res.status(error.status.OK).send({
            message: "Profile Update Successfully.",
            status: error.status.OK,
          });
    }
} catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};


exports.getMyProfile = async (req, res) => {
  try {
    const get = await USER.findOne({ _id: req.user._id });
    if(get){
        return res.status(error.status.OK).send({
            message: "Profile get Successfully.",
            status: error.status.OK,
            Data:get
          });
    }
} catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

exports.updateAccountType = async (req, res) => {
  try {
    const get = await USER.findOne({ _id: req.user._id });
    if(get){
       if(get.accountType==='public'){
      const update=await USER.updateOne({ _id: req.user._id },{accountType:'private'})
      if(update){
        return res.status(error.status.OK).send({
            message:  "Your Profile Is Private",
            status: error.status.OK,
            Data:get
          });
        }
    }
    else{
      const update=await USER.updateOne({ _id: req.user._id },{accountType:'public'})
      if(update){
      return res.status(error.status.OK).send({
          message: "Your Profile Is Public",
          status: error.status.OK,
          Data:get
        });
      }
    }
  }
} catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

