
import {NavbarLinks} from "../../data/navbar-link"
import Logo from "../../assets/studyNotionlogo/Logo-Full-Light (1).png"
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { apiConnector } from "../../services/apiConnector";
import { CiCircleChevDown } from "react-icons/ci";
import { categories } from "../../services/apis";
import Profilesection from "../core/nabar/ProfileSection"
// const  subLinks=[
//     {
//         title:"python",
//         link:"/catalog/python"
//     },
//     {
//         title:"web dev",
//         link:"/catalog/web-dev"
//     }
// ];
const Navbar=()=>{
    //mujhe ek chiz maintain krni pdegi
    //
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);
    console.log("user is ",user);
   // console.log("user image is",user.image);


    const [tab,setTab]=useState(NavbarLinks[0].title)
    const [subLinks,setSubLinks]=useState([]);
    
    const ClickHandler=(value)=>{
        setTab(value);
    }  
   
    // chlo guys lets do this
    const fetchSubLinks=async()=>{
        
        try{

            const bodyData={
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5lZXJhai5rdW1hci51ZzIyQG5zdXQuYWMuaW4iLCJpZCI6IjY3OGI4NmVmNzhkMjUyOGM2NzE4ZTBkMSIsImFjY291bnRUeXBlIjoiQWRtaW4iLCJpYXQiOjE3Mzc5MTM2NjUsImV4cCI6MTczNzkyMDg2NX0.ALpTTwL8T361rA0bHwMeMhYnuSlAvnJe98x7dVgXeEg",
            };
            const result=await apiConnector("GET",categories.CATEGORIES_API,bodyData);
            console.log("Printing Sublinks result:",result.data);
            setSubLinks(result.data.allTags);
        }
        catch(error){
            
            console.log("could not fetch the category list",error);
        }
    }
    useEffect(()=>{
        fetchSubLinks();
    },[])
  
    return (

        <div className=" flex justify-evenly border-b-[1px] border-richblack-700 items-center">
           <div>
           <Link to="/">
                <img src={Logo} alt="" />
           </Link>
           </div>
           <div className="flex gap-x-2 ">
                {
                    NavbarLinks.map((element,index)=>{
                        return <div key={index}>

                            {
                            (element.title==="Catalog")?<div className={` relative flex  text-white gap-1 items-center group  ` }  onClick={()=>{ClickHandler(element.title)}}>
                                {element.title}
                                <CiCircleChevDown/>
                                <div className="invisible -translate-x-40 translate-y-3 absolute left-[50%] top-[50%] 
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 
                                opacity-0 group-hover:visible group-hover:opacity-100 w-[300px]">
                                    {
                                        subLinks.map((element,index)=>{
                                            return <div key={index}>
                                              <Link to={`/catalog/${element.name}`}>
                                              {element.name}
                                              </Link>
                                            </div>
                                        })
                                    }
                                </div>
                                <div className=" invisible  translate-x-4 absolute top-4 left-[50%]  h-6 w-6 rotate-45 rounded bg-richblack-5 group-hover:visible"></div>

                            </div>:(<Link to={element.path}>
                                <div className={`${element.title===tab?"text-yellow-5":"text-white"}` } onClick={()=>{ClickHandler(element.title)}} >{element.title}</div>
                            </Link>)


                            }


                        </div>
                    })
                }
            </div>
            <div className="flex items-center gap-x-2">
                {/* login signup dashBoread */}
                {/*  */}
                {
                    user && user?.accountType!="Instructore"&&(
                        <Link to="/dashboard/cart" className="relative gap-0 items-center justify-center rounded-full hover:bg-caribbeangreen-300 px-2  py-0">
                            {
                              totalItems>0 &&   (
                                    <span className="text-xs mx-2  ">
                                         {totalItems}
                                    </span>
                                )
                            }
                             <AiOutlineShoppingCart className=" text-2xl -translate-y-2 " />   

                        </Link>
                    )

                                
                }
                {
                    token===null && (


                        <div className="mt-2 mb-2">
                            <Link to="/login" className="">
                            <button  className=" border bg-richblack-800 border-richblack-700 text-richblack-100  px-5 py-3 rounded-md">Log in </button>
                             </Link>
                        </div>
                    )
                }
                {
                    token===null && (
                        <Link to="/signup" className="mt-2 mb-2">
                            <button className=" border bg-richblack-800 border-richblack-700 text-richblack-100  px-5 py-3 rounded-md">Sign up </button>
                             </Link>
                    )
                }
                {
                    token!==null &&(
                        <div className="mx-2 mt-2 ">
                            <Profilesection/>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default Navbar;