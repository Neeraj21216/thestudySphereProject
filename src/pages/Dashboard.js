import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Sidebar from "../components/core/Dashboard/sidebar";

const Dashboard=()=>{
    
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const {loading:profileLoading}=useSelector((state)=>state.profile);
    if(authLoading||profileLoading){
        return (<div>Loading....</div>);

    }
    //start doing whenever you get time because you are not coming back
console.log("hello i am in Dashboard component ");

    return (
        <div className="flex ">
            {/* sidebar */}
            <div className="w-[10%] ">
                <Sidebar />
            </div>
            <div className="w-11/12 mx-auto ">
                <Outlet></Outlet>
            </div>
        </div>
    );


}

export default Dashboard;