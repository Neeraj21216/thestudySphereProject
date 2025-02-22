import { useForm } from "react-hook-form"
import IconBtn from "../../../../common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import NestedView from "./NestedView";
import { BiRightArrow } from "react-icons/bi";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { createSection, editSection } from "../../../../../services/operation/CourseDetailAPI";
import SubSectionModal from "./SubSectionModal";


const CourseBuilderForm=()=>{
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},

    }=useForm();
    const [editSectionName,setEditSectionName]=useState(false);
    const {editCourse,course,step}=useSelector((state)=>state.course);
    const [loading,setLoading]=useState(false);
    const {token}=useSelector((state)=>state.auth)

 
    const dispatch=useDispatch();
    
    const cancelEdit=()=>{
        setEditSectionName(null);
        setValue("sectionName","");
        
    }
    const nextHandler=()=>{
        console.log("course is",course);
        if(course && course.courseContent.length==0){
            toast.error("Ateast add one section ")
            return ;
        }
        if(course && course.courseContent.some((section)=>section.subSection.length===0)){
            toast.error("Please add atleast one lecture in each Section ")
            return ;
        }

        

        //koi dikkat hi nhi h 
        dispatch(setStep(3));

    }
   // console.log("ediSectionName is ",editSectionName)
    const prevHandler=()=>{
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
        
    }
    const onSubmit=async (data)=>{
        setLoading(true)
        let result;
        if(data.sectionName.length==0){
            toast.error("section Name must consist greater than 0 words")
            return ;
        }   
        if(editSectionName){
            

            const result=await editSection({
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId: course._id,
            },
            token);  

            if(result){
                //you got new Section jus t
              //  dispatch(setCourse(result));
              const updatedCourseContent=course.courseContent.map((section)=>section._id==editSectionName?{...section,...result}:section)
              dispatch(setCourse({...course,courseContent:updatedCourseContent}));
                setEditSectionName(null)
                setValue("sectionName","")

            }


        }
        else{
            result=await createSection({
                sectionName:data.sectionName,
                courseId:course._id,

            },token)
            if(result){
                dispatch(setCourse(result));
                setEditSectionName(null)
                setValue("sectionName","")
            }
        }
        setLoading(false);
        return ;



    }
    const handleEditSectionName=(sectionId,sectionName)=>{
            if(editSectionName===sectionId){
                cancelEdit();
                return;
                //what are you doing here i dont understand what is going 
            }
             setEditSectionName(sectionId);
            setValue("sectionName",sectionName);
            
    }
    
          



    return <div className="my-5 w-full bg-richblack-800 px-2 py-2">
        <div>Course Builder</div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>Section Name<sup className="text-pink-700 ">*</sup></label>
        <input type="text " 
        {...register("sectionName",{required:true,})}
        className="bg-richblack-700 rounded w-[50%] mb-3 "
        >
         {
            errors.sectionName && (<span>Section Name Is required</span>)
        }
        </input>
        
        <div className="flex gap-2">
                <IconBtn outline={true} customClasses="text-white flex" text={editSectionName ? "Edit Section Name" : "Create Section"}  >
                    <IoIosAddCircleOutline className="text-yellow-25" size={20} />
                </IconBtn>
            {
                editSectionName && (
                    <button  onClick={()=>cancelEdit()} className="px-4 py-4 bg-richblack-500 text-richblack-5">
                        clear Edit
                    </button>
                )
            }   
        </div>

         </form>      
            
        {/* ab mujhe niche ka bnana pdega just like that and dont forget anything  */}
        <div>
            {
               course.courseContent.length>0&& (<NestedView handleEditSectionName={handleEditSectionName} ></NestedView >)
            }
        </div>
        
        <div className="mt-5 flex gap-5 justify-end mr-6 text-white">
          <IconBtn outline={true} onclick={prevHandler} customClasses="text-white">prev</IconBtn>

            <IconBtn text="Next" onclick={nextHandler}>
            <BiRightArrow />
            </IconBtn>
        </div>

        
    </div>
}
export default CourseBuilderForm