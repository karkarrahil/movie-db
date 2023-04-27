import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineChartBar } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../store/MovieDetail'
type Props = {}

const SideBar = (props: Props) => {
    const { category } = useSelector((state: any) => state.MovieDetail);
    const despatch = useDispatch()
    return (
        <>
            <div className="Nav-list w-full">
                <div className="top">
                    <div className="logo bg-[#f83744] lg:relative flex  py-5 gap-2 text-center justify-center items-center font-bold text-lg">
                        <HiOutlineChartBar />
                        <h2 className='text-center'>Media App</h2>
                    </div>
                    <ul className='list-none mt-32 flex flex-col gap-y-3 text-justify w-full  py-2  placeholder:'>
                        <Link className='pl-12 hover:bg-[#25282f]' to={'/'} onClick={() => despatch(changeCategory('popular'))}> <li className='hover:bg-[#25282f] py-4'>Populer</li></Link>
                        <Link className='pl-12 hover:bg-[#25282f]' to={'/topRated'} onClick={() => despatch(changeCategory('top_rated'))}><li className='hover:bg-[#25282f] py-4'>Top Rated</li></Link>
                        <Link className='pl-12 hover:bg-[#25282f]' to={'/comingSoon'} onClick={() => despatch(changeCategory('upcoming'))}><li className='hover:bg-[#25282f] py-4'>upcoming</li></Link>
                        <Link className='pl-12 hover:bg-[#25282f]' to={'/watchLater'}><li className='hover:bg-[#25282f] py-4'>watch later</li></Link>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideBar