import { useState } from "react";
import CTAButtons from "../components/core/HomePage/CTNButtons";
import Girlimage from "../assets/images/login.webp"
import Backgroundpic from "../assets/images/frame (1).png"
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginFunction } from "../services/operation/authAPI";
//form data ko kaise manange kruga 
const Login=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
     const {token}=useSelector((state)=>state.auth);

    const [loginFormData,setLoginFormData]=useState({
        email:"",
        password:"",
    });
    //click handler ko kaise filder 
//    const [loginFormData, setLoginFormData] = useState({ name: "", email: "" });

const changeHandler = (event) => {
  setLoginFormData({ ...loginFormData, [event.target.name]: event.target.value });
  console.log(loginFormData); // Logs the *previous* state
};

    const submitHandler=(e)=>{
        console.log(loginFormData);
        e.preventDefault();


        dispatch(loginFunction(loginFormData.email,loginFormData.password,dispatch,navigate));
        console.log(token);
        
    }

    return (
        <div className="w-11/12  flex items-center bg-richblack-900 justify-around">
            <div className="flex flex-col mt-20">
                <p className="font-bold text-4xl font-inter mb-4 text-richblack-5">Welcome Back</p>
                <p className="text-richblack-300 text-lg">Build skills for today, tomorrow, and beyond.</p>
                {/* niche wale ka font change hoga */}
                <p className="font-edu-sa text-blue-100 mb-10">Education to future-proof your career.</p>
                <form onSubmit={submitHandler}>
                    <label className="" >
                        Email Address 
                        <sup className="text-pink-200">*</sup>
                        <br></br>
                        <input type="email" name="email"  value={loginFormData.email} required  className=" mt-2 rounded-md bg-richblack-700  py-2 mb-2 w-full pl-2 placeholder:mx-3" placeholder="Enter Email Address " onChange={changeHandler}></input>
                    </label>
                    <br></br>
                    <label className="mt-5" >
                        Password  
                        <sup className="text-pink-200">*</sup>
                        <br></br>
                        <input type="password" name="password" value={loginFormData.password} className=" mt-2 rounded-md bg-richblack-700 py-2 mb-2 w-full pl-2" required placeholder="Enter Password" onChange={changeHandler} ></input>
                    </label>
                    <div className="flex flex-row-reverse text-blue-100 mt-0">
                       <Link  to="/forgot-password">
                       <p>forgot password</p>
                       </Link>
                    </div>
          <button className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] w-full font-medium text-richblack-900">
                Sign In
            </button>


                </form>
            </div>
            <div>
            <img src={Backgroundpic} className="relative translate-x-6 top-24"></img>

                {/* girl image  */}
                <img src={Girlimage}  className="absolute top-[20%]"/>

            </div>
        </div>
    );
}
export default Login;