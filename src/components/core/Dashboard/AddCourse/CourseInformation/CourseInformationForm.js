import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import { createCourse, fetchCourseCategory } from "../../../../../services/operation/CourseDetailAPI";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { MdNavigateNext } from "react-icons/md";
import toast from "react-hot-toast";
import { editCourseDetails } from "../../../../../services/operation/CourseDetailAPI";
import TagField from "./TagField";
import Upload from "../Upload"

export default function CourseInfromationForm(){


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    }=useForm();
    
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const {course,editCourse}=useSelector((state)=>state.course);
    const [loading,setLoading]=useState(false);
    const [courseCategories,setCourseCategories]=useState([]);
    useEffect(() => {
        // Function to fetch course categories
        const getCategory = async () => {
            setLoading(true);
            const categories = await fetchCourseCategory();
            if (categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        };
    
        // If the form is in edit mode, populate fields with existing course data
        if (editCourse && course) {
            console.log("couseBenefits is",course.whatWillYouLearn);
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits",course.whatWillYouLearn);
            
            setValue("courseCategory", course.category?.name); // ✅ Ensure category is set correctly
            setValue("courseRequirements", Array.isArray(course.instructions) ? course.instructions : []);
    
            // ✅ Handle thumbnail correctly
            if (typeof course.thumbnail === "string") {
                setValue("courseImage", course.thumbnail); // Store URL
            } else if (course.thumbnail instanceof File) {
                setValue("courseImage", course.thumbnail); // Store File if exists
            }
    
            console.log("course is ", course);
            console.log("current values of form is ", getValues());
        }
    
        getCategory(); 
    }, []);
    
    const isFormUpdated = () => {
        const currentValues = getValues();
    
        return (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatWillYouLearn ||
            (currentValues.courseCategory?._id || currentValues.courseCategory) !== 
            (course.category?._id || course.category) || // ✅ Fixed category comparison
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        );
    };
    
    const onSubmit = async (data) => {
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId", course._id);
    
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags)); // ✅ Fixed naming inconsistency
                }
                if ((currentValues.courseCategory?._id || currentValues.courseCategory) !== 
                    (course.category?._id || course.category)) {
                    formData.append("category", data.courseCategory);
                }
                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    if (typeof data.courseImage === "string") {
                        formData.append("thumbnailUrl", data.courseImage); // Handle it in the backend
                    } else if (data.courseImage instanceof File) {
                        formData.append("thumbnail", data.courseImage);
                    }
                }
                if (currentValues.courseBenefits !== course.whatWillYouLearn) {
                    formData.append("whatWillYoulearn", currentValues.courseBenefits);
                }
    
                const result = await editCourseDetails(formData, token);
                console.log(result);
                if (result) {
                    dispatch(setCourse(result));
                    dispatch(setStep(2));
                }
            } else {
                toast.error("No changes made");
            }
            return;
        }
    
        // Creating a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("tag", JSON.stringify(data.courseTags));
    
        if (data.courseImage instanceof File) {
            formData.append("thumbnail", data.courseImage);
        } else {
            toast.error("Insert a proper image format");
            return;
        }
    
        formData.append("whatWillYoulearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
    
        const result = await createCourse(formData, token);
        console.log("Result is", result);
        if (result) {
            
            dispatch(setCourse(result));

            dispatch(setStep(2));
        }
    };
    


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-richblack-800 text-white w-10/12 mx-auto  items-center rounded">
            {/* courseName */}
            <div className="mx-4 my-4">
                <label>Course Title<sup>*</sup>
                <input type="text" {...register("courseTitle",{
                    required:true,  })}
                    className="w-full bg-richblack-700 placeholder-richblack-500 rounded  "
                    placeholder="Enter Course Title"
                    ></input>
                    </label>
                    {
                            errors.courseTitle && (
                                <span>Course Title is required*</span>
                            )
                        }
            </div>
            {/* courseShortDesc */}
            <div className="mx-4">
                    <label>
                        <p>Course Short Description<sup>*</sup></p>
                        <textarea {...register("courseShortDesc",{required:true,})}
                        className="w-full bg-richblack-700 min-h-[140px]  rounded  "
                        placeholder="Enter Description"
                        ></textarea>
                        {
                            errors.courseShortDesc && (
                                <span>Course Description is required*</span>
                            )
                        }
                    </label>
            </div>
            {/* price */}
            <div className="relative mx-4 my-4 ">
            <label>
                <p>Price <sup>*</sup></p>
                <input 
                {...register("coursePrice",{required:"Price is required",
                    valueAsNumber:true,

                })
            }
            className="rounded relative  bg-richblack-700 w-full"
            placeholder="      Enter Price "
                ></input>
                <HiOutlineCurrencyRupee  className="absolute top-[56%] text-richblack-400 "/>
            </label>
            {
                            errors.price && (
                                <span>Price  is required*</span>
                            )
                        }
            </div>
            {/* tags  */}
            <div className="mx-4 my-4 ">
                <label>
                    <p>category <sup>*</sup></p>
                <select
                id="courseCategory"
                defaultValue=""
                {...register("courseCategory",{
                    required:true,

                })}
                className="w-full rounded bg-richblack-700 text-richblack-500 "
                >
                    <option  value="" disabled>choose a category</option>
                    {
                        courseCategories.length>0 && courseCategories.map((category,index)=>{
                            return <option key={index} value={category?.id}>{category?.name}</option>
                        })
                    }
                </select>
                </label>
                {
                    errors.courseCategory && (<span>Course categories is required*</span>)
                }
            </div>
            
                <TagField
                label="Tag"
                name="courseTags"
                placeholder="Enter Tags And Press Enter"

                setValue={setValue}
                getValues={getValues}
                errors={errors}
                register={register}
                
                />

            
            
                               <Upload 
                                name="courseImage"
                                label="Course Thumbnail"
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                editData={editCourse ? course?.thumbnail : null}
                            />

            
            {/* benefit Section  */}
            <div className="mx-4 my-4 ">
                <label>
                    <p>Benefit of the Course <sup>*</sup></p>
                    <textarea
                    id="courseBenefits"
                    {...register("courseBenefits", { required: "Benefits are required" })}
                    className="w-full bg-richblack-700 rounded min-h-[130px] "
                    placeholder="Enter Benefit of the Course"
                />
                 {errors.courseBenefits && <span className="text-red-500">{errors.courseBenefits.message}</span>}


                </label>
               
                
                

            </div>
            {/* REquirement Field */}
            <div className="mx-4 my-4">
                <RequirementField
                name="courseRequirements"
                label="Requirement/instructions"
                register={register}
                errors={errors}

                setValue={setValue}
                getValues={getValues}

                 />
            </div>
            {/* save and somethign like that is going to happens  */}

            <div className="mx-4 my-4 ">
                {
                    editCourse && (
                        <div className="px-2 py-2 ">
                        <button
                        className="bg-richblack-300 text-richblack-700 font-bold rounded px-2 py-2  "
                        onClick={()=>{dispatch(setStep(2))}}>continue Without Saving</button>
                    </div>
                    )
                }
            <div >
                <button type="submit" className="px-8 gap-3 py-2  bg-yellow-100 rounded flex text-richblack-700 font-bold items-center">{
                    !editCourse ?("Save "):("next")
                  
                    }
                    {
                          <MdNavigateNext />
                    }</button>
            </div>
            </div>




        </form>

    );

}