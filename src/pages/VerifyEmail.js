import { useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signUpFunction } from "../services/operation/authAPI";


const VerifyEmail=()=>{
    //just go on and then find out 
    //just go and find out 
    console.log("hello ");
    const [otp,setOtp]=useState("");
    const {signupData}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const submitHandler=(e)=>{
        console.log(signupData);
        e.preventDefault();
        //agr otp milgya so kaise verify kaise kreng wegot tha 
        console.log(otp);

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
        }=signupData;

        //singupcall maar do 
        dispatch(signUpFunction(
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
            navigate
        ));

        


    }

    return (
        <div className="text-white">
            <div>Verify Email</div>
            <div>A verification Code has been Sent to you .Enter the code below</div>
            <form onSubmit={submitHandler} className="text-yellow-5">
                <OTPInput
                value={otp}
                onChange={(value)=>{setOtp(value)}}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                className="text-black"
                ></OTPInput>
                <button type="submit">
                    Verify Email
                </button>
            </form>
            <div>
                
                <Link to="/login">
                <div>
                <BiLeftArrow></BiLeftArrow>
                <p>Back To login</p>   
                </div>
                </Link>
                <button>
                    Resend Otp
                </button>
            </div>
            
        </div>
    );
}
export default VerifyEmail;