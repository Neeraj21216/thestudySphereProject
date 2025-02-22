import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { apiConnector } from "../../../../services/apiConnector"
import { getEnrolledCourses } from "../../../../services/operation/CourseDetailAPI";

import ProgressBar from "@ramonak/react-progress-bar";
const EnrolledCourse=()=>{
    
    const {cart}=useSelector((state)=>state.cart);
    const {totalItems}=useSelector((state)=>state.cart);
    //from where would You findout the cart is that depend on us 
    const [enrolledCourses,setEnrolledCourses]=useState([]);
    const {token}=useSelector((state)=>state.auth);
    
    const getEnrolledCourse=async ()=>{
        try{

            const response=await getEnrolledCourses(token);
            if(response){
             setEnrolledCourses(response);
            }
        }catch(error){
            console.log(error);

        }

    }
    useEffect(()=>{
        getEnrolledCourse();
    },[])

    if(!enrolledCourses){
        return (<div>laoding...</div>)
    }

    return (<div className="text-white">
        <div>EnrolledCourse</div>
       {
        !enrolledCourses.length?(<div>You have not enrolled in any courses </div>):(
            <div className="text-richblack-25">
              
                <div>
                    {/* some heading will come */}
                    <div className="flex ">
                        <button>all</button>
                        <button>Pending</button>
                        <button>Completed</button>
                    </div>

                </div>
                <div>
                    { enrolledCourses.map((course,index)=>{
                       return  <div className="flex mx-5 my-10 gap-4 ">
                       <div className="flex  gap-2 ">
                       <img src={course.thumbnail} className="h-[80px] w-[90px] rounded "></img>
                       <div className="flex flex-col flex-wrap">
                           <p>{course.courseName}</p>
                           <p className="text-richblack-500">{course.courseDescription}</p>
                        </div>
                   </div>
                   <div>
                       2hr 30 min 
                   </div>
                   <div  className="gap-y-2 " >
                    <p>progress:{course?.progress||0}</p>
                    <ProgressBar completed={course?.progress||50}></ProgressBar>
                     
                   </div>
                   {/* yeah you need to do something with it and go on like that  */}
                   {/* course  */}

                   </div>


                    })
                     }       
             </div>
            </div>
        )
       }
    </div>)
}

export default EnrolledCourse;