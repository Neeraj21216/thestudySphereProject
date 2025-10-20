import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from "../../common/IconBtn";

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");

    const location = useLocation();

    const navigate = useNavigate();
    const {sectionId, subSectionId} = useParams();
    // something ned to be chan

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector( (state) => state.viewCourse);


    useEffect( () => {
            console.log(2);
            const setActiveFlags = () => {
            if(!courseSectionData.length)
                return;

            // console.log("c",courseEntireData,"s",courseSectionData)

            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex( (data) => data._id === subSectionId);

            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);

            setVideoBarActive(activeSubSectionId);
        }

        setActiveFlags();
        console.log(3)

    },[courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId]);

  return (
    <div className='text-richblack-5 w-64 bg-richblack-800 '>

        <div>

            <div>
                {/* for buttons */}
                <div onClick={ () => navigate("/dashboard/enrolled-courses")}>
                    Back
                </div>
                <div>
                    <IconBtn
                        text="Add Review"
                        onclick={ () => setReviewModal(true)}
                    />
                </div>
            </div>

            {/* headings */}
            <div>
                <p> {courseEntireData?.courseName} </p>
                <p> {completedLectures?.length} / {totalNoOfLectures} </p>
            </div>

        </div>

        {/* section and subSection */}
        <div className='flex flex-col gap-2'>

            {
                courseSectionData.map( (section, index) => (
                    <div onClick={ () => setActiveStatus(section?._id)} key={index} >
                        
                        {/* section */}
                        <div className='flex flex-col gap-3 p-3 bg-richblack-700'>
                            <div className='bg-richblack-700 flex justify-between'>
                                <p>{section?.sectionName}</p>
                                <p> {} </p>
                            </div>
                            {/* add icon and handle rotate 180 logic */}
                        </div>

                        {/* subSection */}
                        <div>
                            {
                                activeStatus === section?._id && (
                                    <div>
                                        {
                                            section?.subSection?.map( (topic, index) => (
                                                <div className={`flex gap-5 p-3 ${videoBarActive === topic._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-800 text-richblack-5"}`}
                                                key={index}
                                                onClick={ () => {
                                                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                }}> 
                                                    <input 
                                                        type='checkbox'
                                                        checked={completedLectures?.includes(topic?._id)}
                                                        onChange={() => {}}
                                                    />
                                                    <span> {topic.title} </span>
                                                </div>
                                            ))
                                            
                                        }
                                    </div>
                                )
                            }
                        </div>


                    </div>
                ))
            }

        </div>
        
    </div>
  )
}

export default VideoDetailsSidebar;