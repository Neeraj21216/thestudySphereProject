import { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute=({children})=>{

    const {token}=useSelector((state)=>state.auth);
    console.log(token);
    if(token!==null){
        console.log("hello ");
        return children;
    }
    else{
        return <Navigate  to="/login" />
    }

}
export default PrivateRoute;