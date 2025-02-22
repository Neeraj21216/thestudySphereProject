import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInfromationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilderForm/CourseBuilderForm";
import PublishCourse from "./PublishCourse";
export default function  RenderSteps(){
    const {step}=useSelector((state)=>state.course);
    //just like that and go on 
  //  console.log("steps iis",step);

    const steps=[
        {
            id:1,
            title:"Course Information",

        },
        {
            id:2,
            title:"Course Builder",

        },
        {
            id:3,
            title:"Publish",

        },
    ];
    //just like that 
    return (<div>
        <div className="flex flex-col ">
            <div className="flex gap-4 ">
            {
                steps.map((element,index)=>{
                    return <div className={`${step===element.id?" text-yellow-50 ":" text-white"}`} key={index}>
                        {
                            step>element.id?(<FaCheck className="text-yellow-5"/>):(<>{element.id}</>)
                        }

                    </div>
                })
            }
            </div>
           <div className="flex ">
           {
                steps.map((element,index)=>{
                    return <div>
                        {element.title}
                    </div>
                })
            }
           </div>
           {
            step===1 && <CourseInfromationForm></CourseInfromationForm>
           }
           {
            //step 2 
            step==2 && <CourseBuilderForm />
           }
           {
            step==3 && <PublishCourse />
           }
        </div>

    </div>);
}