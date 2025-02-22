import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import IconBtn from "../../../../common/IconBtn";
import { setStep,resetCourseState } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utilis/constants";
import { editCourseDetails } from "../../../../../services/operation/CourseDetailAPI";

const PublishCourse = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, step } = useSelector((state) => state.course);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, getValues, setValue, trigger } = useForm();

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        } else {
            setValue("public", false);
        }
        trigger("public");
    }, [course, setValue, trigger]);

    const goBack = () => {
        dispatch(setStep(2));
    };

    const goToCourse = () => {
        dispatch(resetCourseState());
        navigate("/");
    };

    const handleCoursePublish = async () => {
        const isPublic = getValues("public");

        if (
            (course?.status === COURSE_STATUS.PUBLISHED && isPublic) ||
            (course?.status === COURSE_STATUS.DRAFT && !isPublic)
        ) {
            goToCourse();
            return;
        }

        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = isPublic ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        if (result) {
            goToCourse();
        }
        console.log(formData);
        setLoading(false);
    };

    const onSubmit = () => {
        handleCoursePublish();
    };

    return (
        <div>
            <div>Publish Course</div>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <label>
                    <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                    />
                    <span>Make this course Public</span>
                </label>
                <div className="flex">
                    <button type="button" onClick={goBack}>Back</button>
                    <button type="submit" disabled={loading}> 
                        <IconBtn text="Save Changes" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PublishCourse;
