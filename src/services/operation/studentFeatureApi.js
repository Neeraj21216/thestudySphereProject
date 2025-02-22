
import toast from "react-hot-toast";
import { studentEnpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import {setPaymentLoading} from "../../slices/courseSlice"
import { resetCart } from "../../slices/cartSlice";
import  Studynotionlogo from "../../assets/Logo/rzp_logo.png"

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEnpoints;
//loading the script something like structure 

const RAZORPAY_KEY="rzp_test_OQiiQ8eOascqbx";
const RAZORPAY_SECRET="fkjShpKECwZucmaJYJMctwPy";
function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;
        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script)
    })
}


//buy course
export async function buyCourse(token ,courses,user,Navigate,dispatch){
    const toastId=toast.loading("Loading...");
    try {
        //laod the script 
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("Failed to load Razorpay SDK");
            return;
        }

   
        //initiate the order 

        const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,{courses},
            {
                Authorization:`Bearer ${token}`,

            }
        );
        console.log("order response is ",orderResponse);
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);

            
        }

        const options = {
            key: RAZORPAY_KEY,
            currency: orderResponse.data.data.currency, // Change from message.currency
            amount: `${orderResponse.data.data.amount}`, // Change from message.amount
            order_id: orderResponse.data.data.id, // Change from message.id
            name: "Studynotion",
            description: "Thank you for purchasing the course",
            image: Studynotionlogo,
            prefill: {
                name: `${user?.firstName}`,
                email: user?.email
            },
            handler: function (response) {
            //    sendPaymentEmail(response, orderResponse.data.data.amount, token);
               verifyPayment({ ...response, courses }, token, Navigate, dispatch);
                console.log("inside hander response is",response);
            },
        };
        //console.log("options is",options);
        const paymentObject=new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed",function (response){
            console.log("response is",response);

        })
        
  

    } catch (error) {
        console.log(error);
        
    }
    toast.dismiss(toastId);

}

async function sendPaymentEmail(response,amount,token){
    console.log("helllo i am inside mail");

    try {
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            order_id:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,
        },{
            Authorization:`Bearer ${token}`
        })
        
    } catch (error) {
        toast.error(error.message);
        console.log("PAYMENT SUCCESS ERROR ",error);

    }
 

}

async function verifyPayment(bodyData,token,Navigate,dispatch){
    console.log("i am inside verify payemnte");
    const toastId=toast.loading("Verifying Payment");
    dispatch(setPaymentLoading(true));

    try{
        const response=await apiConnector("POST",COURSE_VERIFY_API,
            bodyData,{
                Authorization:`Bearer ${token}`,
            }
        )
        if(!response.data.success){
            throw new Error(response.data.message);

            
        }
        toast.success("payment Successfull ,you are added to the course");
        Navigate("/dashboard/enrolled-courses");
        dispatch(resetCart())

    }catch(error){
        console.log("PAYMENT verify ERROR ",error);
        toast.error("could not verify Payment");
        

    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));


}
