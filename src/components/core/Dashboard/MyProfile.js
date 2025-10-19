import React from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

  const {user} = useSelector( (state) => state.profile);

  const navigate = useNavigate();

  return (
    <div>
        
        <div className=' w-[70%] mx-auto text-richblack-5 flex flex-col gap-8 my-10'>

          <h1 className='text-4xl font-semibold text-pink-200'>My Profile</h1>

          {/* section 1 */}
          <div className='flex items-center justify-between bg-richblack-800 px-9 py-7 rounded-lg border-2 border-richblack-700'>

            <div className='flex gap-5 items-center'>
              <img src={user?.image} alt='Profile Logo' loading='lazy' className=' aspect-square w-[70px] object-cover rounded-full' />
              <div className='flex flex-col gap'>
                <h1 className='text-lg font-semibold'>{user?.firstName + " " + user?.lastName}</h1>
                <p className='text-richblack-300'>{user?.email}</p>
              </div>
            </div>

            <IconBtn 
              text={"Edit"}
              onclick={ () => {console.log("Navigating....."); navigate("/dashboard/settings")}} />

          </div>


          {/* section 2 */}
          <div className='flex justify-between bg-richblack-800 px-9 py-7 rounded-lg border-2 border-richblack-700'> 

            <div className='flex flex-col gap-14'>
              <h1 className='text-xl font-semibold'>About</h1>
              <p className='text-richblack-300'>{user?.additionalDetails?.about ?? "Write Something About Yourself"}</p>
            </div>

            <IconBtn 
              text={"Edit"}
              onclick={ () => {navigate("/dashboard/settings")}} />

          </div>


          {/* section 3 */}
          <div className='flex flex-col  justify-between bg-richblack-800 py-7 px-9 rounded-lg border-2 border-richblack-700 gap-6'>

            <div className='flex items-center justify-between'>
              <h1 className='text-xl font-semibold'>Personal Details</h1>
              <IconBtn 
              text={"Edit"}
              onclick={ () => {navigate("/dashboard/settings")}} />
            </div>

            
            <div className='flex lg:w-[50%]  justify-between items-center text-richblack-5'>

              <div className='flex flex-col gap-5'>

                <div className='flex flex-col'>
                  <h1 className='text-richblack-300'>First Name</h1>
                  <p>{user?.firstName}</p>
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-richblack-300'>Email</h1>
                  <p>{user?.email}</p>
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-richblack-300'>Gender</h1>
                  <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>

              </div>


              <div className='flex flex-col gap-5'>

                <div className='flex flex-col'>
                  <h1 className='text-richblack-300'>Last Name</h1>
                  <p>{user?.lastName}</p>
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-richblack-300'>Contact Number</h1>
                  <p>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"} </p>
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-richblack-300'>Date Of Birth</h1>
                  <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"} </p>
                </div>

              </div>

            </div>


          </div>



        </div>

    </div>
  )
}

export default MyProfile;