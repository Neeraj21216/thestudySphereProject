import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { data } from "react-router";

const {
    GET_ALL_INSTRUCTOR_COURSES_API,
    CREATE_COURSE_API,
    GET_ALL_COURSES_API,
    GET_COURSE_DETAIL_API,
    CREATE_CATEGORY_API,
    GET_ALL_CATEGORY_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUB_SECTION_API,
    UPDATE_SUB_SECTION_API,
    DELETE_SUB_SECTION_API,
    DELETE_COURSE_API,
    GET_ENROLLED_COURSE_API
}=courseEndpoints;


export const  fetchCourseCategory=async ()=>{
        let res=[];
        try{
            const response=await apiConnector("GET",GET_ALL_CATEGORY_API,{})
            if(!response.data.success){
                throw new Error("Could not get all category list");

                
            }
            console.log("category is from courseINfromation",response);
            res=response?.data?.allTags;



        }catch(error){
            toast.error("Couldnt fetch Category");
            console.log(error.message);
        }
        return res;
    
}

export const createCourse=async function (data,token){

    let result=null
    const toastId=toast.loading("Loading...")

    try {
        
        const response = await apiConnector(
            "POST",
            CREATE_COURSE_API,
            data,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        );
        console.log("CREATE COURSE API RESPONSE...............", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data

    } catch (error) {
        console.log("CREATE COURSE API ERROR...............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;

}

export const createSection=async(data,token)=>{
    let res
   const toastId= toast.loading("loading...")
    try{

        const response=await apiConnector("POST",CREATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`,
        })
        console.log("CREATE SECTION RESPONSE.....",response)
        if(!response.data.success){
            throw new Error("Problem in creating Section");
        }
        toast.success("Course Section Created")

 
        res=response.data.data
        

    
    }catch(error){
        console.log("CREATE SECTION API ERROR...............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return  res;
}
   
export const editSection=async(data,token)=>{
    let res
    const toastId= toast.loading("loading...")
    try{


        const response=await apiConnector("PUT",UPDATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`,
        })
        console.log("UPDATE SECTION RESPONSE....",response)
        if(!response.data.success){
            throw new Error("Problem in Updating section");
            
        }
        toast.success("Section Name is Updated")
        res=response.data.data
    }catch(error){
        console.log("UPDATE API ERROR...............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return  res;
 
}


export const deleteSection=async (data,token)=>{
    let res;
   // const toastId= toast.loading("loading...")
    try{
        const response=await apiConnector("DELETE",DELETE_SECTION_API,data,{
            Authorization:`Bearer ${token}`,
        })
        console.log("DELETE SECTION RESPONSE....",response)
        if(!response.data.success){
            throw new Error("Problem in DELETE section");
            
        }
        toast.success("Section  is DELETE")
        res=response.data.data;
    }catch(error){
        console.log("DELETE API ERROR...............", error)
        toast.error(error.message)
    }
   // toast.dismiss(toastId);
    return  res;

}

export const editSubsection=async (data,token)=>{

   let res;
    const toastId=toast.loading("Loading..");
    try{

        const response=await apiConnector("PUT",UPDATE_SUB_SECTION_API,data,{
            Authorization:`Bearer ${token}`,
        });
        console.log("EDIT SUB SECTION RESPONSE",response.data);
        if(!response.data.success){
            throw new Error("SubSection was Not UPDATED");
            
        }
    
        res=response.data.data;
        toast.success("subSection edited ");


    }catch(error){
        console.log("UPDATE_SUB_SECTION_API  ERROR...............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);

    return res;
}
export const deleteSubSection = async (sectionId, subSectionId, token) => {

    let res = null;
    const toastId = toast.loading("..Loading");

    try {
        const response = await apiConnector(
            "DELETE",
            `${DELETE_SUB_SECTION_API}?sectionId=${sectionId}&subSectionId=${subSectionId}`,  // ✅ Send parameters in URL
            null,  // No request body in DELETE
            { headers: { Authorization: `Bearer ${token}` } } // ✅ Headers correctly formatted
        );

        console.log("SubSection Deleted:", response);

        if (!response.data.success) {
            throw new Error("Error occurred during the deleting subSection");
        }

        res = response.data.data;
        toast.success("SubSection deleted Successfully");
    } catch (error) {
        console.log("DELETE_SUB_SECTION API ERROR:", error);
        toast.error(error.response?.data?.message || "Error deleting subsection");
    }

    toast.dismiss(toastId);
    return res;
};

export const createSubSection=async(data,token)=>{

    let res;
    const toastId=toast.loading("Loading..");
    try{

        const response=await apiConnector("POST",CREATE_SUB_SECTION_API,data,{
            Authorization:`Bearer ${token}`,
        });

        if(!response.data.success){
            throw new Error("SubSection was Not creatd");
            
        }

        res=response.data.data;
        console.log("response for creation of SubSection is",res)
        toast.success("subSection created Properly");


    }catch(error){
        console.log("CREATE_SUB_SECTION  API ERROR...............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return res;

}

export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("PUT", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("EDIT COURSE API RESPONSE.............", response)
        if(!response?.data?.data) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data

    } catch(error) {
        console.log("EDIT COURSE API ERROR...............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        })

        console.log("INSTRUCTOR COURSES API RESPONSE................", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses")
        }
        result = response?.data?.data

    } catch(error) {
        console.log("INSTRUCTOR COURSES API ERROR................", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const handleDeleteCourse=async({courseId,token})=>{
    try{
        const response = await apiConnector("POST", DELETE_COURSE_API,{courseId:courseId}, {
            Authorization: `Bearer ${token}`,
        })

        console.log("INSTRUCTOR COURSES  DELETION API RESPONSE................", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses")
        }
        toast.success("course Deleted Successfully");
    }
    catch(error){
        console.log("INSTRUCTOR COURSES  DELETION API ERROR................", error)
        toast.error(error.message)
    }
}
export const getEnrolledCourses=async(token)=>{
    let res;
    try {
        const response=await apiConnector("GET",GET_ENROLLED_COURSE_API,{},{
            Authorization:`Bearer ${token}`,
        });
        console.log("enrolled Course Api .....",response);
        if(!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses")
        }
        res=response?.data?.data;
        
    } catch (error) {
        console.log("GET ENROLLED COURSE API ERROR  ................", error)
        toast.error(error.message)
    }
    return res;

}
