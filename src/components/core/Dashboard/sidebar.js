import React, { useState } from 'react'

import { sidebarLinks } from '../../../data/dashboard-links';

import { useDispatch, useSelector } from 'react-redux';
import { VscSignOut } from "react-icons/vsc";

import SidebarLink from './SidebarLinks';
import { logout } from '../../../services/operation/authAPI';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationalModal';

const Sidebar = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth);
    const {user, loading: profileLoading} = useSelector( (state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [confirmationModal, setConfirmationModal] = useState(null);

    if(authLoading || profileLoading){
      return (
        <div className='spinner'></div>
      )
    }


  return (
    <div className='relative'>
        
        <div className='text-richblack-300 relative  h-full w-52 bg-richblack-800 border-r-2 border-richblack-700'>

          <div className='text-richblack-300 flex flex-col gap-[5px]'>

            {
              sidebarLinks.map( (link) => {
                if(link.type && user?.accountType !== link.type)return null;

                return (
                  <SidebarLink link={link} iconName={link.icon} key={link.id} />
                )
              })
            }

          </div>


          <div className='mx-auto h-[1px] w-10/12 bg-richblack-600 my-6'></div>

            <div className='flex flex-col gap-1'>

              <SidebarLink link={{name:"Settings", path:"dashboard/settings"}}
              iconName={"VscSettingsGear"}
              />

              <button 
                onClick={ () => setConfirmationModal({
                  text1: "Are You Sure ?",
                  text2: "You Will be logged out of your Account",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })}
               className="px-6 py-2 text-sm font-medium text-richblack-300">

                <div className='flex items-center gap-2'>
                  <VscSignOut className="text-lg" />
                  <p>Logout</p>
                </div>

              </button>

          </div>

          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>

        

    </div>
  )
}

export default Sidebar;