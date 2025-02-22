//
const Section =require("../model/Section");
const User = require("../model/User");
const Course=require("../model/Course");

exports.createSection=async (req,res) => {
    try {
        //data fetch 
        const {sectionName,courseId}=req.body;
        //data validation 
        if(!sectionName||!courseId||sectionName.length==0){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            })   
        }
        //create section
    //    console.log("hi");
        const newSection = await Section.create({ sectionName });
        //  update course with secton ObjectId;
        //console.log("new section is ",newSection);


    //   cosnole.log(newSection);
    const updatedCourse=    await Course.findByIdAndUpdate({_id:courseId},{
            $push:{
                courseContent:newSection._id,
            }
            

        },{new:true}) .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }, 
        })
        .exec();
        console.log("updated course after section creation is ",updatedCourse);

        //hw :use Populate to replace section /sub-section both
    //        return response
    res.status(200).json({
        success:true,
        message:"section created Succesfully",
        data:updatedCourse,
    }

    )
    

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went Wrong during section creation ",
            error:error.message,
        })

    }
}


//update section
exports.updateSection=async (req,res) => {
    try {
        //data input
        const {sectionName,sectionId}=req.body;
        //data validation 
        if(!sectionName||!sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            })
        }
        //update data 
        const updatedSection =await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true}).populate({
            path:"subSection",
        });
        //return res
       // console.log("printing inside updateSection ",sectionName,sectionId)

        res.status(200).json({
            success:true,
            message:"section updated Succesfully",
            data:updatedSection,

        });
    
        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went Wrong during section updation ",
            //someresponse need ed to give them jus like tha t
            error:error.message,
        })
    }
}
//delete id 
exports.deleteSection=async (req,res) => {
    try {
         //get id -assuming that we are sending id in params 
         const {sectionId}=req.body;
         const {courseId}=req.body;
         //data validation 
         console.log("SECTION DELETION : BODY IS    ",req.body);
         if(!sectionId){
             return res.status(400).json({
                 success:false,
                 message:"Missing Properties",
             })
         }
         //delete section 
        const newSection= await Section.findByIdAndDelete(sectionId);
         //todo :do we need to delete the entry from the course schema ?
        // const newCourse=await Course.courseContent.findByIdAndDelete(sectionId,{new:true});
        const existingCourse=await Course.findById(courseId);
        const updatedCourseContent=existingCourse.courseContent.filter((section)=>section._id.toString()!==sectionId);
      //   const existingCourse=await Course.findById({_id:courseId});
         //now is existing Course me jo 

      //  const updatedCourse={existingCourse,courseContent:updatedCourseContent};
        const finalCourse=await Course.findByIdAndUpdate(courseId,
            {$set:{
                courseContent:updatedCourseContent,
            }}
            ,{new:true}).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        });
         

         
         res.status(200).json({
             success:true,
             message:"section deleted Succesfully",
             data:finalCourse,
             
         });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went Wrong during section deletion ",
            error:error.message,
        })
    }
}