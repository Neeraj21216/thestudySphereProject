import {IconBtn} from "../../common/IconBtn"
import { CiClock2 } from "react-icons/ci";
import { GoArrowUpLeft } from "react-icons/go";
import { TbCertificate } from "react-icons/tb";
import { MdMobileScreenShare } from "react-icons/md";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { buyCourse } from "../../../services/operation/studentFeatureApi";
import copy from "copy-to-clipboard"
import toast from "react-hot-toast";
const CourseDetails=()=>{
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();

    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.profile);
    //course detail fetch krna pdega
    const shareHandler=()=>{
        copy(window.location.href);
        toast.success("Link Copied to clipboard");
    }
   

    return (<div className="w-[300px] h-[900px] gap-y-3 ">
        <div>
            {
                //console.log("course Inside card is ",course)
            }
          
            <div className="text-richblue-200 justify-center items-center">
                30-Day Money-Back Gurantee
            </div>
            <div>
                <p>
                    This Course includes:
                </p>
               <div className="text-caribbeangreen-500 text-xl ">
               <div className="flex gap-2 my-2 ">
                    <CiClock2 />

                    <p>
                        8 hours on-demand video
                    </p>
                </div>
                <div className="flex gap-2 my-2 ">
                    <GoArrowUpLeft />

                    <p>
                        Full time access
                    </p>
                </div>
                <div className="flex gap-2 my-2 ">

                    <MdMobileScreenShare />

                    <p>
                      Access on Moblie and Tv
                    </p>
                </div>
                <div className="flex gap-2 my-2 ">

                    <TbCertificate />

                    <p>
                       Certificate of Completion 
                    </p>
                </div>
               </div>
            </div>
            <div className="flex items-center justify-center">
                <button className="text-yellow-5" onClick={()=>shareHandler()}>
                    Share 
                </button>
            </div>
        </div>
    </div>)
}

export default CourseDetails;