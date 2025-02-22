const Section=require("../model/Section");
const {uploadImageTocloudinary}=require("../utils/imageUplaoder");
const subSection=require("../model/SubSection");

exports.createSubSection=async (req,res) => {
    try {
        //fetch data from req body
        console.log("body of createSuSection is ",req.body);

        const {sectionId,title,timeDuration,description}=req.body;
        //extract file /video
        const video=req.files.video;
                //validation
                console.log(video);

                if (!sectionId || !title || !description || !video) { 
                    return res.status(400).json({
                        success: false,
                        message: "All fields are required",
                    });
                }
                    //upload a video to cloudinary

        const uploadDetails=await uploadImageTocloudinary(video,process.env.FOLDER_NAME);

  
        //create a sub-section
        const subSectionDetaile=await subSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });
        //update section whith this sub section objectid
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},{
            $push:{
                subSection:subSectionDetaile._id,
            }
        },{new:true}).populate({
            path:"subSection"
        });
        //return response
        //hw :update section here,after adding populate query
        return res.status(200).json({
            success:true,
            message:"subSection created Successfully",
            data:updatedSection,
        });


    } catch (error) {
        return res.status(500).json({
                success:false,
                message:"something went Wrong while creating SubCectio n ",
                error:error.message,
            })
    }
}
//delete a subsection 
exports.deleteSubSection = async (req, res) => {
    try {
        // Extracting from query params instead of body
        const { sectionId, subSectionId } = req.query;

        // Validate input
        if (!sectionId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Please provide both sectionId and subSectionId",
            });
        }

        // Find and delete the subsection
        const deletedSubSection = await subSection.findByIdAndDelete(subSectionId);
        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // Remove the subSection from the section
        const existingSection = await Section.findById(sectionId);
        if (!existingSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // Filter out the deleted subsection
        existingSection.subSection = existingSection.subSection.filter(
            (sub) => sub.toString() !== subSectionId
        );

        // Save the updated section
        const updatedSection = await existingSection.save();

        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedSection,
        });
    } catch (error) {
        console.error("Error deleting subsection:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during subSection deletion",
            error: error.message,
        });
    }
};

//update a section 
exports.updateSubSection=async (req,res) => {
    try {
        const {subSectionId,title,timeDuration,description}=req.body;
        const video=req.files.video;
        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:"Please fill all details",
            })
        }
        const uploadDetails=await uploadImageTocloudinary(video,process.env.FOLDER_NAME);


        const updatedSubSectionDetails=await subSection.findByIdAndUpdate({_id:subSectionId},{title,timeDuration,description,videoUrl:uploadDetails.secure_url},{new:true},);
        return res.status(200).json({
            success:true,
            message:"subSection Updated successfully",
            data:updatedSubSectionDetails,
            
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something went Wrong while updating Subsection ",
            error:error.message,

        })
        
    }
}
