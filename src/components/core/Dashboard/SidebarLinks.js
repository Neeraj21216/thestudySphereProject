import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router";



const SidebarLinks=({link,iconName})=>{
        const Icon=Icons[iconName];
        const dispatch=useDispatch();
        const  location=useLocation();

        const matchRoute=(route)=>{
            return matchPath({path:route},location.pathname);
        }




        return (<NavLink to={link.path} 
        
            className={`relative text-sm font-medium `}
        >
            {/* <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path)?"opacity-100":"opacity-0"}`}>

            </span> */}
            <div className= {` flex ${matchRoute(link.path)?"bg-yellow-800 border-l-4 border-l-yellow-50 text-yellow-50 ":"bg-opacity-0"} px-2 py-2 gap-1  mx-0 `}>
                <Icon className="text-lg"></Icon>
                <span>{link.name}</span>
            </div>

        </NavLink>)


    


}

export default SidebarLinks;