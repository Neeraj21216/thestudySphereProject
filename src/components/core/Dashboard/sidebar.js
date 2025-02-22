import { useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLinks from "./SidebarLinks";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router";
import { useState } from "react";

const Sidebar=()=>{
    
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const {loading:profileLoading,user}=useSelector((state)=>state.profile);
    const [confirmationalModal,setConfirmationalModal]=useState(null);
    if(authLoading||profileLoading){
        return (<div>loading...</div>)
    }


   /// console.log("i am inside Sidbar ");
    

    return (
        <div>
            <div>
               { sidebarLinks.map((link,index)=>{
                    
                    if(link.type && user?.accountType!==link.type)return null;
                    else  {

                        
                       return  (<SidebarLinks link={link}  iconName={link.icon} key={link.id}></SidebarLinks>)
               }
                })
            }
            </div>
            <div className="h-[100px ] border-b-2 border-b-richblack-400"></div>
            <div className="">
                <SidebarLinks link={{name:"setting",path:"dashboard/settings"}}
                iconName="VscSettingsGear"
                />
                <button></button>
            </div>
        </div>
   )

}

export default Sidebar;