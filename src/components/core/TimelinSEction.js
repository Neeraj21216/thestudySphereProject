
import Logo1 from "../../assets/Logo/Logo1.svg";
import Logo2 from "../../assets/Logo/Logo2.svg";
import Logo3 from "../../assets/Logo/Logo3.svg";
import Logo4 from "../../assets/Logo/Logo4.svg";


const TimeLineSection=()=>{
    //what do we
    const propertyContainer=[
        {
            Logo:Logo1,
            heading:"Leadership",
            description:"Fully committed to the success company",
        },
        {
            Logo:Logo2,
            heading:"Responsibility",
            description:"Students will always be our top priority",
        },
        {
            Logo:Logo3,
            heading:"Flexibility",
            description:"The ability to switch is an important skills",
        },
        {
            Logo:Logo4,
            heading:"Solve the problem",
            description:"Code your way to a solution",
        },

    ];

    return (
        <div className="">
            <div className="">
      {
      propertyContainer.map((element, index) => {
                    return (
                       <div>
                         <div key={index} className="flex mt-8 px-3 "> {/* Add a unique key here */}
                            <div className="mx-3 w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center ">
                                <img src={element.Logo} alt="Logo" className=" " /> {/* Add alt for accessibility */}
                            </div>
                            <div>
                                <p className="text-richblack-900">{element.heading}</p>
                                <p className="text-richblack-500">{element.description}</p>
                            </div>
                        </div>
                       <div className="translate-x-5 mt-1">
                       {index < 3 && (
                                    <div className='hidden lg:block h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]'></div>
                                )}
                       </div>
                       </div>
                    );
                })

                }

            </div>
        </div>
    );

}
export default TimeLineSection;