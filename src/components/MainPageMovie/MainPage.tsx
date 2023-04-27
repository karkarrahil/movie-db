import { Descriptions, Divider, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'
import { MdReviews } from 'react-icons/md'
import './Mainpage.css'
type Props = {

}

const MainPage = (props: Props) => {
  const AllMovieDetails = JSON.parse(localStorage.getItem('movies') || '[]')
  const [MovieDetail, setMoviedetails] = useState<any>([]);
  const [review, setReview] = useState<any>([])
  const params = useParams();
  const { movies } = useSelector((state: any) => state.MovieDetail);
  // const allMovies = useSelector((state: any) => state.movieDetail);
  const { id }: any = params;
  // console.log(id); 

  let MainMovie = AllMovieDetails.find((item: any) => item.id === parseInt(id))
  useEffect(() => {
    const fetchALlDetails = (id: string) => {
      fetch(`https://api.themoviedb.org/3/movie/${MainMovie.id}?api_key=a5e3fd8bd7af6129a6330cb9bbe83786&language=en-US`)
        .then((response) => response.json())
        .then(data => {
          // console.log(data);
          setMoviedetails(data);
        })
    }
    const reviewFetch = async (id: string) => {
      let getData = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=a5e3fd8bd7af6129a6330cb9bbe83786&language=en-US&page=1`);
      let response = await getData.json();
      // console.log(response);
      return setReview(response.results);
    }
    fetchALlDetails(id);
    reviewFetch(id);
  }, [])

  return (
    <div className='text-white h-screen lg:my-0 mt-14 bg-fixed' style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${MainMovie.backdrop_path}')`, backgroundSize: 'cover', }}>
      <motion.div className='opacity-100  backdrop-blur-sm backdrop-opacity-80 bg-white/30  h-screen overflow-auto   lg:overflow-hidden' initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 2 }} viewport={{ once: false }}>
        <div className="header lg:m-3 ">
          <article className='lg:prose-xl  prose-invert justify-center  flex lg:flex-row  flex-col  gap-x-2 '>
            <div className="title lg:w-[70%] p-3  rounded-lg   shadow-slate-400 ">
              <div className='backdrop-sepia-0 bg-white/20 p-3 rounded-xl'>
                <h1 className='font-extrabold text-slate-600'>{MainMovie.title}</h1>
                {
                  MovieDetail.genres && (
                    MovieDetail.genres.map((genres: any, index: number) => {
                      return (
                        <Tag color={''} className=' text-lg rounded-lg font-semibold  text-red-400 bg-inherit' key={index}>#{genres.name}</Tag>
                      )
                    })
                  )
                }

                <div className='text-slate-700  font-bold gap-x-4  flex lg:gap-x-52'>
                  <p>language: {
                    MovieDetail.original_language == 'en' ? "english" : MovieDetail.original_language
                  }</p>
                  <p>Release date:<br /> {moment(MovieDetail.release_date).format("MMMM ,Do YYYY")}</p>
                  <p>review:{MovieDetail.vote_average}⭐</p>
                </div>
                <div className="description text-slate-600 text-ellipsis text-justify">
                  {MovieDetail.overview}
                </div>
              </div>


              {/* review section  */}


              <div className="reviewSection backdrop-sepia-0  bg-white/20 lg:my-2 p-2 lg:p-3 rounded-lg h-[70vh] overflow-auto custom-scroll">
                <div className="re-header ">
                  <h1 className='text-slate-600 font-extrabold flex items-center gap-x-2'>Review<MdReviews /></h1>

                </div>
                <div className="mainReview text-slate-600">
                  {
                    review.length == 0 && (
                      <p key={1}>no data available</p>
                    )
                  }
                  {
                    review.length > 0 && (
                      review.map((review: any, index: number) => {
                        let url = review.author_details.avatar_path;

                        return (

                          <div key={index}>
                            <div className='lg:flex my-2 gap-x-4 justify-center'>
                              <div className="img ">
                                <img src={`${url == null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA0HRYZEwdjf0wBlev2e3xodcenkQydCv6tg&usqp=CAU' : `https://image.tmdb.org/t/p/original${url}`}`} alt='err' onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = `${url.slice(1, url.length)}`;
                                }} className='inline-block h-12 w-12 rounded-full ring-2 ring-slate-600' />
                              </div>
                              <div className="text w-full relative lg:bottom-6 ">
                                <h2 className='text-slate-700 '>{review.author_details.username}</h2>
                                <button className='px-2 rounded-lg text-slate-800 bg-red-400'><a href={`${review.url}`}>Link</a></button> <br />
                                <p className='text-center'>Rating: {review.author_details.rating} ❤️‍🔥</p>
                                {review.content}
                              </div>
                            </div>
                            <Divider className='border-1 border-slate-500' />
                          </div>

                        )
                      })
                    )
                  }
                </div>

              </div>
            </div>


            {/* image and Link section  */}
            <div className="description lg:w-[30%] rounded-lg img backdrop-sepia-0 bg-white/30 ">
              <div className="link  mt-2 text-center">
                <h1 className='font-extrabold text-slate-600'>Links:</h1>
                <button className='px-5 py-2 rounded-full bg-indigo-500 m-3'><a href={`${MovieDetail.homepage}`} target='_blank'>Link</a></button>
              </div>
              <div className="img flex flex-col justify-center items-center p-2 rounded-lg">
                <img src={`https://image.tmdb.org/t/p/original${MainMovie?.poster_path}`} alt="#" className='h-min rounded-lg h-[600px] w-[400px]' />
              </div>
            </div>
          </article>
        </div>
      </motion.div>
    </div>
  )
}

export default MainPage