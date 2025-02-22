import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getCourseDetailData } from "../services/operation/pageAndComponentData";
import { TfiWorld } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/operation/studentFeatureApi";
import GetAvgRating from "../utilis/avgRating"
import RatingStars from "../utilis/RatingStars"
import {ACCOUNT_TYPE} from "../utilis/constants"
import CourseDetails from "../components/core/CourseDetail/BuyCourseCard";
import { addToCart } from "../slices/cartSlice";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/common/ConfirmationalModal"
const CourseDetail=()=>{

    const {courseId}=useParams();
    //course Id fetchKr liya ab course laan
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.profile);
  //  console.log("user is ",user);
    //course detail fetch krna pdega  
    const [confirmationalModalData,setConfirmationalModalData]=useState(null);
    const [course,setCourse]=useState(null);
    const [averageRating,setAverageRating]=useState(0);
    
    const clickHandler=()=>{
        //console.log("token",token);
        if(token){
            console.log("user is ",user);
            buyCourse(token,[courseId],user,navigate,dispatch);
            return ;

        }

    }
    useEffect(()=>{
        const getCourseData=async ()=>{
           // console.log("courseId",courseId)
            const result=await getCourseDetailData(courseId);
            if(result){
                setCourse(result[0]);
            }
          //  console.log("courseData is ",course);

        }
        getCourseData();

    },[courseId])

    // courseData mil gyi something like payment krna pdega but 
    // you will need average rating things like that and you go away 
    useEffect(()=>{
        if (course) {
           // console.log("Updated courseData:", course);
            const count = GetAvgRating(course.reviewAndRating);
            setAverageRating(count);
        }


    },[course]);
    const handleCart=()=>{
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.")
            return;
          }
          if(!token){
            toast.error("please login ");
            return;
          }

        if(token){
            dispatch(addToCart(course));

        }
        setConfirmationalModalData({
        text1: "You are not logged in!",
        text2: "Please login to Purchase Course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationalModalData(null),
        })
    }



    return (<div>

       

                <div className="flex flex-col text-richblack-25 bg-richblack-800 w-full justify-center ">
                   <div className="  my-10 ml-[20%]  ">
                   <div>
                        Home/Catalog/
                        <span className="text-yellow-25">
                            {course?.category?.name}
                        </span>
                    </div>
                    <div>
                        {course?.courseName}
                    </div>
                    <div className="text-richblack-600">
                        {course?.courseDescription}
                    </div>
                    <div className="flex gap-2 ">
                        {/*rating,ratingStars,totalRatings,enrolled Students */}
                        <p>
                            {averageRating||0}
                        </p>
                        <RatingStars  Review_count={averageRating}></RatingStars>
                        <p></p>
                        <p>({course?.ratingAndReview.length} ratings)</p>
                        <p>
                            {course?.studentsEnrolled.length} Students
                        </p>
                    </div>
                    <div>
                        created by {course?.instructor?.firstName}
                    </div>
                    <div className="flex gap-4 ">
                        <p>
                        created at:
                        {/* add date things */}
                        </p>
                        <p className="flex  gap-3">
                            <TfiWorld />
                            English
                        </p>
                    </div>
                   </div>
                    
                </div>
                <div>
                    {/* what you will learn seciton  */}
                    {/* course benefit is not there so chill and move on  */}
                    {}  
                </div>
               
               <div className="flex justify-end mr-56 -translate-y-36">
                   
               <div className="w-[300px] h-[900px] flex flex-col px-2 py-2 "> 
                        <div>
                        <img src={course?.thumbnail} className="w-full h-[300px] rounded " loading="lazy"></img>
                        </div>
                        <div className="mx-4 my-2 ">
                        Rs. {course?.price}
                        </div>
                            <div className="my-2 ">
                                {/* buttons */}

                                        {
                                            console.log("user is ",user,course)
                                        }
                                
                                
                                
                                        <button className="text-black bg-yellow-200 mx-4  items-center px-3 py-3 w-[80%] rounded  " onClick={ 
                                    
                                            user && course?.studentsEnrolled?.includes(user?._id)?()=>navigate("/dashboard/enrolled-courses"):()=> clickHandler()}>
                                            Buy now 
                                        </button>   
                                        <button className="text-white bg-richblack-700 my-2 border-b-[2px] border-b-richblack-50  mx-4  items-center px-3 py-3 w-[80%] rounded"
                                        onClick={user && course?.studentsEnrolled?.includes(user?._id)?
                                            ()=>{
                                                toast.error("Course already bought ")
                                                navigate("/dashboard/enrolled-courses")
                                            }
                                            :
                                            ()=>handleCart()
                                        }
                                        >
                                            Add to cart 
                                        </button>
                                    
                                
                                <button className="bg-richblack-900 text-richblack-25">

                                </button>
                            </div>
                        
                  <CourseDetails   />  
                    
                </div> 
               </div>
               {
                confirmationalModalData && <ConfirmationModal modalData={confirmationalModalData} />
               }

       

        </div>);

   


}

export default CourseDetail;