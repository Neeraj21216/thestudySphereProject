import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { setLoading } from "../../slices/authSlice" 

import { endpoints,profileApis } from "../apis"
import { useDispatch, useSelector } from "react-redux";
import {setToken,} from  "../../slices/authSlice"
import {setUser} from "../../slices/profileSlice"

const {
    UPDATE_PROFILE,
    UPDATE_DISPLAY_PICTURE,
    DELETE_ACCOUNT,
    USERDETAIL_API,
}=profileApis;


export function updateProfile(token,formData){
    const {firstName,lastName,contactNo,gender,dateOfBirth,about}=formData;
    return async ()=>{
        
            
        try{
            const response=await apiConnector("PUT",UPDATE_PROFILE,{firstName,lastName,contactNo,gender,dateOfBirth,about},{
                Authorisation:`Bearer ${token}`
            })
            console.log("Response from update Profile is",response);

            if(!response.data.success){
                throw new Error(response.data.message);
                
            }
            


            toast.success("Profiled Updated successfully");

        }
        catch(error){
            toast.error("Problem in updating profile");
            console.log(error.message)
        }
    }
}

export function updateProfilePIc(imageFile){
    return async()=>{



    }
}

