import { Tag } from 'antd';
import React, { JSXElementConstructor, memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FetchData } from '../../store/movieSlice';
import { ApiDespatch } from '../../store/store';
import Card from './Card';
import './populer.css'
type Props = {

}

const Popular = (props: Props) => {
    const dispatch: ApiDespatch = useDispatch();
    const Movies = useSelector((state: any) => state.movieShow.movies);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(FetchData());
    }, []);
    return (
        <>
            <div className="containers">
                <Carousel autoPlay={true} showThumbs={false} infiniteLoop={true} showStatus={false} emulateTouch={true} className='-z-10'>

                    {
                        Movies && (
                            Movies.map((items: typeof Movies, index: any) => {
                                return (

                                    <Link to={`/Movie/${items.id}`} key={index}>

                                        <div className='relative max-h-[600px]' key={index}>
                                            <img src={`https://image.tmdb.org/t/p/original${items.backdrop_path}`} className='image brightness-100' />

                                            <div className=' absolute min-w-full bottom-12  left-3 hidden lg:block prose text-left  font-lighter text-white'>
                                                <h2 className='text-6xl font-extrabold text-white '>{items.title}</h2>
                                                <p className=' text-xl tracking-wide text-white w-[800px]'>{items.overview.slice(0, 350)}...</p>
                                            </div>
                                        </div>
                                    </Link>





                                )
                            })
                        )
                    }

                </Carousel>

                <div className="movieCard text-white mx-3">
                    <h1 className='lg:text-6xl text-xl  underline  decoration-[#f35862] underline-offset-3 font-extralight'>Popular</h1>
                    <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2'>

                        {
                            Movies && (
                                Movies.map((items: typeof Movies, index: number) => {
                                    return (
                                        <Link to={`Movie/${items.id}`} key={index}>

                                            <Card img={`https://image.tmdb.org/t/p/original${items.poster_path}`} title={items.title} language={items.original_language === 'en' ? 'english' : items.original_language} key={index} />
                                        </Link>
                                    )
                                })
                            )
                        }


                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Popular);