import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Upload";
import { createSubSection } from "../../../../../services/operation/CourseDetailAPI";
import IconBtn from "../../../../common/IconBtn";
import { editSubsection } from "../../../../../services/operation/CourseDetailAPI";

const SubSectionModal=({
    modalData,
    setModalData,
    add=false,
    view=false,
    edit=false,
})=>{
    const {
        register,
        setValue,
    
        getValues,
        handleSubmit,
        formState:{errors},
    
    }=useForm();
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);

    const {token}=useSelector((state)=>state.auth);
    const {course}=useSelector((state)=>state.course);
    //i dont understand why useEffect is being used 

    useEffect(()=>{
        if(view||edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);

        }
    },[])
    ///always check in backend like that 
    const isFormatedForm = () => {
        const currentvalue = getValues();
        if ((currentvalue.lectureTitle ?? "") !== (modalData.title ?? "") ||
            (currentvalue.lectureDesc ?? "") !== (modalData.description ?? "") ||
            (currentvalue.lectureVideo instanceof File || currentvalue.lectureVideo !== modalData.videoUrl)
        ) {
            return true;
        }
        return false;
    };      
    
    const handleEditSubsection=async()=>{
        //form data id nhi hoga usme 
        const currentvalue=getValues();
        const formData=new FormData();
        formData.append("sectionId",modalData.sectionId);
        formData.append("subSectionId",modalData._id);
        //something problem in this just like tha

        if(currentvalue.lectureTitle!=modalData.title){
            formData.append("title",currentvalue.lectureTitle);
        }
        if(currentvalue.lectureDesc!==modalData.description){
            formData.append("description",currentvalue.lectureDesc);

        }
        if(currentvalue.lectureVideo!==modalData.videoUrl){
            if (currentvalue.lectureVideo instanceof File) {
                formData.append("video", currentvalue.lectureVideo);
            } else {
                console.error("lectureVideo is not a File object:", currentvalue.lectureVideo);
            }              //some problem may occure sambha lena
        }
        setLoading(true);
        //API CALL
        const result = await editSubsection(formData, token);
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId
                    ? {
                          ...section,
                          subSection: section.subSection.map((sub) =>
                              sub._id === modalData._id ? result : sub
                          ),
                      }
                    : section
            );
            const updatedCourse={...course,courseContent:updatedCourseContent   }
            dispatch(setCourse(updatedCourse));
        }
        
        setModalData(null);
        setLoading(false);
         



    }

    const onSubmit=async(data)=>{
        if(view){
            return;
        }
        if(edit){

            //edit the 
            if (isFormatedForm()) {  // ✅ Corrected function call
                handleEditSubsection();
            } else {
                console.log("no changes made");
                toast.error("NO CHANGES MADE");  // ✅ Now this will trigger correctly
            }
            return;
        }
        //iska mtlb mujhe add krna h 
        const formData=new FormData();
        formData.append("sectionId",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDesc);
        if (data.lectureVideo instanceof File) {
            formData.append("video", data.lectureVideo);
        } else {
            console.error("lectureVideo is not a File object:", data.lectureVideo);
        }        
        
        setLoading(true);
        //api call is next 
        const result=await createSubSection(
            formData,token,

        );
        if(result){
            //TODO:check for updation in different parts 
           // dispatch(setCourse(result));
           const updatedCourseContent=course.courseContent.map((sections)=>sections._id==modalData?result:sections);
           const updatedCourse={...course,courseContent:updatedCourseContent}
           dispatch(setCourse(updatedCourse))
        }
        setModalData(null);
        setLoading(false);

    }


    return (
        <div>
        <div>
            <p>{view && "Viewing"} {edit &&"editing"}{add && "Adding"}Lecture</p>
            <button onClick={()=>(!loading?setModalData(null):{})}>
            <RxCross1 />

            </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors            }
            video={true}
            viewData={view?modalData.videoUrl:null}
            editData={edit?modalData.videoUrl:null}

             />
             <div >
                <label>Lecture Title</label>
                <input type="text"
                {...register("lectureTitle",{required:true})}
                className="bg-richblack-800 rounded text-richblack-25 w-full"
                ></input>
                {
                    errors.lectureTitle && (<span>Lecture Ttile is requried</span>)
                }
             </div>
             <div>
                <label>Lecture description</label>
                <textarea 
                {...register("lectureDesc",{required:true})}
                className="w-full min-h-[130px] bg-richblack-800 text-richblack-25"
                ></textarea>
                 {
                    errors.lectureDesc && (<span>Lecture Ttile is requried</span>)
                }
             </div>
             {
                !view && (
                    <div>
                        <IconBtn text={loading?"loading":"Save Changes"}></IconBtn>
                    </div>
                )
             }

        </form>

        </div>
    );
}
export default SubSectionModal;