import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'

type Props = {
    movies: any,
    title: string
}

const TopRated = (props: Props) => {
    return (
        <div>
            <h1 className='lg:text-6xl text-xl text-white   tracking-wide lg:my-0  decoration-[#f35862] xs:mt-52 underline-offset-3 font-extralight'>{props.title}</h1>
            <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mt-24 text-white'>
                {
                    props.movies &&
                    props.movies.map((data: any, index: number) => {
                        return (
                            <Link to={`Movie/${data.id}`}>
                                <Card img={`https://image.tmdb.org/t/p/original${data.poster_path}`} title={data.title} language={data.original_language === 'en' ? 'english' : data.original_language} key={index} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TopRated