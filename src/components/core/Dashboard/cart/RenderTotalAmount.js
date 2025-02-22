import { useDispatch, useSelector } from "react-redux";
import { useLinkClickHandler, useNavigate } from "react-router";
import { buyCourse } from "../../../../services/operation/studentFeatureApi";


const RenderTotalAmount=()=>{
    const {total,totalItems,cart}=useSelector((state)=>state.cart);
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const clickHandler=()=>{

        if(token){
            const courses=cart.map((course)=>course?._id);
            buyCourse(token,courses,navigate,dispatch)

        }

    }
    return (<div>
        <p>Total:</p>
        <p>
           Rs. {total}
        </p>
        <p className="line-through text-richblack-600">
            Rs.{total*10}
        </p>
        <button onClick={()=>clickHandler()}>
            Buy Now
        </button>
    </div>)

}
export default RenderTotalAmount;