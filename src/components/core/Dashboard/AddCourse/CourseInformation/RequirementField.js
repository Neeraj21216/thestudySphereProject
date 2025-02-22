import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";


const RequirementField=({name,label,errors,setValue,getValues,register})=>{

    //function handle kro 
    const {editCourse,course}=useSelector((state)=>state.course);
    const [requirement,setRequirement]=useState("");
    const [requirementList,setRequirementList]=useState([]);
    useEffect(()=>{
        if(editCourse){
            setRequirementList(course?.instructions);
        }
        register(name,{required:true,
            validate:(value)=>value.length>0,
        })
    },[])

    const handleAddRequirement=()=>{
        if(requirement){
            console.log("current Requirement is ",requirement)

            setRequirementList([...requirementList,requirement]);
       //     console.log("requirementlist is ",requirementList)

            setRequirement("");
        }
    }
   useEffect(()=>{
    setValue(name,requirementList)

   },[requirementList])
    const handleRemoveRequirement=(index)=>{
        const updatedRequirementList=[...requirementList];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
        //it has been done 
    }

    return (
        <div>
            <label>
        <p>{label} <sup>*</sup></p>
 
        <input 
        type="text"
        id={name}
        value={requirement}
        onChange={(e)=>setRequirement(e.target.value)}
        className="w-full bg-richblack-700 rounded  "
        placeholder="add- Requirements"
        ></input>
        <button type="button" className="text-yellow-50" onClick={()=>handleAddRequirement()} >Add</button>

        {/* iske andar hi mujhe  */}
        {   
          
            requirementList.length>0 && (<ul>
                {
                    requirementList.map((element,index)=>{
                        console.log(element);
                        return <div key={index} className="text-white flex gap-2 items-center">
                            <p className="text-richblack-25">{element}</p>
                            <p className="text-richblack-400 text-xs"  onClick={()=>handleRemoveRequirement(index)}>Clear</p>
                        </div>
                    })
                }
            </ul>)

        }

        </label>
        {
            errors.name && (<span>{label} is also required</span>)

        }
        </div>
    );

}
export default RequirementField;