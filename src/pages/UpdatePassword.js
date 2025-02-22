
//just get what would you like and then go on 
import { useLocation } from "react-router";
import { resetPassword } from "../services/operation/authAPI";
import { useDispatch, useSelector } from "react-redux";

const { useState } = require("react");
const { BiLeftArrow } = require("react-icons/bi");
const { Link, useNavigate } = require("react-router");

const UpdatePassword=()=>{
    //kis kis chiz ki jrurat pdegi
    const dispatch = useDispatch();
    // const navigator=useNavigate();
    //this is going to be problem findOut and just go on  so be like tha
    const {loading}=useSelector((state)=>state.auth );
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:"",
    });
    const {password,confirmPassword}=formData;

    const location = useLocation();

    const changehandler=(e)=>{

        setFormData(
            {...formData,[e.target.name]:[e.target.value]}
        )
        console.log(formData);
        //just done 
    }
    const submitHandler=(e)=>{
        e.preventDefault();

        const token = location.pathname.split('/').at(-1);
        console.log("token is :",token);

        dispatch(resetPassword(password,confirmPassword,token));
        
    }

    return (<div className="text-white">
        hello 
            {
                loading?(
                    <div>
                        Loading..
                    </div>

                ):(<div>
                    <div>choose New Passowrd</div>
                    <div>Almost done. Enter your new password and youre all set.</div>
                    <form onSubmit={submitHandler}>
                        <label>
                            <p>password
                                <sup>* </sup>
                            </p>
                            <input type="password" 
                            name="password"
                            value={password}
                            placeholder="Enter Password"
                            onChange={changehandler}
                            className="text-black"
                            /> 
                        </label>  
                        <label>
                            <p>confirm Passowrd
                                <sup>* </sup>
                            </p>
                            <input
                             type="password" 
                             name="confirmPassword"

                             value={confirmPassword}
                             placeholder="Enter Confirm Password"
                             onChange={changehandler}
                             className="text-black"

                            /> 
                        </label>
                        {/* show password wala rhta h just like that and find out like that and then this happens and tehn  */}
                        <button type="submit">Reset password</button>
                    </form>
                    {/* <div>
                    <Link to={"/login"}>
                    <div>
                        <BiLeftArrow></BiLeftArrow>
                        Back To Login
                    </div>
                    </Link>
                    </div> */}
                </div>

                    )
            }
    </div>);
}
export default UpdatePassword;