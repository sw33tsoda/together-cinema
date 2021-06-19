import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, {
  Pagination
} from 'swiper/core';
import { NowPlayingMoviesObject } from "../NowPlayingMovies";
SwiperCore.use([Pagination]);
import MoviePoster from '../MoviePoster';

type MoviesSwiperProps = {
    data:Array<
        NowPlayingMoviesObject
    >,
}

export default function MoviesSwiper({data}:MoviesSwiperProps) : JSX.Element {
    return (
        <div className="movies-swiper">
            <Swiper pagination={{"dynamicBullets": true}} className="movies-swiper">
                {data.map.length > 0 && data.map((movie,index) => (
                    <SwiperSlide key={index}>
                        <div className="movies-swiper__item" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}>
                            <div className="movies-swiper__item__poster">
                                <img className="movies-swiper__item__poster__image" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
                            </div>
                            <div className="movies-swiper__item__overview">
                                <h1 className="movies-swiper__item__overview__title">{movie.original_title}</h1>
                                <p className="movies-swiper__item__overview__overview">{movie.overview}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}