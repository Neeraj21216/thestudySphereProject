import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../services/operation/Setting";


const EditProfile=()=>{

    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    console.log("hello ");
    const {register,handleSubmit
        ,formState:{
            errors,
        }
    }=useForm();
    
    
    const editForm=async function (data){
    
        try{
            console.log(data);
             dispatch(updateProfile(token,data));
            
             
        }catch(error){
            console.log("error message in edit Form ",error.message);
        
        }
    
    }
    



    return (<div className="text-white">
        <h1>Profile Infromation</h1>
        <div>
        <form onSubmit={handleSubmit(editForm)}>
        <div>
                <label>
                    <p>firstName</p>
                    <input {...register("firstName",{required:"This is required"})}  />
                </label>
                <label>
                    <p>lastName</p>
                    <input {...register("lastName",{required:"This is required"})}  />
                </label>

                </div>
                <div>
                    <label>
                        <p>Date Of Birth</p>
                        <input type="date" {...register("dateOfBirth",{required:true    })} />
                    </label>
                    <label>
                        <p>Gender</p>
                        <select  {...register("gender",{required:true   ,})}>
                            <option  value="Male">Male</option>
                            <option value="female">female</option>
                        </select>
                    </label>
                    
                </div>
                <div>
                    <label>
                        <p>Contanct Number</p>
                        {/* sbme se  required ki jruri h kya is the basic things h you will have to think  a little bit and just like that */}
                        <input  type="tel" {...register("contactNo",{
                            required:true,
                            pattern:{
                                value:/^[0-9]+$/,
                                message:"Contact Number must be Numbers",
                            },
                            minLength:{
                                value:10,
                                message:"Message Must be atleast 10 digit",
                            },
                            maxLength:{
                                value:10,
                                message:"contact no must be  atmost 10 digit"
                            }
                        })}  />
                    </label>
                    {/* contact infromation */}
                    <label>
                        <p>about</p>
                        <input {...register("about",)}  placeholder="Enter Bio Details"></input>
                    </label>
                </div>
                < div >
                    <button >Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    </div>);
}
export default EditProfile;