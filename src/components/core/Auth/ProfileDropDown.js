import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineCaretDown } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import { VscDashboard, VscSignOut } from "react-icons/vsc";

import { logout } from "../../../services/operation/authAPI";
import useOnClickOutside from '../../../hooks/useOnclickOutside';


const ProfileDropDown = () => {

  const {user} = useSelector( (state) => state.profile);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));
 
  return (
    <div>
        
        <div onClick={ () => setOpen(true)} className='relative cursor-pointer'>
          
          <div className='flex items-center justify-center gap-1 rounded-full'>
            <img src={user?.image} alt='user logo' loading='lazy' className=' rounded-full w-8 h-8' />
            <AiOutlineCaretDown className="text-sm text-richblack-100" />
          </div>

          {
            open && (
            <div className='absolute lg:top-[46px] lg:left-[-70px] border border-richblack-500  bg-richblack-800 flex flex-col rounded-lg '  onClick={(e) => e.stopPropagation()} ref={ref}>
              
              <Link to={"/dashboard/my-profile"} onClick={ () => setOpen(false)}>
                <div className='flex justify-center items-center border-b border-richblack-500 gap-2 hover:bg-richblack-700 px-3 py-2 rounded-t-lg'>
                  <VscDashboard className="text-lg text-richblack-300" />
                  <h1 className='text-richblack-300'>Dashboard</h1>
                </div>
              </Link>

              <div onClick={ () => {
                dispatch(logout(navigate));
                setOpen(false);
              }} className='flex items-center gap-2  hover:bg-richblack-700 px-3 py-2 rounded-b-lg'>
                <VscSignOut className="text-lg text-richblack-300" />
                <h1 className='text-richblack-300'>Logout</h1>
              </div>

            </div>)
          }

        </div>

    </div>
  )
}

export default ProfileDropDown;