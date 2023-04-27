import React, { useEffect } from 'react'
import AOS from "aos"
import 'aos/dist/aos.css';
import { motion, useAnimation } from 'framer-motion'
type Props = {
    img: string,
    title: string,
    language: string
}

const Card = (props: Props) => {
    const control = useAnimation()
    // const [ref, inView] = useInView()
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false
        });

    }, [])

    const textaAnimate = {
        offscreen: { x: -100, opacity: 0 },
        onscreen: { x: 0, opacity: 1 },
    
    }
    return (
        <>

            <motion.div className="card lg:w-60 mx-2 my-2   cursor-pointer rounded-md" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{}} viewport={{ once: false }}>
                <div className="image " >
                    <img src={props.img} alt="" className=' duration-100 rounded-md hover:skew-y-6' />
                </div>
                <div className="text relative bottom-6 text-center ">
                    <motion.h1 variants={textaAnimate} className='lg:text-2xl text-left space-x-1'>{props.title}</motion.h1>
                    <motion.p variants={textaAnimate} className='text-gray-300 lg:text-lg text-sm text-left'>{props.language}</motion.p>
                </div>
            </motion.div>
        </>

    )
}

export default Card