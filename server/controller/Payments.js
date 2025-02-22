const {instances}=require("../config/razorpay");
const Course=require("../model/Course");
const User=require("../model/User");
const mailsender=require("../utils/mailSender");
// const {courseEnrollmentEmail}=require("../");
const { mongo, default: mongoose } = require("mongoose");
const mailSender = require("../utils/mailSender");
const { useId } = require("react");
const crypto = require('crypto');
const {courseEnrollment}=require("../mail/template/courseEnrollmentEmail")

//capture the Payment and initiate the Razorpay Order


const RAZORPAY_KEY="rzp_test_OQiiQ8eOascqbx";
const RAZORPAY_SECRET="fkjShpKECwZucmaJYJMctwPy";
exports.capturePayment=async (req,res)=>{
    const {courses}=req.body;
    const userId=req.user.id;
    //console.log("course inside payement is",courses);
    if(courses.length===0){
        return res.json({
            success:false,
            message:"Please Provide Course Id"
        })
    }

    let totalAmount=0;
    for(const Course_id of courses){
        let course;
        try {
            course=await  Course.findById(Course_id);
            //check here things may go wrong 
            if(!course){
                return res.json({
                    success:false,
                    message:"Could Not find the Course",
        
                })
            }

            const uid=new mongoose.Types.ObjectId(userId);
            let value=false;
        //    console.log("course is ",course);
          course.studentsEnrolled.forEach(students => {
            if(students._id.equals(uid)){
                value = true;
            }
        });
        

            if(value){
                return res.status(200).json ({
                    success:false,
                    message:"Student already Enrolled in this course",


                })
            }

            //what do you need to do 
            totalAmount+=course?.price;


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Something problem created inside the capturePayment",
                error:error.message,

            })
        }
    }



    const options={
        amount:totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),

    }
    try {
        const PaymentResponse=await instances.orders.create(options);
        res.json({
            success:true,
            data:PaymentResponse,
        })
  

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could not initiate Order",
        })
    }

}


//verify the payment 
exports.verifyPayment=async(req,res)=>{
    console.log("body is",req.body);
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses=req.body?.courses;
    const userId=req.user.id;

    if(!razorpay_order_id||!razorpay_payment_id||!razorpay_signature
        ||!courses||!userId
    ){
        res.status(200).json({
            success:false,
            message:"Payment failed",

        })
    }

    let body=razorpay_order_id+ "|"+razorpay_payment_id;
    const expectedSignature=crypto.createHmac("sha256",RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

    if(expectedSignature==razorpay_signature){
        //enroll course krwao student ko 
        await enrollStudents(courses,userId,res);

        //return res
        return res.status(200).json({
            success:true,
            message:"Payment successful",
                })
    }




}



const enrollStudents=async(courses,userId,res)=>{
   try{
    if(!courses||!userId){
        return res.status(400).json({
            success:false,
            message:"Please Provide data for Course or UserId",
        })
    }
    

    for (const courseId of courses){
        //find the course and enroll the student in tit
        const enrolledCourse=await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{
                studentsEnrolled:userId,
            }}
            ,{new:true}

        )
        console.log("enroll course is",enrolledCourse);
        //validate the course
        if(!enrolledCourse){
            return res.status(500).json({
                success:false,
                message:"Course Not found",

            })
        }
        //find the student and add the course to their list of enrolled Course
        const enrolledStudents=await User.findByIdAndUpdate(userId,
            {$push:
                //some locha here but do carefull
                    {                courses:courseId,
                    }                
            }
            ,{new:true}
        );

        //bachhe ko mail send krdo 
        const title=`successfully Enrolled into ${enrolledCourse.courseName}`;
        const body=`successfullyenrolled`;
        console.log("email inside controller is ",enrollStudents.email);
        const email=`${enrollStudents.email}`
        const emailResponse=await mailSender(
            email,
            title,
            body,
            

        )
        console.log("Email Sent Successfully",emailResponse.response);

    }
   }catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"could Not enroll studdent",
    })
   }
}
//ise try catch kr dekhlena 

