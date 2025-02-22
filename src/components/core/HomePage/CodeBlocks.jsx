import { FaArrowRight } from "react-icons/fa";
import CTAButtons from "./CTNButtons";
import { TypeAnimation } from "react-type-animation";


const CodeBlocks=({
    position,heading,subHeading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor
})=>{
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10 `}>
            {/* section1 */}
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                {heading}
                <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">{subHeading}</div>
                <div className="flex gap-7 mt-7">
                    <CTAButtons active={ctabtn1.active} toLink={ctabtn1.toLink}>
                        <div className="flex gap-2">
                            {ctabtn1.btnText}
                            <FaArrowRight className="mt-1"></FaArrowRight>
                        </div>
                    </CTAButtons>
                    <CTAButtons active={ctabtn2.active} toLink={ctabtn2.toLink}>
                        
                            {ctabtn1.btnText}

                    </CTAButtons>
                </div>
            </div>

            {/* section-2 */}
            <div className="h-fit code-border flex py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
                <div className={`${backgroundGradient} absolute`}></div>
                <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                    <TypeAnimation
                    sequence={[codeblock,2000,""]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block",
                        }
                    }
                    omitDeletionAnimation={true}
                    ></TypeAnimation>
                </div>
            </div>


        </div>
    );
}
export default CodeBlocks;