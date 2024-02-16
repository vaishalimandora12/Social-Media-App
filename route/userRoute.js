const express=require("express")
const router=express.Router();
const userAuthController=require("../controller/user/authController");
const userController=require("../controller/user/userController");
const message=require("../middleware/validationError")
const VERIFY_USER=require("../middleware/authMiddleware")
const validation=require("../validation/userValidation");



router.post('/signUp',validation.userSignUpValidation,message.errorResponse,userAuthController.signUp);
router.post('/login',validation.userLoginValidation,message.errorResponse,userAuthController.login);
router.patch('/changePassword',VERIFY_USER.verifyUserToken,validation.changePasswordValidation,message.errorResponse,userAuthController.changePassword);
router.post('/logout',VERIFY_USER.verifyUserToken,userAuthController.logout);
router.patch('/editProfile',VERIFY_USER.verifyUserToken,userController.editProfile)

module.exports=router;