//madarchod av btata hu 
const Tag=require("../model/Category");
const User=require("../model/User");
const Course=require("../model/Course");
const {uploadImageTocloudinary}=require("../utils/imageUplaoder");
const { json } = require("express");
const Section=require("../model/Section");
const SubSection = require("../model/SubSection");
exports.createCourse=async (req,res) => {
    try {
        //fetch data  
        const {courseName,courseDescription,whatWillYouLearn,price,category,instructions,tag}=req.body;
        //get thumbnail 
       const thumbnail=req.files.thumbnail;
        //validation 
        //tag is also lefted 
        if(!courseName||!courseDescription||!price||!category||!instructions||!thumbnail){
            //
            console.log(courseName);
            console.log(courseDescription);
            console.log(whatYouWillLearn);
            console.log(price);
            console.log(category);
          //  console.log(thumbnail);
            // console.log(courseName);

            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })

        }
        //check for instructor 
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        //todo->verify user id and instructordetail id are same or not 
        console.log("instuctor details are:",instructorDetails);
        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor  details is not found",
            })
        }
        //check given tag is valid or not
        const tagDetails=await Tag.findOne({name:category});
        console.log("category details are ",tagDetails);
        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message:"tag  details is not found",
                
            })
        }

        //upload image to cloudinary
       const thumbnailImage=await uploadImageTocloudinary(thumbnail,process.env.FOLDER_NAME);
        //for this moment we are leaving this upload whenever you require
        //create and entryfor new Course 
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            whatWillYoulearn:whatWillYouLearn,
            price,
            category:tagDetails._id,
            tag:tag,
            instructor:instructorDetails._id,
            instructions:instructions,
            thumbnail:thumbnailImage.secure_url,
        })
        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate({_id:instructorDetails._id},{
            $push:{
                courses:newCourse._id,
            }

        },{new:true});
        //update the tag ka schema 
        //todo:hw
        await Tag.findByIdAndUpdate({_id:tagDetails._id},{
            $push:{
                course:newCourse._id,
            }
        });
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while creating Course",
            error:error.message,
            
        })
    }
}
//show all couse 


exports.showAllCourses=async (req,res) => {
    try {
        //change the below statement 
        const allCourses=await Course.find({})
        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched successfully",
            data:allCourses,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot fetch course Data",
            error:error.message,
        })
    }
}
//how wil 

exports.showCourseDetail=async (req,res) => {
    try {
        //yha pe kya chiz ki jrurat course id 
    //get id
        console.log("body of request",req.body);
        const {courseId}=req.body;
        //find Coursedetails 
        console.log("courseId is",courseId);
        const courseDetail=await Course.find({_id:courseId}).populate(
            {
               path: "instructor",
               populate:{
                path:"additionalDetails",
               },
            }

        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
             
        }).populate("ratingAndReview").populate("category").exec();
        //sbkuch populate krna pdega just 


        //somehting has been changed so learn about tht 
        console.log("courseDetail is ",courseDetail);

        if(!courseDetail){
            return res.status(400).json({
                success:false,
                message:"Course Does Not Exist",
            })
        }
        //return response 
        return res.status(200).json({
            success:true,
            message:"Data fetched Successfully",
            data:courseDetail,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while fetching all details of course",
            error:error.message,
        })
    }
}
//update course is needed i am going to write all thing 


exports.editCourseDetails = async (req, res) => {
    try {
        const { courseId, category } = req.body;
        const updates = req.body;

        // Ensure course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // 🔹 Convert category name (e.g., "C++") to ObjectId
        if (typeof category === "string") {
            const categoryDetails = await Tag.findOne({ name: category });
            if (!categoryDetails) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category name",
                });
            }
            updates.category = categoryDetails._id; // Replace with ObjectId
        }

        // Handle file uploads if needed
        if (req.files) {
            console.log("Thumbnail update detected");
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageTocloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            );
            course.thumbnail = thumbnailImage.secure_url;
        }

        // Update course fields
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key]); // Ensure correct parsing
                } else {
                    course[key] = updates[key];
                }
            }
        }

        await course.save();
        
        // Fetch updated course with references populated
        const updatedCourse = await Course.findOne({ _id: courseId })
            .populate({
                path: "instructor",
                populate: { path: "additionalDetails" },
            })
            .populate("category")
            .populate("ratingAndReview")
            .populate({
                path: "courseContent",
                populate: { path: "subSection" },
            }).populate("whatWillYoulearn")
            .exec();
            console.log("updated course is",updatedCourse);
        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred during course editing",
            error: error.message,
        });
    }
};


exports.getInstructorCourses=async (req,res)=>{
    try{

        const instructorId=req.user.id;
    
    console.log("istructoridis ",instructorId);
    const instructorCourses=await Course.find({
        instructor:instructorId,

    }).sort({createdAt:-1});
    //return the response
    res.status(200).json({
        success:true,
        message:"Courses fetched Successfully",
        data:instructorCourses,
    })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occured while fetching the instructor details",
            error:error.message,

        })
    }

}

//done    

exports.deleteCourses=async(req,res)=>{
    try{
        const {courseId}=req.body;
        //find the course
      //  console.log("courseId is",courseId);
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success:false,
                message:"course Not found",
            })
        }
        //unenroll students from the course
        const  studentEnrolled=course.studentsEnrolled;
        for(const studentId  of studentEnrolled){
            await User.findByIdAndUpdate(studentId,{
                $pull:{courses:courseId},
            })
        }
        //delete sections and sub-Sections
        const CourseSections=course.courseContent;
        for(const sectionId of CourseSections ){
            //delete Sub-section of the section 
            const section=await Section.findById(sectionId);
            if(section ){
                const subSections=section .subSection;
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }
            await Section.findByIdAndDelete(sectionId);
        }

        //delete the course
        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            success:true,
            message:"Course deleted Successfully",
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred during course deletion",
            error: error.message,
        });
    }

}

exports.getEnrolledCourses=async(req,res)=>{
    try{
        const userId=req.user.id;
        //if you got 
        //find out the user 
        const userDetails=await User.findById(userId).populate("courses").exec();
        //enrolled Courses 
       if(!userDetails){

        return res.status(400).json({
            success:false,
            message:`could not find the user with id ${userId}`,
        }) 
          }
        
        res.status(200).json({
            success:true,
            data:userDetails.courses,
        })


    }catch(error){
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"Problem in fetching Course Details",
            error:error.message,

        })
    }
}



exports.getFullCourseDetails = async (req, res) => {
    try {
      console.log("10");  
      console.log("Request Params:", req.params); // Debugging

      const { courseId } = req.params;
      const userId = req.user.id
      // console.log("c",courseId, "f",userId);
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()

        console.log(1,"c",courseDetails,8);
  
      let courseProgressCount = await CourseProgress.findOne({
        courseId: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)

      console.log(2);
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }

      console.log(3,courseDetails);
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
