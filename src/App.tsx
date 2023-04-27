import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SideBar from './components/SideBar'
import { FaBars, FaRegWindowClose } from "react-icons/fa";
import { Router, Route, Routes } from 'react-router-dom';
import Movie from './components/MovieSections/Movie';
import Header from './components/Header';
import { json } from 'stream/consumers';
import TopRated from './components/MovieSections/AllType';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './components/MainPageMovie/MainPage';
import { addALlMovie } from './store/MovieDetail';
const App = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [lgOpen, setLgOpen] = useState<boolean>(true)
  const [Movies, SetMovies] = useState([])
  const dispatch = useDispatch()
  const { category } = useSelector((state: any) => state.MovieDetail);
  const { movies } = useSelector((state: any) => state.MovieDetail);


  useEffect(() => {
    const FetchData = async (category: string) => {
      fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=a5e3fd8bd7af6129a6330cb9bbe83786&language=en-US&page=1`).then((response) => response.json()).then((data) => {
        SetMovies(data.results);
        localStorage.setItem('movies', JSON.stringify(data.results));
      })
    }


    FetchData(category)

  }, [category])
  useEffect(() => {
    dispatch(addALlMovie(Movies))
  }, [Movies])

  return (




    <div className="app lg:w-full lg:flex xs:block h-screen relative bg-[#222a31]">
      <button className=' bg-white z-30 absolute  top-2 lg:hidden p-3 text-black   rounded-full' onClick={() => setOpen(open ? false : true)} >
        {lgOpen ? <FaBars className='text-black' /> : <p className='lg:hidden'>X</p>}
      </button>


      <div className={`lg:w-[20%] 
            transition ease-in-out 
            ${!open ? ' translate-x-0 top-0 right-0' : '-translate-x-full'} lg:translate-x-0 ${lgOpen ? 'lg:block' : 'lg:hidden'}   z-10  text-slate-100 xs:fixed  duration-3000   xs:h-screen w-[50%] lg:relative fixed h-screen   bg-[#1a1c20] overflow-auto`}>
        <SideBar />
      </div>

      <div className="w-full  xs:h-screen overflow-auto  text-gray-500">
        <div className="main my-4 lg:my-0">
          <div className="header">

            <Header />
          </div>
          <div className="MainSection h-screen lg:mt-16 w-full">
            <Routes>
              <Route path='/moviemania-react18' element={<Movie />}>
              </Route>
              <Route path='/Movie/:id' element={<MainPage />}></Route>
              <Route path='/topRated' element={<TopRated movies={Movies} title={category} />}>

              </Route>
              <Route path='/topRated/Movie/:id' element={<MainPage />}></Route>
              <Route path='/comingSoon' element={<TopRated movies={Movies} title={category} />} />
              <Route path='/comingSoon/Movie/:id' element={<MainPage />}></Route>

            </Routes>

          </div>

        </div>
      </div>
    </div>


  )
}

export default App
