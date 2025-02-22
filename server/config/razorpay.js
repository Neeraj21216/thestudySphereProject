const Razorpay=require("razorpay");
const RAZORPAY_KEY="rzp_test_OQiiQ8eOascqbx";
const RAZORPAY_SECRET="fkjShpKECwZucmaJYJMctwPy";
exports.instances=new Razorpay({
    key_id:RAZORPAY_KEY ,
    key_secret:RAZORPAY_SECRET,
});