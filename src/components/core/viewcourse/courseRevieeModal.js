import React, { useEffect } from 'react'
import ReactStars from 'react-stars';
import IconBtn from '../../common/IconBtn';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createRating } from '../../../services/operations/courseDetailsAPI';



const CourseReviewModal = ({setReviewModal}) => {



    const {user} = useSelector( (state) => state.profile);
    const {token} = useSelector( (state) => state.auth);
    const {courseEntireData} = useSelector( (state) => state.viewCourse);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm();


    useEffect( () => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    },[setValue]);


    const ratingChanged = (newRating) => {
        setValue("courseRating",newRating)
    }

    const onSubmit = async (data) => {
        console.log("r",courseEntireData);
        await createRating(
            {
            courseId: courseEntireData._id,
            rating: data.courseRating,
            review: data.courseExperience,
            },
            token
        )
        setReviewModal(false);
    }

  return (
    <div className="fixed inset-0 z-1000 text-richblack-5  flex items-center justify-center bg-richblack-500 bg-opacity-40">

        <div className='bg-richblack-800 flex flex-col p-5 gap-2 w-[400px] rounded-lg'>

            <div>
                <p className='text-richblack-5 text-center'>Add Review</p>
                {/* <button onClick={() => setReviewModal(false)}/> */}
            </div>

            <div className='flex flex-col font-semibold'>
                <div className='w-10 h-10 rounded-full mb-2'>
                    <img src={user?.image}
                    alt={user?.firstName + "Profile"}
                    className='rounded-full'
                    />
                </div>
                <div>
                    <p> {user?.firstName} {user?.lastName} </p>
                    <p> posting Publicly </p>
                </div>
            </div>


            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>

                <ReactStars 
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                />

                <div className='flex flex-col gap-1'>
                    <label htmlFor='courseExperience'>
                        Add Your Experience<sup>*</sup>
                    </label>
                    <textarea
                        id='courseExperience'
                        placeholder='Add Your Experience'
                        className='bg-richblack-700 p-2 rounded-md'
                        {...register("courseExperience", {required: true})}
                    />
                    {
                        errors.courseExperience && (<span>Please Add Your Experience</span>)
                    }
                </div>

                <div className='flex justify-between'>
                    <button onClick={ () => setReviewModal(false)} className='bg-yellow-50 text-black py-2 px-4  rounded-lg font-semibold' >
                        Cancel
                    </button>
                    <IconBtn text={"save"} />
                </div>

            </form>

        </div>
        
    </div>
  )
}

export default CourseReviewModal;