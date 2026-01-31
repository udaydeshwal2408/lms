/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

// Components
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'
import Course_Slider from '../components/core/Catalog/Course_Slider'

// Operations
import { fetchCourseCategories } from '../services/operations/courseDetailsAPI'
import { getCatalogPageData } from '../services/operations/pageAndComponentData'

// Icons & Motion
import { MdOutlineRateReview } from 'react-icons/md'
import { FaArrowRight } from "react-icons/fa"
import { motion } from 'framer-motion'
import { fadeIn } from './../components/common/motionFrameVarients';

// Background images
import backgroundImg1 from '../assets/Images/random bg img/coding bg1.jpg'
import backgroundImg2 from '../assets/Images/random bg img/coding bg2.jpg'
import backgroundImg3 from '../assets/Images/random bg img/coding bg3.jpg'
import backgroundImg4 from '../assets/Images/random bg img/coding bg4.jpg'
import backgroundImg5 from '../assets/Images/random bg img/coding bg5.jpg'
import backgroundImg6 from '../assets/Images/random bg img/coding bg6.jpeg'
import backgroundImg7 from '../assets/Images/random bg img/coding bg7.jpg'
import backgroundImg8 from '../assets/Images/random bg img/coding bg8.jpeg'
import backgroundImg9 from '../assets/Images/random bg img/coding bg9.jpg'
import backgroundImg10 from '../assets/Images/random bg img/coding bg10.jpg'
import backgroundImg111 from '../assets/Images/random bg img/coding bg11.jpg'

const randomImges = [
    backgroundImg1, backgroundImg2, backgroundImg3, backgroundImg4, 
    backgroundImg5, backgroundImg6, backgroundImg7, backgroundImg8, 
    backgroundImg9, backgroundImg10, backgroundImg111,
];

const Home = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [backgroundImg, setBackgroundImg] = useState(null);
    const [CatalogPageData, setCatalogPageData] = useState(null);

    useEffect(() => {
        const bg = randomImges[Math.floor(Math.random() * randomImges.length)]
        setBackgroundImg(bg);
    }, [])

    useEffect(() => {
        const fetchCatalogPageData = async () => {
            try {
                const categories = await fetchCourseCategories();
                const category_id = categories?.[0]?._id;
                if (category_id) {
                    const result = await getCatalogPageData(category_id, dispatch);
                    setCatalogPageData(result);
                }
            } catch (error) {
                console.log("CATALOG PAGE DATA ERROR....", error);
            }
        }
        fetchCatalogPageData();
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen bg-richblack-900">
            {/* Background Image Container */}
            <div className="absolute top-0 left-0 w-full h-[450px] md:h-[650px] opacity-[0.3] overflow-hidden pointer-events-none">
                <img src={backgroundImg} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute left-0 bottom-0 w-full h-[250px] opacity_layer_bg"></div>
            </div>

            <div className='relative flex-grow'>
                {/* Section 1: Hero */}
                <div className='relative h-[450px] md:h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white'>
                    <Link to={"/signup"}>
                        <div className='z-0 group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                                <p>Become an Instructor</p>
                                <FaArrowRight />
                            </div>
                        </div>
                    </Link>

                    <motion.div variants={fadeIn('left', 0.1)} initial='hidden' whileInView={'show'} className='text-center text-3xl lg:text-4xl font-semibold mt-7'>
                        Empower Your Future with <HighlightText text={"Coding Skills"} />
                    </motion.div>

                    <div className='flex flex-row gap-7 mt-8'>
                        <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
                    </div>
                </div>

                {/* Section 2: Main Content Blocks */}
                <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white'>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={<div className='text-3xl lg:text-4xl font-semibold'>Unlock Your <HighlightText text={"coding potential "} /> with our online courses</div>}
                        subheading={"Learn from industry experts with hands-on projects."}
                        ctabtn1={{
                            btnText: "try it yourself",
                            linkto: token ? "/catalog/web-development" : "/signup",
                            active: true,
                        }}
                        ctabtn2={{ btnText: "learn more", linkto: "/login", active: false }}
                        codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                        codeColor={"text-yellow-25"}
                        backgroundGradient={"code-block1-grad"}
                    />

                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={<div className="text-3xl lg:text-4xl font-semibold lg:w-[50%]">Start <HighlightText text={"coding in seconds"} /></div>}
                        subheading={"Write real code from your very first lesson."}
                        ctabtn1={{
                            btnText: "Continue Lesson",
                            linkto: token ? "/dashboard/enrolled-courses" : "/signup",
                            active: true,
                        }}
                        ctabtn2={{ btnText: "Learn More", linkto: "/signup", active: false }}
                        codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport { TypeAnimation } from "react-type";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        codeColor={"text-white"}
                        backgroundGradient={"code-block2-grad"}
                    />

                    {/* Course Sliders */}
                    <div className='mx-auto box-content w-full px-0 py-12'>
                        <h2 className='text-white mb-6 text-2xl font-semibold'>Popular Picks for You 🏆</h2>
                        <Course_Slider Courses={CatalogPageData?.selectedCategory?.courses} />
                    </div>
                    
                    <div className='mx-auto box-content w-full px-0 py-12'>
                        <h2 className='text-white mb-6 text-2xl font-semibold'>Top Enrollments Today 🔥</h2>
                        <Course_Slider Courses={CatalogPageData?.mostSellingCourses} />
                    </div>

                    {/* Explore More - Pulling the section up */}
                    <div className='relative w-full mt-[-20px] pb-32 lg:pb-48'>
                        <ExploreMore />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className='relative z-10'>
                <Footer />
            </div>
        </div>
    )
}

export default Home