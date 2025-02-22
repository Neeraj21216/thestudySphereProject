import HighlighText from "./HighlighText"
import pic1 from "../../../assets/images/Plan_your_lessons.svg"
import pic2 from "../../../assets/images/Know_your_progress.svg"
import pic3 from "../../../assets/images/Compare_with_others.svg"
import CTNButtons from "./CTNButtons"

const learningSection=()=>{
    return (
        <div className="mt-20 flex flex-col items-center text-center">
            <div className="font-bold flex items-center justify-center text-4xl text-richblack-900">
            Your swiss knife for
            <HighlighText text={"learning any language"} ></HighlighText>
            </div>
            <div  className="text-xl text-richblack-600 flex  w-[70%] mx-72">
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>
            <div className="flex flex-row items-center justify-center gap-0">
              <img src={pic2} className=" object-contain translate-x-20 "></img>
              <img src={pic3} className="-translate-x-2  "></img>

                <img src={pic1} className="-translate-x-36"></img>
            </div>
            <div className="text-xl w-fit -mt-4">
                <CTNButtons active={true}  className="flex " >
                    Learn More
                </CTNButtons>
            </div>
            <div className="mt-40"></div>
        </div>
    );
}
export default learningSection;