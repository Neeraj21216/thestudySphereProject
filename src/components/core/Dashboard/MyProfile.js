import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { MdEditSquare } from "react-icons/md";
import { Link } from "react-router";

const MyProfile=()=>{

    const {user}=useSelector((state)=>state.profile);
    if(!user){
        return null;
    }

    return (
        <div className="text-white w-full flex flex-col    ">
            <div>
                MY profile
            </div>
            <div className="flex justify-around bg-richblack-600 ">
               <div className="px-4 py-4   flex items-center">
               <div className="flex  items-center ">
                <img  src={user?.image} className="h-[30px ] w-[30px] rounded-full"></img >
                <div>
                    <div>
                        
                        <p>{user?.firstName}</p>
                        <p>{user?.lastName}</p>
                        </div>
                    <p>{user?.email}</p>
                </div>
               </div>


               <Link to="/dashboard/settings">
               <div className="h-[100px] w-[100px] ">
                {/* icon button  */}
                <IconBtn  >
                    Edit
                    <MdEditSquare />
                </IconBtn>
               </div>
               </Link>
               </div>
            </div>
        </div>
    );

} 
export default MyProfile;