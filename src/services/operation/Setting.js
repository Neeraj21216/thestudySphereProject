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

export function updateProfile(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
          Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        const userImage = response.data.updatedUserDetails.image
          ? response.data.updatedUserDetails.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
        dispatch(
          setUser({ ...response.data.updatedUserDetails, image: userImage })
        )
        toast.success("Profile Updated Successfully")
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
  }
  
export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        // console.log('1');
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API,)
            console.log("DELETE_PROFILE_API API RESPONSE................", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))

        } catch(error) {
            console.log("DELETE_PROFILE_API API ERROR....................", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}