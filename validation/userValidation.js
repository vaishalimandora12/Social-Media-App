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

module.exports={
    userSignUpValidation,
    userLoginValidation,
    changePasswordValidation
}