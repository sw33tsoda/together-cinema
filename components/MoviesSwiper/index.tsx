import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, {
    Autoplay,
  Pagination
} from 'swiper/core';
import { NowPlayingMoviesObject } from "../NowPlayingMoviesSwiper";
SwiperCore.use([Autoplay,Pagination]);
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setToggleVideoPlayer } from "../../redux/slices/videoPlayerSlice";
import axios from "axios";
import { apiKey } from "../../appconfig";

type MoviesSwiperProps = {
    data:Array<
        NowPlayingMoviesObject
    >,
}

export default function MoviesSwiper({data}:MoviesSwiperProps) : JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const handleViewVideo = async (id:string | number) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`);
            const data = await response.data;
            dispatch(setToggleVideoPlayer(data.results));
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    };

    return (
        <div className="movies-swiper">
            <Swiper pagination={{"dynamicBullets": true}} autoplay={{delay:2500}} className="movies-swiper">
                {data.map.length > 0 && data.map((movie,index) => (
                    <SwiperSlide key={index}>
                        <div className="movies-swiper__item" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}>
                            <Link href={`/movie/${movie.id}`}>
                                <div className="movies-swiper__item__poster">
                                        <img className="movies-swiper__item__poster__image" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
                                </div>
                            </Link>
                            <div className="movies-swiper__item__overview">
                                <div className="movies-swiper__overview-wrapper">
                                    <h1 className="movies-swiper__item__overview__title">{movie.original_title}</h1>
                                    <p className="movies-swiper__item__overview__overview">{movie.overview}</p>
                                </div>
                                <div className="movies-swiper__button" onClick={() => handleViewVideo(movie.id)}>
                                    <p>Trailer</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}