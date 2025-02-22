import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

const { catalogData, courseEndpoints } = require("../apis");


export const getCatalogPageData=async (categoryId)=>{
    const toastId=toast.loading("...loading");
    let result=[];
    try {
        const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});
        console.log("response From getCatalogPageData",response);
        if(!response?.data?.success){
            throw new Error("Could not fetch cataloPageData");
            
        }

         result=response?.data;




    } catch (error) {
        console.log("CATALOG PAGE DATA ERRROR",error);
        toast.error(error.message);
        result=error?.response?.data;
        
    }
    toast.dismiss(toastId);
    return result;
}

export const getCourseDetailData=async(courseId)=>{
    let res=null;
    const toastId=toast.loading("..Loading");

    try{

        const response=await apiConnector("POST",courseEndpoints.GET_COURSE_DETAIL_API,{courseId,},);
        console.log("GET_COURSE_DATA_API_RESPONSE",response);
        if(!response.data.success){
            throw new Error("Could not fetch Course Data");
            //learning is not like that 

            
        }
        res=response?.data?.data;

        



    }catch(error){
        console.log(error);
        toast.error(error.message);

    }

    toast.dismiss(toastId);
    return res;
}