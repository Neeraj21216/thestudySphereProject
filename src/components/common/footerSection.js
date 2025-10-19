import React from 'react'
import { FooterLink2 } from '../../data/footer-links';
import { Link } from 'react-router-dom';
// import logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaTwitter, FaGoogle, FaYoutube } from "react-icons/fa";

const FooterSection = () => {
  return (
    <div className='w-full flex flex-col gap-6 bg-richblack-800 py-10'>

        <div className='w-10/12 flex mx-auto px-5'>

            <div className='w-1/2 text-sm'>
                <div className='flex gap-16 '>

                    <div className='flex flex-col gap-3'>
                        <Link to={'/Home'}><img src={"https://thestudysphere.com/assets/img/logo.png"} width={200} height={200} alt='StudyNotion Logo'/></Link>
                        <h1 className='text-richblack-50 text-lg'>Company</h1>
                        <div className='text-richblack-400 flex flex-col gap-3'>
                            <p>About</p> 
                            <p>Careers</p>
                            <p>Affiliates</p>
                        </div>
                        <div className='text-richblack-400 text-lg flex gap-3'>
                            <Link><FaFacebook /></Link>
                            <Link><FaGoogle /></Link>
                            <Link><FaTwitter /></Link>
                            <Link><FaYoutube /></Link>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 text-richblack-400'>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-richblack-50 text-lg'>Resources</h1>
                            <p>Articles</p>
                            <p>Blog</p>
                            <p>Chart Sheet</p>
                            <p>Code Challenges</p>
                            <p>Docs</p>
                            <p>Projects</p>
                            <p>Videos</p>
                            <p>Workspaces</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-richblack-50 text-lg'>Support</h1>
                            <p>Help Center</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 text-richblack-400'>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-richblack-50 text-lg'>Plans</h1>
                            <p>Paid Memberships</p>
                            <p>For Students</p>
                            <p>Business Solutions</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-richblack-50 text-lg'>Communities</h1>
                            <p>Forums</p>
                            <p>Chapters</p>
                            <p>Events</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-1/2'>
                <div className='flex  px-5 gap-20  border-l border-richblack-700'>
                    {
                        FooterLink2.map((tit) => (
                            <div className='flex flex-col gap-3'>
                                <h1 className='text-lg font-medium text-richblack-50'>{tit.title}</h1>

                                {
                                    tit.links.map((category) => (
                                        <Link to={category.link}> <div className='text-sm text-richblack-400 hover:text-richblack-50 cursor-pointer'>{category.title}</div> </Link>
                                    ))
                                }

                            </div>
                        ))
                    }
                </div>
            </div>

        </div>

        
        {/*  Border */}
        <div className='h-[1px] w-10/12 bg-richblack-700 mx-auto'></div>

        <div className='flex w-10/12 mx-auto text-sm justify-between text-richblack-400 my-4'>

            <div className='flex justify-evenly gap-5'>
                <p>Privacy Policy</p>
                <div className='bg-richblack-700 w-[1px]'></div>
                <p>Cookie Policy</p>
                <div className='bg-richblack-700 w-[1px]'></div>
                <p>Terms</p>
            </div>

            <div>
                <p>Made with ❤️ Neeraj © 2025 StudySphere</p>
            </div>

        </div>

    </div>
  )
}

export default FooterSection;