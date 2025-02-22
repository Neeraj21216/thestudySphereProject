import { Link } from "react-router";
import RatingStars from "../../../utilis/RatingStars"
import { useEffect, useState } from "react";
import GetAvgRating from "../../../utilis/avgRating";



const Course_Card=({course,height})=>{
   // console.log("course in card are",course);
    const [avgReviewCount,setAvgReviewCount]=useState(0);
    //phir hi sikha  
    useEffect(()=>{
        const count=GetAvgRating(course?.ratingAndReview);
        setAvgReviewCount(count);   
    },[course]);



    return (<div className="bg-green-500 text-white p-6 rounded-lg transition-transform duration-300 hover:scale-110 hover:shadow-md">

        <Link to={`/courses/${course?._id}`}>
            <div>
                <img src={course?.thumbnail} className={` rounded-md  h-[300px]`}></img>
            </div>
            <div>{course?.courseName}</div>
            <div>
                {/* instructor name is required populate krwa lena   */}
                {course?.instructor?.firstName}
            </div>
            <div>
                <span>{avgReviewCount||0}</span>

                <RatingStars Review_count={avgReviewCount}></RatingStars>
                {/* review Count k liye something you need so work according to that  */}
                <span>{course?.ratingAndReview.length}</span>


            </div>
            <div>
                {/* add rs coing */}
                {course?.price}
            </div>
        </Link>
    </div>);
}
export default Course_Card;