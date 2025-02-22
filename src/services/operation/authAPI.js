import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { setLoading } from "../../slices/authSlice" 

import { endpoints,profileApis } from "../apis"
import { useDispatch, useSelector } from "react-redux";
import {setToken,} from  "../../slices/authSlice"
import {setUser} from "../../slices/profileSlice"
// import { Navigate } from "react-router";
//reset password Token

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
     

}=endpoints;



export function  getPasswordToken(email,setSentEmail){
    return async(dispatch)=>{
        setLoading(true);
        

        try {

            const response=await apiConnector("POST",RESETPASSTOKEN_API,{email,});
            console.log("getPasswordToken response is ",response);
            if(!response.data.success){
                throw new Error(response.data.message);
                
            }
            toast.success("Email Sent Successfully");
            setSentEmail(true);
        } catch (error) {
            toast.error("Problem sending Token");
            console.log("problem in getting password Token",error);
        }
        setLoading(false);
    }
}

export function resetPassword(password,confirmPassword,token){
    //something will have to done 
    return async(dispatch)=>{
       try {
        // console.log("password is ",password,"hello ",confirmPassword);
        const response=await apiConnector("PUT",RESETPASSWORD_API,{password,confirmPassword,token,});

        console.log("ResetResponse is :->",response);
        if(!response.data.success){
            throw new Error(response.data.message);
            
        }
        toast.success("Password Reset Successfully");
       } catch (error) {
        toast.error("Problem sending Token");
            console.log("problem in getting password Token",error);
       }
    }

}

export function sendOtp(email,navigate){
    console.log("hello ");
    return async()=>{
        try{  
            const response=await apiConnector("POST",SENDOTP_API,{email,});
            console.log(response);
            if(!response.data.success){
                console.log("Error in sending otp",response.data.message);
                 throw new Error(response.data.message);

            }

            toast.success("OTP sent Successfully");
           if(response.data.success)
               navigate("/verify-Email")
            //how will you handle verify email tag is now concern here

            

        }catch(error){
            toast.error("Problem sending OTP");
            console.log("problem in Sending oTP",error);
        }
    }
}
export function signUpFunction(
           firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
            navigate
){  
    console.log("hello i am here at singupfunction connector")
    return async()=>{
        try{  
            const response=await apiConnector("POST",SIGNUP_API,{
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                accountType,});


            console.log(response);
            if(!response.data.success){
                console.log("Error in sending otp",response.data.message);
                 throw new Error(response.data.message);

            }

            toast.success("OTP sent Successfully");
          

            

        }catch(error){
            toast.error("Problem sending OTP");
            console.log("problem in Sending oTP",error);
        }
    }
}
export function loginFunction (email,password,dispatch,navigate){

   return async ()=>{

    try{

        const response=await apiConnector("POST",LOGIN_API,{email,password});
        if(!response.data.success){
            throw new Error(response.data.message);
            
        }

        console.log(response.data.token);
        // setToken(response.data.token);
        // console.log(token);
        

        toast.success("Login Successfull");
        
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))

        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        
        navigate("/dashboard/my-profile")


    }catch(error){
        toast.error("Problem in Login ");
        console.log(error);

    }
   }

}

export function logout(dispatch,navigate){

    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
     //   dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
         navigate("/")
      }


    

}


