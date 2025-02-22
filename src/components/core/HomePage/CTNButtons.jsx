import { Link } from "react-router";


const CTAButtons=({children,active,toLink})=>{
   
    return (
        <div className=" ">
        <Link to={toLink}>
    <div className={`text-center text-[16px] font-bold ${active?("bg-yellow-50 text-black"):"bg-richblack-800"} rounded transition-all duration-200 hover:scale-95 w-fit   `}>
        <div className="px-6 py-4 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none">
            
            {children}
        </div>
    </div>
    </Link>
    </div>
    );
}
//just what would you like to do just go on 
export default CTAButtons;