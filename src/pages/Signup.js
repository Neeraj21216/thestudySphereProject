import SignUpForm from "../components/core/signup/SignupForm";
import Backgroundpic from "../assets/images/frame (1).png"
import signuppic from "../assets/images/signup.webp"
const SignUp=()=>{



    return (
        <div className="flex items-center mt-10  ">
                <div className="w-[80%] mx-5 mt-5 flex flex-col  " >
                        <p className="font-bold text-2xl font-inter mb-4 text-richblack-5 w-[35%]">Join the millions learning to code with StudyNotion for free</p>
                        <p className="text-richblack-300 text-lg">Build skills for today, tomorrow, and beyond.</p>
                        {/* niche wale ka font change hoga */}
                        <p className="font-edu-sa text-blue-100 mb-10">Education to future-proof your career.</p>
                        <SignUpForm></SignUpForm>
                         

                </div>
                <div  className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 mr-24">
                        <img src={Backgroundpic} className="relative translate-x-10  mt-3 "></img>

                        <img src={signuppic}  className="absolute top-[10%] h-[430px] w-[ 504px]"/>

                </div>
            
        </div>
    );

}
export default SignUp;