//sendSuccessfullemail
exports.sendPaymentEmail=async(req,res)=>{
    const {orderId,paymentId,amount}=req.body;

    const userId=req.user.id;
    if(!orderId||!paymentId||!amount||!userId){
        return res.status(400).json({
            success:false,
            message:"Please Provide all the fields",

        })
    }
    try{
        //student ko dhundo 
        const enrolledStudent=await User.findById(userId);
        const response=await mailsender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
                amount/100,orderId,paymentId
            )
        )   

    }catch(error){

        console.log("error in sending email",error);
        return res.status(500).json({
            success:false,
            message:"Could not send Email",
        })

    }


}















// exports.capturePayment=async (req,res) => {
    
//         //get CourseId  and UserId 
//         const {course_id}=req.body;
//         const userId=req.user.id;
//         //validation 
//         //valid CourseId 
//         if(!course_id){
//             return res.status(400).json({
//                 success:false,
//                 message:"Please Provide Valid Course ID",
//             })
//         };

//         //valid courseDetail
//         let course;
//         try {
//             course=await Course.findById(course_id);
//             //
//             if(!course){
//                 return res.status(400).json({
//                     success:false,
//                     message:"could NOt find the course",
//                 })
//             }

//             //user already paid for the same course 
//             const uid=new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Student is already Enrolled",
//                 })
//             }
            

//         } catch (error) {
//            console.error(error);
//            return res.status(500).json({
//             success:false,
//             message:"problem during payment Process verification",
//             error:error.message,
//            }) 
//         }
//         //order create Kro 
//         const amount=course.price;
//         const Currency="INR";
//         const Options={
//             amount:amount*100,
//             Currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:course_id,
//                 userId,
//             }

//         };

//         try {
//             //initiate the payment using razrorpay
//             const paymentResponse=await instances.orders.create(options);
//             console.log(paymentResponse);
//             //return response
//             return res.json({
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescritpion:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId:paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount,
//             })
//         } catch (error) {
            
//         }

// }



// //verification and authorisation
// //hmac requires hash algo and secret_key,

// exports.verifySignature=async (req,response) => {
//     const webhookSecret="12345678";
//     const signature=req.headers["x-razorpay-signature"];
//     const shashum=crypto.createHmac("shah256",webhookSecret);
//     shashum.update(JSON.stringify(req.body));
//     //digest is generally inhexadecimal format
//     //req.does not contain user id its came from api heat
//     //req.body.payload.payment.entity.notes it contiain inserted notes object
//     const digest=shashum.digest("hex");

//     if(signature===digest){
//         console.log("Payment is Authorised");
//         const {courseId,userId}=req.body.payload.entity.notes;

//         try {
//             //fullfill the action 

//             //find the course and enroll the students in it
//             const enrolledCourse=await Course.findOneAndUpdate(
//                 {_id:courseId},
//                {
//                 $push:{ studentsEnrolled:userId,}
//                },{new:true},
//             );

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course Not found",
                       
//                 })
//             }
//             console.log(enrolledCourse);

//             //find the student and add to their list enrolled course me
//             const enrolledStudents=await User.findOneAndUpdate({_id:userId},
//                                 {
//                                     $push:{
//                                         courses:courseId,

//                                     }
//                                 },{new:true},
//             );

//             //mail send krdo confirmation wala
//             const emailResponse=await mailSender(
//                 enrolledStudents.email,
//                 "Congratulation From codehelp",
//                 "Congratulation ,you are onboarded into new Codehelp Course",
//             )
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature Verified and Course Added",
//             });

//         } catch (error) {
//             console.log(error);
//             return res.status(400).json({
//                 success:false,
//                 message:"Problem during Signature verification",
//             })
//         }
//     }

    
// }
