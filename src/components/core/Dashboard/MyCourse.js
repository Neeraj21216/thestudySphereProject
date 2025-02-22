import CourseTable from "./InstructorCourses/CourseTable";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operation/CourseDetailAPI";
import IconBtn from "../../common/IconBtn";

const MyCourse = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            const result = await fetchInstructorCourses(token);
            if (result) {
                setCourses(result);
            }
        };
        fetchCourse(); 
    }, []); 

   // console.log("course from mycoursedashboard", courses);

    return (
        <div>
            <div className="flex gap-4">
                <p>My Courses</p>
                <IconBtn 
                    text="Add course" 
                    disabled={false} // ✅ Ensure button is clickable
                    onClick={() => {navigate("/dashboard/add-course")}} // ✅ Should now work
                />
            </div>

            {/* TODO: Add icon in upper div */}
            {
            courses && <CourseTable courses={courses} setCourses={setCourses} />
            }
        </div>
    );
};

export default MyCourse;
