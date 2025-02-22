import { useState } from "react"
import {HiUsers} from 'react-icons/hi'
import {ImTree} from 'react-icons/im'

const CourseCards=({setCurrentCard,courses,card})=>{
    // something has to be done 
    // const [card,setCard]=useState(courses[0].heading);

    const ClickHandler=(value)=>{
        //something will be don
        setCurrentCard(value);
        console.log("cards courses are->",courses);

        //done 
    }
    return (<div  className="flex  ">

        {  
            courses.map((element,index)=>{
                return (
                    <div  onClick={() => { ClickHandler(element.heading) }}
                    className={`${element.heading===card?"bg-white shadow-yellow-100 shadow-[10px_10px_0_0]":"bg-richblack-700"} h-[250px] w-[250px] text-richblack-600 mx-10 mt-10 hover:cursor-pointer transition-all duration-75`} key={index}>
                                <div className={`border-b-2 border-dashed `}>
                                {/* description something */}

                                <div className={`${element.heading==card?"font-bold text-richblack-900":"font-bold text-white"}`}>{element.heading}</div> 
                                <div>{element.description}</div>
                                </div>
                                <div className="flex justify-between mx-3 ">
                                    {/* beginner level */}
                                    <div className="flex gap-2"> 
                                        <HiUsers className="text-blue-300"></HiUsers>
                                        <p className="text-blue-300">{element.level}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <ImTree className="text-blue-300"></ImTree>
                                        <p className="text-blue-300">{element.lessionNumber}</p>
                                    </div>
                                </div>
                 </div>
                )
            })
        }
       
    </div>);

}
export default CourseCards;