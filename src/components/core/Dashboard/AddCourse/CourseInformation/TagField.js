import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RxCross2 } from "react-icons/rx";
import { Tuple } from "@reduxjs/toolkit";



const TagField=(
    {label,name,placeholder,
    register,setValue,getValues,
    errors}
)=>{



    const {course,editCourse}=useSelector((state)=>state.course);
    const [tagList,setTagList]=useState([]);
    useEffect(() => {
        if(editCourse) {
            setTagList(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{
        setValue(name,tagList)
    },[tagList]);
    const handleKeyDown=(e)=>{
        if(e.key==="Enter"||e.key===","){
            e.preventDefault();
          //  console.log("hello");
            const tagValue=e.target.value.trim();
            if(tagValue && !tagList.includes(tagValue)){
                const newTagList=[...tagList,tagValue];
               setTagList(newTagList);
               e.target.value="";

            }

        }

    }
  
    const removeTag=(tag)=>{
        const newTagList=tagList.filter((tags)=>tags!=tag);
        setTagList(newTagList);
    }
    return (
        <div className="w-full ">
            <label>{label}</label> 
            <div className="flex gap-3 flex-wrap ">
                {
                    tagList.length>0 && tagList.map((tags ,index)=>(
                         <div key={index} className=" text-white  flex   ">
                            <div className="bg-yellow-50 rounded-md  flex items-center gap-2 px-1 py-1   ">
                            <p>{tags}</p>
                            {/* ispe click pe kuch krna  */}
                            <RxCross2 onClick={()=>removeTag(tags)}  />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                <input
                
                onKeyDown={(e)=>handleKeyDown(e)}
                className="text-white bg-richblack-700 w-full mx-1 my-3 mr-1 "
                placeholder={placeholder}

                ></input>
            </div>
            {        
                errors.name && (<span>tags is also required </span>)
            }
        </div>
    );
        
}
export default TagField;