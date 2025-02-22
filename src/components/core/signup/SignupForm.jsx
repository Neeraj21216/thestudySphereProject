import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../../services/operation/authAPI";
import { useNavigate } from "react-router";
import { setSignupData } from "../../../slices/authSlice";


const SignUpForm=()=>{

    const [isStudent,setIsStudent]=useState(true);
    const [signupFormData,setsignupFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",

        
    });
    const dispatch=useDispatch();
    const navigate=useNavigate();

   const changeHandler = (event) => {

  setsignupFormData({ ...signupFormData, [event.target.name]: event.target.value });
  
     
  console.log(signupFormData);

  
  console.log(signupFormData); // Logs the *previous* state
};
const accountType=isStudent?"Student":"Instructor";
// const {signupData}=useSelector((state)=>state.auth);

const submitHandler=(event)=>{
    event.preventDefault();
    const   signupData={...signupFormData,accountType};
    console.log(signupData.firstName);
       dispatch(setSignupData(signupData));


    dispatch(sendOtp(signupData.email,navigate));
    //reset krdo sare unsbko  its remaining you will have to handle those codes and go on and find out what do you like to do 


   
}

const clickHandler = (value) => {
    // setsignupFormData({ 
    //     ...signupFormData, 
    //     student: value, // Use "student" as a string to reference the property
    //     instructor: !value // Can be simplified to `true`
    // });
    console.log(signupFormData);
    setIsStudent(value);
    console.log(isStudent);
};

    return (
        <div className="text-white  w-[11/12]">
        
            <span className="flex w-[40%] gap-2 bg-richblack-800 rounded-full border-b-[1px] border-richblack-300  items-center justify-center mb-8"  >
                <div onClick={()=>{clickHandler(true)}} className={`${isStudent?"bg-richblack-900  text-richblack-5 ":"bg-richblack-800 text-richblack-600 "} rounded-full px-4  py-2 my-1 `}> student </div>
                <div onClick={()=>{clickHandler(false)}} className={`${!isStudent?"bg-richblack-900 text-richblack-5  ":"bg-richblack-800 text-richblack-600 "} rounded-full px-4 py-2 my-1`}> Instructor</div>
            </span>
         <div className="my-3">
            <form onSubmit={submitHandler}>
                {/* login Sectioin  */}
                <div className="flex  gap-4 my-2 ">
                    <label className="flex flex-col gap-y-1">
                        <p>First Name
                        <sup className="text-pink-400">*</sup>

                        </p>
                        <input type="text" required  
                        placeholder="Enter First Name"
                        name="firstName"
                        value={signupFormData.firstName}
                        className="px-1 py-3 bg-richblack-700 text-richblack-400 rounded-md border-b-[1px] border-richblack-300"
                                                onChange={changeHandler}

                        ></input>
                    </label>
                    <label className="flex flex-col gap-y-1">
                    <p>Last Name
                        <sup className="text-pink-400">*</sup>

                        </p>
                        <input type="text" required  
                        placeholder="Enter Last Name"
                        name="lastName"
                        value={signupFormData.lastName}
                        className="px-1 py-3 bg-richblack-700 text-richblack-400 rounded-md border-b-[1px] border-richblack-300"
                        onChange={changeHandler}
                        ></input>
                    </label>
                </div>

            
            {/* email section */}
                <div>
                <label className="flex flex-col gap-y-1 my-2">
                        <p>Email Address
                        <sup className="text-pink-400">*</sup>

                        </p>
                        <input type="email" required  
                        placeholder="Enter email adress"
                        name="email"
                        value={signupFormData.email}
                        className="px-1 py-3 w-[55%] bg-richblack-700 text-richblack-400 rounded-md border-b-[1px] border-richblack-300"
                                                onChange={changeHandler}

                        ></input>
                    </label>
                </div>


            {/* Password Section */}
                <div className="flex  gap-4 my-2">
                    <label className="flex flex-col gap-y-1">
                        Password 
                        <sup className="text-pink-400">*</sup>
                        <input type="password" required  
                        placeholder="Enter Password"
                        name="password"
                        value={signupFormData.password}
                        className="px-1 py-3 bg-richblack-700 text-richblack-400 rounded-md border-b-[1px] border-richblack-300"
                                                onChange={changeHandler}

                        ></input>
                    </label>
                    <label className="flex flex-col gap-y-1">
                        Confirm Password 
                        <sup className="text-pink-400">*</sup>
                        <input type="password" required  
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={signupFormData.confirmPassword}
                        className="px-1 py-3 bg-richblack-700 text-richblack-400 rounded-md border-b-[1px] border-richblack-300"
                                                onChange={changeHandler}

                        ></input>
                    </label>
                </div>
                <button className="bg-yellow-100 text-richblack-900 w-[55%] rounded-md  " type="submit">
                    <p className=" py-2">
                    Create Account

                    </p>
                </button>

            </form>
         </div>
    </div>

    );

}
export default SignUpForm;