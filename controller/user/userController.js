const USER = require("../../model/userModel");
const error = require("../../utils/error");

exports.editProfile = async (req, res) => {
  try {
    const arrayOfEditKeys = ["bio", "accountType", "gender","birthday","photo",];
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
