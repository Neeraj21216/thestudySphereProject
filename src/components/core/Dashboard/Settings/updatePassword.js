import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import IconBtn from '../../../common/IconBtn';

const UpdatePassword = () => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();


  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const submitHandler = () => {

  }

  return (
    <div>
      
      <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-7'>


        <div  className='flex w-full flex-col gap-7 justify-between  text-richblack-50 bg-richblack-800 px-9 py-7 rounded-lg border-2 border-richblack-700'>
          <h1 className='text-lg font-semibold text-blue-300'>Password</h1>

          <div className='flex justify-between'>

            <label htmlFor='currentPassword' className=' relative w-[49%]'>
              <h1>Current Password</h1>
              <input 
                type= {showPassword ? 'text' : 'password'}
                id='currentPassword'
                name='currentPassword'
                placeholder='Enter Current Password'
                className='p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'

                {...register("currentFirst", {required: true})}
              />
              {
                errors.currentPassword && (
                  <div>Please Enter Current Password</div>
                )
              }

                <div className=' absolute top-10 right-2'>
                  {
                      showPassword ? <IoIosEye className='text-2xl text-richblack-100' onClick={ () => setShowPassword(!showPassword)} /> : <IoIosEyeOff className='text-2xl text-richblack-100' onClick={ () => setShowPassword(!showPassword)} />
                  }
              </div>

            </label>

            <label htmlFor='newPassword' className=' relative w-[49%]'>
              <h1>New Password</h1>
              <input 
                type= {showNewPassword ? 'text' : 'password'}
                id='newPassword'
                name='newPassword'
                placeholder='Enter New Current Password'
                className='p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'

                {...register("newPassword", {required: true})}
              />
              {
                errors.newcurrentPassword && (
                  <div>Please Enter New Current Password</div>
                )
              }

              <div className=' absolute top-10 right-2'>
                  {
                      showNewPassword ? <IoIosEye className='text-2xl text-richblack-100' onClick={ () => setShowNewPassword(!showPassword)} /> : <IoIosEyeOff className='text-2xl text-richblack-100' onClick={ () => setShowNewPassword(!showNewPassword)} />
                  }
              </div>

            </label>

          </div>


        </div>

          <div className='flex justify-end gap-2'>
              <button className='py-2 px-6 bg-richblack-700 text-richblack-5 rounded-lg'>Cancel</button>
              <IconBtn text={"Save"} type="submit" />
          </div>

      </form>

    </div>
  )
}

export default UpdatePassword;