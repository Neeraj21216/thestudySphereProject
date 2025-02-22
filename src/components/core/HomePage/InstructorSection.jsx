import instructorPic from "../../../assets/images/Instructor.png"
import HighlighText from "./HighlighText";
import CTNButtons from "./CTNButtons"
import { FaArrowRight } from "react-icons/fa";

const instructorSection=()=>{
    return (
        <div className="">
            {/* you will have to do something */}
            <div className="flex mx-9 ">
            <div className="w-[45%] mt-16 " >
                <img src={instructorPic} className="shadow-white  shadow-[-20px_-20px_0_0]"></img>
            </div>

            <div className="w-[65%] mt-48 mx-20 ">
                <div className="text-4xl text-white font-bold">
                    Become An
                </div>
                <HighlighText text={"instructor"}></HighlighText>
                <div className="text-richblack-200 text-lg mt-12 w-[90%]">
                instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </div>
                <div className="flex  mt-8 " >
                <CTNButtons  active={true} toLink={"/signup"}>
                   <div className="flex items-center gap-2 ">
                   Start Teaching Today
                   <FaArrowRight></FaArrowRight>
                   </div>
                </CTNButtons>
                </div>
            </div>
            </div>
            <div className="mt-16"></div>

        </div>
    );

}
export default instructorSection;