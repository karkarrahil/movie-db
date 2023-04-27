import { Divider } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom';

type Props = {};

const Header = (props: Props) => {
    const AllMovieDetails = JSON.parse(localStorage.getItem('movies') || '[]');
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [hidden, setHidden] = useState(false)
    const SearchItems = AllMovieDetails.filter((items: any) => searchTerm && items.original_title.toLowerCase().startsWith(searchTerm))

 
    return (
        <>
            <div className='relative '>


                <div className='w-full fixed top-0 z-10 '>
                    <div className="search bg-[#ff4350] lg:relative lg:flex  py-5 gap-2 text-center  items-center font-bold text-lg">
                        <div className="inputSearch text-zinc-50 lg:flex flex justify-center gap-x-5 lg:ml-12 items-center">
                            <label htmlFor="search"> <FaSearch /></label>
                            <input type="text" className="inputSearchBar bg-[#ff4350] focus:outline-none text-zinc-50" value={searchTerm} onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setHidden(true)
                            }} id='search' placeholder='Search....' />
                        </div>
                    </div>
                </div>
                <div className={`searchItems z-10 absolute  left-3 rounded-lg  w-full  overflow-auto ${!SearchItems|| !hidden  ? 'hidden' : 'block '}`}>

                    {
                        SearchItems && (
                            SearchItems.map((items: any) => {
                                return (
                                    <Link to={`Movie/${items.id}`} onClick={() => {
                                        setHidden(false)
                                    
                                    }}>
                                        <div className='flex items-center  gap-x-12  bg-inherit text-black bg-slate-600'>
                                            <p className='text-3xl p-2 text-white '>{items.original_title}</p>
                                        </div>

                                    </Link>
                                )
                            })
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Header