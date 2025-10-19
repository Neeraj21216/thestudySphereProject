
import React, { useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile } from '../../../../services/operation/Setting';
import ConfirmationModal from '../../../common/ConfirmationalModal';
import { useNavigate } from 'react-router-dom';



const DeleteAccount = () => {

  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector( (state) => state.auth);
 
  const deleteHandler = () => {
    setConfirmationModal({
      text1: "Are You Sure",
      text2: "Your account will be Permanently deleted",
      btn1Text: "Delete",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(deleteProfile(token,navigate)),
      btn2Handler: () => setConfirmationModal(null)
    })
  }

  return (
    <div className='bg-pink-900 flex gap-5 px-9 py-7 border-2 border-pink-700 rounded-lg'>
      
      <div className='rounded-full bg-pink-700 p-2 h-10'>
        <RiDeleteBin6Line className='text-2xl text-pink-300' />
      </div>

      <div className='flex flex-col items-start gap-1 w-[70%]'>
        <h1 className='text-lg font-semibold text-richblack-5'>Delete Account</h1>
        <p className='text-richblack-300'>Would you like to delete account?</p>
        <p className='text-richblack-300'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
        <button className='text-pink-300' onClick={deleteHandler}>I want to delete my account.</button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/> }

    </div>
  )
}

export default DeleteAccount;
