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
router.get('/getMyProfile',VERIFY_USER.verifyUserToken,userController.getMyProfile);
router.patch('/updateAccountType',VERIFY_USER.verifyUserToken,userController.updateAccountType);
router.post('/addPost',VERIFY_USER.verifyUserToken,validation.addPostValidation,userController.addPost);
router.patch('/editPost/:postID',VERIFY_USER.verifyUserToken,validation.editPostValidation,userController.editPost);
router.get('/viewMyPost/:postID',VERIFY_USER.verifyUserToken,userController.viewMyPost);
router.delete('/deleteMyPost/:postID',VERIFY_USER.verifyUserToken,userController.deleteMyPost);


module.exports=router;