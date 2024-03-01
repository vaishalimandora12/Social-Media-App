const { body,check,query, param} = require('express-validator');

const userSignUpValidation=[
    body('username').notEmpty().withMessage("username is required"),
    body('email').notEmpty().withMessage("Email is required"),
    body('password').notEmpty().withMessage("password is required"),
]

const userLoginValidation=[
    body('email').notEmpty().withMessage("Email is required"),
    body('password').notEmpty().withMessage("password is required"),
]

const changePasswordValidation=[
    body('newPassword').notEmpty().withMessage("newPassword is required"),
    body('currentPassword').notEmpty().withMessage("currentPassword is required"),
]

const addPostValidation=[
    body('media_url').notEmpty().withMessage("media_url is required"),
]

const editPostValidation=[
    body('media_url').notEmpty().withMessage("media_url is required"),
]

const addFollowingvalidation=[
    body('userIdToFollow').notEmpty().withMessage("userIdToFollow is required"),
]

const removeFollowingValidation=[
    body('userIdToRemove').notEmpty().withMessage("userIdToRemove is required"),
]

const likePostValidation=[
    body('userLiked_id').notEmpty().withMessage("userLiked_id is required"),
    body('post_id').notEmpty().withMessage("post_id is required"),
]

const removelikePostValidation=[
    body('userLiked_id').notEmpty().withMessage("userLiked_id is required"),
    body('post_id').notEmpty().withMessage("post_id is required"),
]

module.exports={
    userSignUpValidation,
    userLoginValidation,
    changePasswordValidation,
    addPostValidation,
    editPostValidation,
    addFollowingvalidation,
    removeFollowingValidation,
    likePostValidation,
    removelikePostValidation

}