const express = require("express");
const router = express.Router();

const {updateProfile,updateDisplayPicture,deleteAccount,getAllUserDetails,instructorDashboard}=require("../controller/Profile");
// const { get } = require("mongoose");
4
const {auth,isInstructor}=require("../middleware/auth");

//******************************************************************************** */
//                      Routes for Profile
//********************************************************************************** */

router.put("/updateProfile",auth,updateProfile);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);
router.delete("/deleteAccount",auth,deleteAccount);
router.get("/getAllUserDetails",auth,getAllUserDetails);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports=router;

 