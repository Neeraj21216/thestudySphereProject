import { useState } from "react";
import {HomePageExplore} from "../../../data/homePage-explore"
import HighlighText from "./HighlighText";
import CourseCards from  "../HomePage/CourseCards"

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];


const ExploreMore=()=>{
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [course,setCourse]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);
    
    const ClickHandler=(value)=>{

        console.log(value);
        setCurrentTab(value);
        //filter kaise lgana h 
        const resultCourse = HomePageExplore.filter((course) => 
            course.tag && course.tag === value
        );

                setCourse(resultCourse[0].courses);
        console.log(resultCourse);

        console.log("courseare ->",resultCourse[0].courses);
        setCurrentCard(resultCourse[0].courses[0].heading);
    }

    return (
        <div className="flex items-center flex-col" >
            <div className="text-4xl font-inter font-bold ">
                Unlock the 
                <HighlighText text={"Power of Code"}></HighlighText>
            </div>
            <div className="flex items-center justify-center">
            <div className="text-lg text-richblack-500  mt-2 mb-3">Learn to Build Anything You Can Imagine</div>

            </div>
            <div className="bg-richblack-800 rounded-full border-b-[1px] border-richblack-200 ">
           <div  className="flex gap-3 px-20 py-1 justify-center items-center  ">
           { 
           tabsName.map((element, index) => {
            return (
                <div className={`text-base  font-inter ${element===currentTab ?"bg-richblack-900 text-white ":"bg-richblack-800 text-richblack-300"} rounded-full hover:bg-richblack-900  hover:scale-95 w-fit transition-all duration-200 cursor-pointer`}
                    key={index}
                    onClick={()=>{ClickHandler(element)}}
                >
                   <p className="px-2 py-2 mx-2"> {element}</p>
                </div>
            );
        })
        
            }
           </div>
            </div>
            <div className="mt-4 ">
                {/* {console.log(course)} */}
                
                <CourseCards card={currentCard}  setCurrentCard={setCurrentCard} courses={course}  ></CourseCards  >
            
            </div>
        </div>
    );
   
}
export default ExploreMore;