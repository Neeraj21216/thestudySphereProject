import { useEffect ,useState} from "react";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operation/pageAndComponentData";
import { useParams } from "react-router";
import Course_Card from "../components/core/Catalog/Course_card"
import { fetchCourseCategory } from "../services/operation/CourseDetailAPI";
import Slider from "../components/core/Catalog/Slider"
const Catalog=()=>{

    //category name in params and fetchwhole category form that
    const {catalogName}=useParams();

    
    const [catalogPageData,setCatalogPageData]=useState(null);
    const [categoryId,setCategoryId]=useState("");
    //fetch all categories   
    useEffect(()=>{
            
               const  getCategories=async ()=>{
                const res=await fetchCourseCategory();
                //console.log("categoyapi response is",res);

                const category_id_Array=res.filter((categories)=>categories.name===catalogName)
              //  console.log("categoryId is ",category_id_Array);

                setCategoryId(category_id_Array[0]._id);
             //   console.log("categoryId is ",categoryId);


            }     
            getCategories();   
  

},[catalogName]);

useEffect(()=>{
    const getCategoryDetails=async ()=>{
        try{
            if(categoryId===""){
                return ;
            }
            const res=await getCatalogPageData(categoryId);
          //  console.log("result  is ",res);

            setCatalogPageData(res);
          //  console.log("catalogPageDAtais",catalogPageData)
        }
        catch(error){
            console.log(error);
        }
    }
    getCategoryDetails();
},[categoryId]);

    return (<div>
        <div>
            <div>
                <p>HOME/CATALOG/
                    <span className="text-yellow-50">{catalogName}</span>
                </p>
                <p>{catalogPageData?.data?.selectedCategory?.name}</p>
                <p className="text-richblack-500">{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>
        </div>
        <div>
                        {/* section 1 get you started */}
                        <div>
                                <div>
                                    <p>Most Popular</p>
                                    <p>New</p>
                                    <p>Trending</p>
                                </div>
                        <Slider courses={catalogPageData?.data?.selectedCategory?.course} ></Slider>
                        </div> 
                        {/* section 2*/}
                        <div>
                            <p>Top course</p>
                            <div>
                                <Slider courses={catalogPageData?.data?.differentCategory?.course}></Slider>
                            </div>
                        </div>
                        {/* section 3 */}
                        <div>
                             
                            <div>Frequently Bought Toghether</div>
                            <div>
                            <div className="grid  lg:grid-cols-2  mx-5">
                                   
                                    {
                                        catalogPageData?.data?.mostSellingCourses.slice(0,4).map((course,index)=>{
                                           return  <Course_Card course={course} key={index} Height="100px"  />
                                        })
                                    }
                                </div>
                            </div>
                              

                        </div>
        </div>




        <div></div>
        {/* use the footer  */}

    </div>)
}

export default Catalog;