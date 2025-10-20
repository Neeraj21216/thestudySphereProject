
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/viewcourse/videoDetailsSidebar';
import CourseReviewModal from '../components/core/viewcourse/courseRevieeModal';
import { getCourseDetailData } from '../services/operation/pageAndComponentData';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);

    const {courseId} = useParams();
    const {token} = useSelector( (state) => state.auth);

    const dispatch = useDispatch();

    useEffect( () => {

        const setCourseSpecificDetails = async() => {
            const courseData = await getCourseDetailData(courseId);
            // console.log(1,"c",courseData,4);

            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures = 0;

            courseData?.courseDetails?.courseContent?.forEach( (sec) => {
                lectures += sec.subSection.length || 0;
            });

            dispatch(setTotalNoOfLectures(lectures));
        }

        setCourseSpecificDetails();

    },[courseId, dispatch, token]);

  return (
    <div className='relative '>
        <div className='flex '>

            <VideoDetailsSidebar setReviewModal={setReviewModal} />

            <div className='w-full flex flex-col justify-center items-center'>
                <Outlet />
            </div>

        </div>
        
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} /> }
        
    </div>
  )
}

export default ViewCourse;
