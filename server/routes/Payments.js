
const express=require("express");
const router=express.Router();
const {auth,isAdmin,isInstructor,isStudent}=require("../middleware/auth")

const {capturePayment,verifyPayment,sendPaymentEmail}=require("../controller/Payments")


router.post("/capturePayment",auth,isStudent,capturePayment);
//iske under authorisation lga lnea
router.post("/verifyPayment",auth,isStudent,verifyPayment);
router.post("/sendPaymentEmail",auth,isStudent,sendPaymentEmail);

  
  
module.exports=router;
