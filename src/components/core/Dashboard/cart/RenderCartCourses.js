import { useNavigate } from "react-router";
import RatingStars from "../../../../utilis/RatingStars";
import { useDispatch,useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import { MdDelete } from "react-icons/md";

import { Link } from "react-router";
const RenderCartCourses=()=>{

    const {total,totalItems,cart}=useSelector((state)=>state.cart);
    //but how the things are stored is what matter 
    const navigate=useNavigate();
    const dispatch=useDispatch();

    return (<div className="" >

            {
                cart.length==0?(<div>No courses in cart 
            
                </div>):(
                    <div  className="w-full">

                      {
                        cart.map((course,index)=>{
                            return  <Link to={`/courses/${course?._id}`}>
                               <div key={index} className="flex gap-x-4 justify-evenly w-[90%] my-8  ">
                                <div>
                                    <img src={course?.thumbnail} className="h-[80px] w-[80px] rounded "></img>
                                </div>
                                <div className="gap-y-2">
                                    <p>
                                        {course?.courseName}
                                    </p>
                                    <p>{course?.category?.name}</p>
                                    <p>3.5</p>
                                    <RatingStars Review_count={3.5} />
                                </div>
                                <div>
                                    <button onClick={()=>dispatch(removeFromCart(course?._id))} className="bg-richblack-400 items-center my-2  text-pink-800 px-2 py-2 rounded flex gap-2 ">
                                        <MdDelete />
                                        Remove


                                    </button>
                                    <div className="text-yellow-200 text-xl">
                                      RS  {course?.price}
                                    </div>
                                </div>
                            </div>
                            
                            </Link>
                        })
                      }
                    </div>
                )
            }

        </div>);
    


}
export default RenderCartCourses;