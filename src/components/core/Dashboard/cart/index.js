import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../../../../services/operation/studentFeatureApi";
import { useNavigate } from "react-router";

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"
const Cart=()=>{

   
    const {totalItems}=useSelector((state)=>state.cart);
    return  (<div className="gap-y-8" > 
        <div className="flex mx-56">My WishList</div>
        <div className="mx-56 my-8">
            {/* no of courses */}
            {totalItems} courses in wish List
        </div>
        <div className="flex gap-20 justify-around ">
            <RenderCartCourses />
            <RenderTotalAmount />
        </div>
    </div>)

}

export default Cart;