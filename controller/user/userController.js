const USER = require("../../model/userModel");
const POST =require("../../model/postModel");
const LIKE=require("../../model/likeModel");
const error = require("../../utils/error");
const mongoose = require('mongoose');

exports.editProfile = async (req, res) => {
  try {
    const arrayOfEditKeys = ["bio","gender","birthday","photo",];
    const objectUpdate = {};
    for (const key of arrayOfEditKeys) {
        if (req.body[key] != null) {
            objectUpdate[key] = req.body[key];
        }
    }
    const update = await USER.findOneAndUpdate({ _id: req.user._id }, objectUpdate  , { new: true });
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

// exports.updateAccountType = async (req, res) => {
//   try {
//     const get = await USER.findOne({ _id: req.user._id });
//     if(get){
//        if(get.accountType==='public'){
//       const update=await USER.updateOne({ _id: req.user._id },{accountType:'private'})
//       if(update){
//         return res.status(error.status.OK).send({
//             message:  "Your Profile Is Private",
//             status: error.status.OK,
//             Data:get
//           });
//         }
//     }
//     else{
//       const update=await USER.updateOne({ _id: req.user._id },{accountType:'public'})
//       if(update){
//       return res.status(error.status.OK).send({
//           message: "Your Profile Is Public",
//           status: error.status.OK,
//           Data:get
//         });
//       }
//     }
//   }
// } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// };



exports.addPost = async (req, res) => {
  try {
    const { content, media_url} = req.body;
    const find = await USER.findOne({ _id: req.user._id });
    if (find) {
      const refData = {
        user_id:find._id,
        content: content,
        media_url: media_url,
      }
    const create = await POST.create(refData);
    if (create) {
      return res.status(error.status.OK).send({
        message: "Post Add Successfully",
        status: error.status.OK,
        data: create, 
      });
    }
    return res.status(error.status.BadRequest).send({
      message: "Unable To Add Post",
      status: error.status.BadRequest,
    });
  }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

exports.editPost = async (req, res) => {
  try {
    const arrayOfEditKeys = ["media_url","content"];
    const objectUpdate = {};
    for (const key of arrayOfEditKeys) {
        if (req.body[key] != null) {
            objectUpdate[key] = req.body[key];
        }
    }
    const find =await USER.findOne({ _id: req.user._id })
    if(find){
    const update = await POST.findOneAndUpdate({ _id: req.params.postID }, objectUpdate, { new: true });
    if(update){
        return res.status(error.status.OK).send({
            message: "Post Update Successfully.",
            status: error.status.OK,
            data:update
          });
    }
  }
    return res.status(error.status.BadRequest).send({
      message: "Unable To edit Post",
      status: error.status.BadRequest,
    });
} catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};


exports.viewMyPost = async (req, res) => {
  try {
    const get = await POST.findOne({ _id: req.params.postID });
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

exports.deleteMyPost = async (req, res) => {
  try {
    const find = await POST.findOne({ _id: req.params.postID });
    if(find){
      const deletePost = await POST.deleteOne({ _id: req.params.postID });
      if(deletePost){
        return res.status(error.status.OK).send({
            message: "Post Delete Successfully.",
            status: error.status.OK,
          });
        }
        return res.status(error.status.BadRequest).send({
          message: "unable To Delete Post",
          status: error.status.BadRequest,
        });
    }
} catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

exports.addFollowing = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const currentUser = await USER.findById(req.user._id);
    const userToFollow = await USER.findById(userIdToFollow);

    if (!userToFollow) {
      return res.status(error.status.NotFound).json({
        message: "User to follow not found",
        status: error.status.NotFound,
      });
    }
    if(currentUser._id ==userIdToFollow) {
      return res.status(error.status.BadRequest).json({
        message: "Cannot follow yourself",
        status: error.status.BadRequest,
      });
    }
    if (currentUser.followings.includes(userIdToFollow)) {
      return res.status(error.status.BadRequest).json({
        message: "You are already following this user",
        status: error.status.BadRequest,
      });
    }
    const userId = new mongoose.Types.ObjectId(userIdToFollow);
    currentUser.followings.push(userId);
    await currentUser.save();
    userToFollow.followers.push(currentUser._id);
    await userToFollow.save();

    return res.status(error.status.OK).json({
      message: "Now following user",
      status: error.status.OK,
    });
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }   
};
    

exports.removeFollowing = async (req, res) => {
  try {
    const { userIdToRemove } = req.body;
    const currentUser = await USER.findById(req.user._id);
    const userToRemove = await USER.findById(userIdToRemove);
    if (!userToRemove) {
      return res.status(error.status.NotFound).json({
        message: "User to remove not found",
        status: error.status.NotFound,
      });
    }
    if (!currentUser.followings.includes(userIdToRemove)) {
      return res.status(error.status.BadRequest).json({
        message: "You are not following this user",
        status: error.status.BadRequest,
      });
    }
    const userId =new mongoose.Types.ObjectId(userIdToRemove);
    currentUser.followings = currentUser.followings.filter(id => !id.equals(userId));
    await currentUser.save();
    userToRemove.followers = userToRemove.followers.filter(id => !id.equals(currentUser._id));
    await userToRemove.save();

    return res.status(error.status.OK).json({
      message: "You Unfollow This User",
      status: error.status.OK,
    }); 
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }   
};

exports.getFollowings=async(req,res)=>{
  try{
    const find = await USER.findOne({ _id: req.user._id });
    if(find){
      const followingCount = find.followings.length;
      return res.status(error.status.OK).json({
        message: "Your followings count",
        status: error.status.OK,
        followingCount: followingCount
      });
    }
  }catch(e){
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
}

  
exports.getFollowers=async(req,res)=>{
  try{
    const find = await USER.findOne({ _id: req.user._id });
    if(find){
      const followersCount = find.followers.length;
      return res.status(error.status.OK).json({
        message: "Your followers count",
        status: error.status.OK,
        followersCount: followersCount
      });
    }
  }catch(e){
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
}


exports.searchUsername = async (req, res) => {
  try {
    const username = req.body.username;
    const regex = new RegExp(username, 'i'); 
    const find = await USER.aggregate([
      { $match: { username: { $regex: regex } } },
      {
        $addFields: {
          followersCount: { $size: "$followers" },
          followingCount: { $size: "$followings" }
        }
      }
    ]);
    if (find.length > 0) {
      return res.status(error.status.OK).json({
        message: "Users found",
        status: error.status.OK,
        data: find,
      });
    }
    return res.status(error.status.NotFound).json({
      message: "No users found matching the search criteria",
      status: error.status.NotFound,
    });
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};
    
 
// exports.searchUsername = async (req, res) => {
//   try {
//     const username = req.body.username;
//     const regex = new RegExp(username, 'i'); 
//     const find = await USER.aggregate([
//       { $match: { username: { $regex: regex } } },
//       { 
//         $project: {
//           username: 1,
//           email:1,
//           bio:1,
//           gender:1,
//           birthday:1,
//           photo:1,
//           followersCount: { $size: "$followers" },
//           followingCount: { $size: "$followings" }
//         }
//       }
//     ]);
//     if (find.length > 0) {
//       return res.status(error.status.OK).json({
//         message: "Users found",
//         status: error.status.OK,
//         data: find,
//       });
//     }
//       return res.status(error.status.NotFound).json({
//         message: "No users found matching the search criteria",
//         status: error.status.NotFound,
//       });
//   } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// };

exports.likePost = async (req, res) => {
  try {
    const { userLiked_id, post_id } = req.body;
    const findLike=await LIKE.findOne({userLiked_id:userLiked_id,post_id:post_id})
    if(findLike){
      return res.status(error.status.BadRequest).send({
        message: "Already Liked This Post",
        status: error.status.BadRequest,
      });
    }
    const findUser = await USER.findOne({ _id: userLiked_id });
    if (!findUser) {
      return res.status(error.status.BadRequest).send({
        message: "User not found",
        status: error.status.BadRequest,
      });
    }
    const findPost = await POST.findOne({ _id: post_id });
    if (!findPost) {
      return res.status(error.status.BadRequest).send({
        message: "Post not found",
        status: error.status.BadRequest,
      });
    }
    const likeData = {
      userLiked_id: findUser._id,
      post_id: findPost._id,
    };
    const createLike = await LIKE.create(likeData);
    if (!createLike) {
      return res.status(error.status.BadRequest).send({
        message: "Unable to like the post",
        status: error.status.BadRequest,
      });
    }
    return res.status(error.status.OK).send({
      message: "Post liked successfully",
      status: error.status.OK,
      data: createLike,
    });
    
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

exports.removeLikePost = async (req, res) => {
  try {
    const { userLiked_id, post_id } = req.body;
    const findLike=await LIKE.findOne({userLiked_id:userLiked_id,post_id:post_id})
    if(findLike){
      const remove=await LIKE.deleteOne({userLiked_id:userLiked_id,post_id:post_id})
      return res.status(error.status.BadRequest).send({
        message: "Like Removed",
        status: error.status.BadRequest,
      });
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

exports.countLikePost = async (req, res) => {
  try {
    const { post_id } = req.body;
    const findLike=await LIKE.find({post_id:post_id}).countDocuments()
    if(findLike!==null){
      return res.status(error.status.BadRequest).send({
        message: "Like count retrieved successfully",
        status: error.status.BadRequest,
        likes_count:findLike
      });
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
}; 
