import React from 'react'
import GetInTouchForm from '../components/core/Auth/GetInTouchForm';
import FooterSection from "../components/common/footerSection";



const Contact = () => {
  return (
    <div className=''>
        

        {/* section 1 */}
       <div className='w-10/12 my-20 mx-auto'>

            <div className='flex justify-center items-start gap-10'>

                <div className='w-[48%] text-richblack-300  bg-richblack-800 rounded-2xl flex flex-col gap-8 py-10 px-8'>

                    <div>
                        <div>
                            <h1 className='text-richblack-5 font-semibold text-lg'>Chat on us</h1>
                        </div>
                        <p className='text-richblack-300 font-semibold'>Our friendly team is here to help.</p>
                        <p className='text-richblack-300 font-semibold'>info@studynotion.com</p>
                    </div>

                    <div>
                        <div>
                            <h1 className='text-richblack-5 font-semibold text-lg'>Visit us</h1>
                        </div>
                        <p className='text-richblack-300 font-semibold'>Come and say hello at our office HQ.</p>
                        <p className='text-richblack-300 font-semibold'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                    </div>

                    <div>
                        <div>
                            <h1 className='text-richblack-5 font-semibold text-lg'>Call us</h1>
                        </div>
                        <p className='text-richblack-300 font-semibold'>Mon - Fri From 8am to 5pm</p>
                        <p className='text-richblack-300 font-semibold'>+123 456 7869</p>
                    </div>

                </div>

                <div className='p-14 border rounded-2xl border-richblack-700'>

                    <GetInTouchForm heading={"Got a Idea? We've got the skills. Let's team up"} subHeading={"Tell us more about yourself and what you're got in mind."} width={"45%"} />

                </div>

            </div>          
       </div>


       {/* reviews */}



       {/* Footer */}
       <FooterSection />


    </div>
  )
}

export default Contact;