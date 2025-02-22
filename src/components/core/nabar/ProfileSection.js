import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operation/authAPI";
import { setToken } from "../../../slices/authSlice";
import { FaCaretDown } from "react-icons/fa";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import useOnClickOutside from "../../../hooks/useOnclickOutside"

const ProfileSection =()=>{
    const {user}=useSelector((state)=>state.profile);
    const dispatch=useDispatch();
    const [open,setOpen]=useState(false);
    const navigate=useNavigate();
    const ref = useRef(null)
  
    useOnClickOutside(ref, () => setOpen(false))
   
   
   
    if(!user){
        return null
    }



    return (
        <button className=" relative   " onClick={()=>setOpen(true)}>
            <div className=" flex  justify-around ">
            <img src={user?.image}  className=" rounded-full w-[30px] py-1 px-1 "></img>
            <div>
            <FaCaretDown  >
            </FaCaretDown>
            </div>
            </div>
            {
                open && (
                    <div onClick={(e)=>e.stopPropagation()}
                    className="absolute mt-5 top-[6.5%] right-[9%] z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 "
                    ref={ref}
                    >
                        <Link to='/dashboard/my-profile'>
                            <div onClick={()=>setOpen(false)} className="flex gap-2 items-center mx-2 ">
                            <VscDashboard className="text-lg" />
                            Dashboard

                            </div>
                        </Link>
                        <div onClick={()=>dispatch(logout(dispatch,navigate))} className="flex gap-2 items-center  mx-2">
                        <VscSignOut></VscSignOut>
                         Logout
                            </div>
                    </div>
                )
            }
        </button>
        
  );
    

}
export default ProfileSection ;