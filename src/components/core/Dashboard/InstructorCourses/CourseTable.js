import { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Thead, Tr, Td, Th, Tbody } from "react-super-responsive-table";
import { formattedDate } from "../../../../utilis/dateFormatter";
import { MdDelete, MdEdit } from "react-icons/md";
import { handleDeleteCourse, fetchInstructorCourses } from "../../../../services/operation/CourseDetailAPI";
import { COURSE_STATUS } from "../../../../utilis/constants";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { editCourseDetails } from "../../../../../server/controller/Course";
import EditCourse from "../editCourse";

const CourseTable = ({ courses, setCourses }) => {
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const { editCourse } = useSelector((state) => state.course);
    const [confirmationalModal, setConfirmationModal] = useState(null);

    const handleCourseDeletion = async (courseId) => {
        setLoading(true);
        await handleDeleteCourse({courseId, token});
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    };

    return (
        <div>
            <Table className=" py-8">
                <Thead className="mx-5">
                    <Tr className="flex justify-start gap-x-10 w-full" >
                        <Th>Courses</Th>
                        <Th>Duration</Th>
                        <Th>Price</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody className="">
                    {courses.length === 0 ? (
                        <Tr>
                            <Td>No Courses Found</Td>
                        </Tr>
                    ) : (
                        courses.map((course) => (
                        <Tr key={course._id} className="flex gap-x-10 border-richblack-800 p-8" >
                                <Td className="flex gap-4">
                                    <img 
                                        src={course?.thumbnail} 
                                        className="h-[150px] w-[150px] rounded-lg object-cover"
                                        alt="Course Thumbnail"
                                    />
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                        <p>Created:</p>
                                        {course.status === COURSE_STATUS.DRAFT ? (
                                            <p className="text-pink-50">Drafted</p>
                                        ) : (
                                            <p className="text-yellow-50">PUBLISHED</p>
                                        )}
                                    </div>
                                </Td>
                                <Td >2hr 30min</Td>
                                <Td>{course?.price}</Td>
                                <Td>
                                    <button>
                                    <MdEdit onClick={() => {<EditCourse/>}} />

                                    </button>
                                            <button
                                            disabled={loading}

                                            onClick={()=>{
                                         //       console.log("courseid",course?._id)
                                                handleCourseDeletion(course?._id);
                                            }}
                                                className="cursor-pointer"
                                                >

                                            <MdDelete   />

                                            </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        </div>
    );
};

export default CourseTable;
