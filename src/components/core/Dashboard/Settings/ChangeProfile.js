import { useState } from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { MdOutlineFileUpload } from "react-icons/md";


const ChangeProfile=()=>{
    const {user}=useSelector((state)=>state.profile);

    const {image,setImage}=useState(null);
    const changeHandler=(e)=>{
        setImage(e.target.file[0]);
        console.log(file);
    }
    const submitHandler=(e)=>{
        e.preventDefault();

    }
    return (
        <div>
            <div>
                <img src={user?.image}></img>
            </div>
            <div>
                <p>Change Profile Picture</p>
                <form onSubmit={submitHandler}> 
                    <input type="file" onChange={changeHandler}> select</input>
                    <button type="submit">
                        <IconBtn>
                            <div>
                            Upload
                            <MdOutlineFileUpload />
                            </div>
                        </IconBtn>
                    </button>
                </form>
            </div>

        </div>
    );
}