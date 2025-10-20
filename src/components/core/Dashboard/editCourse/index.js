import React, { useEffect, useState } from 'react'
import RenderSteps from "../AddCourse/RenderSteps"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getCourseDetailData } from '../../../../services/operation/pageAndComponentData';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector( (state) => state.course);
    const [loading, setLoading] = useState(false);

    const {token} = useSelector( (state) => state.auth);

    useEffect( () => {

        const PopulateCourseDetails = async () => {
            setLoading(true);
            console.log(4444444);     
            const result = await getCourseDetailData(courseId);
            console.log("results:",result);

            if(result?.courseDetails) {
                dispatch(setCourse(result?.courseDetails));
                dispatch(setEditCourse(true));
            }

            setLoading(false);
        }

        PopulateCourseDetails();

    },[courseId, token, dispatch])




  return (
    <div>

        {
            loading ? (<div className='spinner'></div>) : (

                <div className='flex my-10 justify-center items-center w-[70%] mx-auto gap-10 flex-col'>
                    <h1 className='text-3xl font-semibold text-pink-300'>Edit Course</h1>

                    <div className='mx-auto'>
                        {
                            course ? (<RenderSteps />) : (<p>Course Not Found</p>) 
                        }
                    </div>
                    
                </div>
            )
        }

    </div>
  )
}

export default EditCourse