import { VscArrowSmallRight } from "react-icons/vsc";
import { Link } from "react-router";
import HighlighText from "../components/core/HomePage/HighlighText";
import CTAButtons from "../components/core/HomePage/CTNButtons";
import Banner from "../assets/images/Banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import bgPic from "../assets/images/bghome-_1_.jpg"
import { FaArrowRight } from "react-icons/fa";
import TimeLineSection from "../components/core/TimelinSEction";
import Girlpic from "../assets/images/girl.jpg"
import LearningSection from "../components/core/HomePage/LearningSection"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from "../components/core/HomePage/ExploreMore"
const  Home= ()=>{
return (
    <div>
        {/* //section 1  */}
        
        <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
            <div className="group mt-16 p-1 mx-auto rounded-full text-lg bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit ">
                <Link to={"/signup"}>
                    <div className="flex gap-2 font-bold items-center   bg-richblack-800 px-10 py-[5px] rounded-full transition-all duration-200 hover:scale-95 w-fit group-hover:bg-richblack-900">
                        <p>Become an instructors</p>
                        <VscArrowSmallRight></VscArrowSmallRight>
                    </div>
                </Link>
             </div>
            <div className="flex gap-1 text-4xl font-bold mt-5">
                <p>
                Empower Your Future with 
                </p>
                <HighlighText text={"Coding Skills"}></HighlighText>
            </div>

            <div className="font-bold text-richblack-300 text-xl mt-5">
                <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of </p>
                <p className="px-40"> resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
            </div>

           <div className="flex gap-7 mt-16 ">
            <CTAButtons active={true} children={"Learn More"} toLink={"/signup"}></CTAButtons>
            <CTAButtons active={false} children={"Book a Demo"} toLink={"/login"}></CTAButtons>


           </div>

            <div className=" mt-16 w-11/12">
                <video controls autoPlay muted >
                    <source src={Banner}  />
                </video>
            </div>
            {/* Code Section -1 */}
            <div className="mx-12">
                <CodeBlocks
                position={"lg:flex-row"}
                heading={
                    <div className="text-4xl font-semibold">
                        Unlock Your
                        <HighlighText text={" Coding Potential"}></HighlighText>
                        with our Online courses
                    </div>
                }
                subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={
                    {
                        btnText:"Try it Yourself",
                        toLink:"/signup",
                        active:true,
                    }
                }
                ctabtn2={
                    {
                        btnText:"Learn More",
                        toLink:"/login",
                        active:false,
                    }
                }
                codeblock={
                    `<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a>This is myPage</h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav>\n</body>`
                }
                codeColor={"text-yellow-25"}
                />
            </div>
            <div className="mx-12">
                <CodeBlocks
                position={"lg:flex-row-reverse"}
                heading={
                    <div className="text-4xl font-semibold">
                        Start 
                        <HighlighText text={" coding in seconds"}></HighlighText>
                    </div>
                }
                subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctabtn1={
                    {
                        btnText:"continue lesson",
                        toLink:"/signup",
                        active:true,
                    }
                }
                ctabtn2={
                    {
                        btnText:"Learn More",
                        toLink:"/signup",
                        active:false,
                    }
                }
                codeblock={
                    `<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a>This is myPage</h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav>\n</body>`
                }
                codeColor={""}
                />
            </div>
            <div>
                
                <ExploreMore></ExploreMore>
            </div>

            






         </div>

        {/* //section 2 */}
        <div className="bg-pure-greys-5  flex flex-col  mx-auto  text-4xl  font-inter justify-between translate-y-28 ">
               <div className="homepage_bg h-[310px] w-screen">
                    <div className=" flex mx-auto items-center text-white w-11/12 gap-6 items-center justify-center mt-48">
                        <CTAButtons active={true} toLink={"/singup"} >
                        <div className="flex gap-2">
                            Explore Full Catalogue
                            <FaArrowRight className="mt-1"></FaArrowRight>
                        </div>
                        </CTAButtons>
                        <CTAButtons active={false} toLink={"/login"} >
                        <div className="flex gap-2">
                            Learn More
                            </div>
                        </CTAButtons>
                    </div>
               </div>
               <div  className="flex gap-28 mx-36 mt-28">
                <div className="w-[50%] font-bold ">
                    Get the Skills you need For a 
                    <HighlighText text={"job That is in demand"}></HighlighText>
                </div>
                <div className="w-[40%]">
                    <div className="text-lg text-richblack-600 ">     The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                    <div className="mt-12">
                    <CTAButtons active={true} toLink={"/singup"}  >
                    <div className="">
                        Learn More
                    </div>
                    </CTAButtons>
                    </div>
                </div>
               </div>

               {/* girl Image Section */}
               <div className="left-[100px] text-xl flex  mx-44">
                <TimeLineSection></TimeLineSection>
                <div className="relative flex flex-col justify-end  translate-x-28 mr-10">
                    <img src={Girlpic} className="shadow-white  shadow-[20px_20px_0_0]"></img>
                    <div className="absolute  bg-caribbeangreen-700 h-[100px] w-[90%] translate-x-7 translate-y-9 flex items-center">
                        <div className="border-r-2 border-caribbeangreen-500 border-solid flex w-[50%]] gap-4 mx-9 ">
                            <div className="text-white text-4xl font-bold mt-4 ">10</div>
                            <div className="text-caribbeangreen-400 mx-4 mt-3 text-base  uppercase">Years experience</div>
                        </div>
                        <div className=" flex w-[50%]] gap-3 mx-9 ">
                            <div className="text-white text-4xl font-bold mt-4 uppercase">250</div>
                            <div className="text-caribbeangreen-400 mx-4 mt-1 text-base mt-2  uppercase ">types of courses
                            </div>
                        </div>
                    </div>
                </div>
               </div>
   
                {/* Card SEction */}
                  
                <div>

                <LearningSection></LearningSection>
                </div>

            </div>

        {/* section 3 */}

        <div className="w-11/12 flex mx-auto font-inter mt-48 ">
        {/* what are you going to do just go on and find my best nad  */}
        <InstructorSection></InstructorSection>
    
        </div>



        {/* section  */}

    </div>
);
}
export default Home;