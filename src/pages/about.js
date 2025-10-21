
    import  aboutus1 from "../assets/images/aboutus1.webp"
    import  aboutus2  from "../assets/images/aboutus2.webp"
    import aboutus3 from "../assets/images/aboutus3.webp"
    import foudingStory from "../assets/images/FoundingStory.png"
    import Boxpart from "../components/core/about/LearningSection"
    import CTNButtons from  "../components/core/HomePage/CTNButtons"
    import HighlighText from "../components/core/HomePage/HighlighText"
    import Contact from "./contact"


//

const About=()=>{
    const data=[
        {
            number:"5k",
            textContent:"Active Students",
        },
        {
            number:"10+",
            textContent:"Mentors",
        },
        {
            number:"200+",
            textContent:"Courses",
        },
        {
            number:"50+",
            textContent:"Awards",
        },
    ]
    return (
        <div className="bg-richblack-900 flex flex-col w-full justify-center ">
            {/* first SEction  */}

           <div>
           <div className="flex flex-col bg-richblack-700 h-[500px] items-center gap-y-3 ">
                <div class="text-center flex flex-col text-4xl font-bold text-richblack-25 mt-14">
                Driving Innovation in Online Education for a  
        
                 <HighlighText text="Brighter Future" className="my-2" />
                </div>
                <div className="text-center w-[57%] text-richblack-300  font-bold">
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </div>
                <div className="sm:h-[70px] lg:h-[300px]"></div>

                <div className="absolute  left-[50%] grid w-[90%] translate-x-[-45%] translate-y-[90%] grid-cols-3  " >
                    <img src={aboutus1}></img>
                    <img src={aboutus2}></img>
                    <img src={aboutus3 }></img>
                </div>

            </div>
            {/* down of the girl section  */}
            <div className="mt-40 flex  mb-6 text-xl ">

            <div className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white  border-b-[1px] border-b-richblack-600">
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-1xl ml-1">
           {"combines technology"} 
           
        </span>
            {", "}
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
        
            expertise
        </span>
            {", and community to create an "}
        <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            unparalleled educational experience.
        </span>
    </div>
            </div>

             {/* section 3  */}
             <div className="flex flex-col">
                    <div className="translate-y-[ 90%] flex justify-evenly">
                    <div className="w-[40%] mt-[5%]">
                    <p className="text-4xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text font-bold text-transparent">Our Founding Story
                    </p>
                    <p className="text-base font-inter text-richblack-200 my-10">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                   <p className="text-base font-inter text-richblack-200 "> As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                     

                </div>
                <div  className="mt-[7%]  shadow-[0_0_10px_rgba(219,39,119,2)]">
                    <img src={foudingStory}  />

                </div>
                    </div>
                    <div className="h-[300px]"></div>
             </div>

             {/* section 4  */}
             <div className="flex text-4xl ">
                <div>
                    <p className="bg-yellow-700 bg-clip-text text-transparent">Our Vision
                    </p >
                    <p className="text-xl">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>

                </div>
                <div>
                    <HighlighText text="Our Mission"/>
                    <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>

                </div>
             </div>

             {/* footer type section wala  */}
             {/* <div>
                {
                    data.map((element,index)=>{
                        return <div
                        key={index}

                        >
                            <p>{element.number}</p>
                            <p>{element.textContent}</p>
                        </div>

                    })
                }
             </div> */}

             {/* last Section   */}
             {/* <div>
                <div>
                    <p>World-Class Learning for</p>
                    <HighlighText text="Anyone, Anywhere"></HighlighText>
                    <p>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                    <CTNButtons active={true} to={"/"}>
                    Learn More
                    </CTNButtons>
                </div>

                <div>
                    <Boxpart />
                </div>
               
             </div> */}
            {/* form part  */}
           </div>

        <Contact />  





        </div>
    );
    
}
export default About;

