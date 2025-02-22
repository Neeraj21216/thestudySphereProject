import { useState } from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import IconBtn from "../../../../common/IconBtn";
import { IoAddOutline } from "react-icons/io5";
import SubSectionModal from "./SubSectionModal";
import confirmationalModal from "../../../../common/ConfirmationalModal";
import { setCourse } from "../../../../../slices/courseSlice";
import { deleteSection } from "../../../../../services/operation/CourseDetailAPI";
import { deleteSubSection } from "../../../../../services/operation/CourseDetailAPI";
import { AiFillCaretDown,AiFillCaretUp } from "react-icons/ai";

//TODO:understand why details and summary are used irrespective of div span 
const NestedView=({handleEditSectionName})=>{
    //you will need state to view edit delete something like that what would you like to do 

    const {token}=useSelector((state)=>state.auth);
    const {course}=useSelector((state)=>state.course);
    const dispatch=useDispatch();

    const [addSubSection,setAddSubSection]=useState(null);
    const [viewSubSection,setViewSubSection]=useState(null);
    const [editSubSection,setEditSubSection]=useState(null);
    const [confirmationModal,setConfirmationModal]=useState(null);
    const [openSections, setOpenSections] = useState({}); 

    const toggleSection = (sectionId) => {
        setOpenSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId], // Toggle expansion
        }));
    };

    const handleDeleteSection=async(sectionId)=>{
        //delete the subsection 
        const result=await deleteSection(
            {sectionId,
            courseId:course._id,
            },token
        );
        if(result){
            ///TODO:hm extra kya kr skte h
            // const updatedCourseContent=course.courseContent.filter((section)=>section._id!==sectionId);
            dispatch(setCourse(result));

        }
    }
    const handleDeleteSubSection=async(sectionId,subSectionId)=>{
        //delete sub section
        const result = await deleteSubSection(sectionId, subSectionId, token);

        if(result){
            //TODO:aur extra kya kr skte h 
            //const result=deleteSubSection({sectionId,subSectionId},token);
            if(result){
                //to kyakrna h 
                const updatedCourseContent = course.courseContent.map((section) => {
                    if (section._id === sectionId) {
                        return {
                            ...section,
                            subSection: section.subSection.filter(sub => sub._id !== subSectionId) 
                        };
                    }
                    return section;
                });
                const updatedCourse = { ...course, courseContent: updatedCourseContent };
                dispatch(setCourse(updatedCourse));
                
            }

        }
        setConfirmationModal(null);

    }
    

  //  console.log("hello ji im in nested subsection",course);

    return (<div className="text-white bg-richblack-700 rounded px-3 py-3 mt-4">

        {
            course.courseContent.length>0 && (<div className="flex flex-col my-5 mb-5">
                
                {
                course?.courseContent.map((section)=>{
                   return  (<details key={section._id} className="mt-2  border-b-2 gap-3">
                        <summary  className="flex justify-between ">

                           <div className="flex ">
                           <RxDropdownMenu className="flex" />
                           {section.sectionName}
                           </div>
                           <div className="flex gap-2  ">
                            {/* icon part */}
                            <button onClick={()=>handleEditSectionName(section._id,section.sectionName)}>
                                <MdEdit />
                            </button>
                            <button onClick={()=>{
                                // setConfirmationModal({
                                //     text1:"",
                                //     text2:"",
                                //     btnText1:"",
                                //     btnText2:"",
                                //     btnHandler1:()=>handleDeleteSection(section._id),
                                //     btnHandler2:()=>setConfirmationModal(null),

                                // })
                                handleDeleteSection(section._id);
                                }} >
                                <RiDeleteBin6Line></RiDeleteBin6Line>
                            </button >
                            <button onClick={(e) => {
                                        e.preventDefault(); // Prevent default <details> behavior
                                        toggleSection(section._id);
                                    }}>
                                        {openSections[section._id] ? <AiFillCaretUp /> : <AiFillCaretDown />}
                                    </button>
                           </div>
                           
                        </summary>   
                        <div>
                          
                           {
                           section?.subSection?.length>0  &&  section.subSection.map((data)=>{
                               
                                
                                return (  <div key={data?._id} className="flex justify-between"
                                onClick={()=>setViewSubSection( viewSubSection === data ? null : data)}
                                >
                                    <div className="flex   "   >
                                    <RxDropdownMenu  />
                                    <p>{data.title}</p>
                                    </div>  
                                    <div onClick={(e)=>e.stopPropagation()}>
                                        <button onClick={()=>{setEditSubSection({...data,sectionId:section._id})}}>
                                            <MdEdit />
                                        </button>
                                        <button
                                        onClick={()=>{
                                            // setConfirmationModal({
                                            //     text1:"Delete this sub section ",
                                            //     text2:"Selected Lecture will be deleted",
                                            //     btnText1:"Delete",
                                            //     btnText2:"Cancel",
                                            //     btnHandler1:()=>handleDeleteSubSection(section._id),
                                            //     btnHandler2:()=>setConfirmationModal(null),
            
                                            // })
                                            handleDeleteSubSection(section._id,data._id)
                                        }}
                                        >
                                        <RiDeleteBin6Line />
                                        </button>
                                    </div>


                                </div>)
                            })
                           }
                          
                                   
                        </div>
                        <div>
                             <button className="text-yellow-50 flex gap-2" onClick={()=>setAddSubSection(section._id)} >
                               <IoAddOutline />
                              <p>Add Lecture</p>
                              </button>
                        </div>
                       {/* now that thing i need which modals  */}
                       
                       
                    </details>)
                })
                }
            </div>)
        }
        {
            addSubSection ?(<SubSectionModal
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
                />):viewSubSection?(<SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                    />):
            editSubSection?(<SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
                />):(<div></div>)
        }

   
        {
            confirmationModal?
           ( <confirmationalModal
            modalData={confirmationModal}
            setModalData={setConfirmationModal}
            />)
            :(<div></div>)
        }


        
        
    </div>)

}
export default NestedView;