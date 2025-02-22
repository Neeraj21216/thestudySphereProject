//what you will need to do just go on and dont do foolishness 

const { categories } = require("../../src/services/apis");
const Category = require("../model/Category");
const Tag=require("../model/Category");
//done importing 
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; 
}


// Example usage
//console.log(getRandomInt(1, 10)); // Generates a random integer between 1 and 10 (inclusive)

exports.createCategory=async (req,res)=>{
    try {
        //fetch data 
        const  {name,description}= req.body;
        //validateit 
        if(!name||!description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",

            })
        }
        //create entry in db 
        //course additon hm usme dekhenge
        const  tagDetails=await Tag.create({
            name:name,
            description:description,
        })
        console.log(tagDetails);
        return res.status(200).json({
            success:true,
            message:"Tag created successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went Wrong in Tag creation ",
            //what do ewe have to do 

        })
    }
}
//get All tags
exports.showAllCategory=async (req,res) => {
    try {
        //find all tags and make sure that it contain name ,description

        const  allTags=await Tag.find({},{name:true,description:true});
        console.log(allTags);
          
        return res.status(200).json({
            success:true,
            message:"allTag fetched  successfully",
            allTags
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went Wrong in Tag creation ",
            //what do ewe have to do
            message2:error.message, 

        })
    }
}
//something like page Category
exports.categoryPageDetails=async(req,res)=>{
    try{
        //get categoryId
        const {categoryId}=req.body;
        //get courses for specified category id
        const selectedCategory=await Category.findById(categoryId).populate({
            path:"course",
            match:{status:"Published"},
            populate:{
                path:"ratingAndReview"
            },
        }).exec();
        console.log("selected Category",selectedCategory);
        //validation 
        if(!selectedCategory){
            return res.status(404).json9({
                success:false,
                message:"Data not found",  

            })
        }
        //handle the case when there are no courses
        if(selectedCategory.course.length===0){
            console.log("No Courses found For the selected Category");
            return res.status(404).json9({
                success:false,
                message:"No Courses found For the selected Category",  

            })
        }
        //get Courses for other categories
        const categoriesExceptSelected=await Category.find({
            _id:{$ne:categoryId},
        });
        const randomIndex=getRandomInt(0,categoriesExceptSelected.length)
        
        let differentCategory=await Category.findOne(
            categoriesExceptSelected[randomIndex]._id
        ).populate({
            path:"course",
            match:{status:"Published"},

        }).exec();
        console.log("differentCategory is ",differentCategory);
        //get top-selling courses all categories
        const allCategories=await Category.find().populate({
            path:"course",
            match:{status:"Published"},
            populate:{
                path:"instructor",
            }

        }).exec();
        const allCourses=allCategories.flatMap((category)=>category.course);
        const  mostSellingCourses=allCourses.sort((a,b)=>a.studentsEnrolled.length-b.studentsEnrolled.length).slice(0,10);
        console.log("mostSellingCourses",mostSellingCourses);
        res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            }
        })
        




    }catch(error){

        res.status(500).json({
            success:false,
            message:"Error occured during Finding Category",
            error:error.message,
        })
    }
}
//remember here in category we are using course not courses 