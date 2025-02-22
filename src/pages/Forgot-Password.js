import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { getPasswordToken } from "../services/operation/authAPI";



const ForgotPassword=()=>{
    const dispatch=useDispatch();
    const [sentEmail,setSentEmail]=useState(false);
    const [email,setEmail]=useState("");


    const {loading}=useSelector((state)=>state.auth)
    //
  
    const changHandler=(e)=>{
        setEmail(e.target.value);
        //email set hogya 
    }
    const submitHandler=(e)=>{
        console.log(email);
        e.preventDefault();
        //default has been prevented so do t
       // dispatch()
       dispatch(getPasswordToken(email,setSentEmail))
    }

    return (
        <div>
            {
                loading?(<div> Loading :</div>):(
                    <div>
                        <div>
                            {
                                !sentEmail?(<p>Reset your password</p>):(<p>Check email</p>)
                            }
                        </div>
                        <div>
                            {
                                !sentEmail?
                                (<div>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</div>)
                                :(<div>
                                    We have sent the reset email to
                                    {email}
                                </div>)
                            }
                        </div>
                        <form onSubmit={submitHandler}>
                            {
                                !sentEmail &&(<label>
                                    <p>Email Addreses
                                        <sup>*</sup>
                                    </p>
                                    <input
                                    name="email"
                                    value={email}
                                    onChange={changHandler}
                                    
                                    ></input>
                                </label>)

                            }
                            <button type="submit">
                                {
                                    !sentEmail?"submit":"resendEmail"
                                }
                            </button>

                        </form>



                    </div>
                )
            }

        </div>
    );


}

export default ForgotPassword;