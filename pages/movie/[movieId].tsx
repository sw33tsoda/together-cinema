import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import SwiperCore, { Pagination,Navigation } from 'swiper/core';
import Moment from 'react-moment';
import MoviePoster from '../../components/MoviePoster';
import MovieReview from '../../components/MovieReview';
import Nav from '../../components/Nav';
import { apiKey } from '../../appconfig';
import Link from 'next/link';
import PageContent from '../../layouts/PageContent';
SwiperCore.use([Pagination,Navigation]);

export default function MovieOverview() : JSX.Element {
    const router = useRouter();
    const [data,setData] = useState({
        backdrop_path:'',
        poster_path:'',
        original_title:'',
        overview:'',
        genres:[],
        spoken_languages:[],
        production_companies:[],
        vote_average:0,
        vote_count:0,
        release_date:'',
    });
    const [cast,setCast] = useState([]);
    const [reviews,setReviews] = useState([]);
    const [similiarMovies,setSimiliarMovies] = useState([]);
    useEffect(() => {
        if (router.query.movieId !== undefined) {
            getMovieOverview();
            getMovieCast();
            getMovieReviews();
            getSimiliarMovies();
            // getMovieImages();
        }
    },[router.query.movieId]);

    const getMovieOverview = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/${router.query.movieId}?api_key=${apiKey}&language=en-US`).then((response) => {
            setData({...response.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    const getMovieCast = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/${router.query.movieId}/credits?api_key=${apiKey}&language=en-US`).then((response) => {
            setCast([...response.data.cast]);
        }).catch((error) => {
            console.log(error);
        });
    }

    const getMovieReviews = async () => {
        await axios.get(` https://api.themoviedb.org/3/movie/${router.query.movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`).then((response) => {
            setReviews(response.data.results.length >= 5 ? [...response.data.results.slice(0,5)] : [...response.data.results]);
        }).catch((error) => {
            console.log(error);
        });
    }

    const getSimiliarMovies = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/${router.query.movieId}/similar?api_key=${apiKey}&language=en-US&page=1
        `).then((response) => {
            setSimiliarMovies(response.data.results.length >= 9 ? [...response.data.results.slice(0,9)] : [...response.data.results]);
        }).catch((error) => {
            console.log(error);
        });
    }

    const getMovieImages = async () => {
        await axios.get(` https://api.themoviedb.org/3/movie/${router.query.movieId}/images?api_key=${apiKey}&language=en-US
        `).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <div>
            <Head>
                <title>{data.original_title}</title>
            </Head>
            <Nav/>
            <PageContent>
                <div className="movie-overview">
                    <div className="movie-overview__backdrop" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`}}/>
                    <div className="movie-overview__poster">
                        <img className="movie-overview__poster__image" src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.original_title} />
                    </div>
                    <div className="movie-overview__title">
                        <h1>{data.original_title}</h1>
                        <div className="movie-overview__title__spoken-languages">
                            {data.spoken_languages.length > 0 && data.spoken_languages.map((language,index) => <div className="movie-overview__title__spoken-languages__language" key={index}><p>{language.english_name}</p></div>)}
                        </div>
                        <div className="movie-overview__title__spoken-languages">
                            <div className="movie-overview__title__spoken-languages__language"><p><Moment format="DD-MM-YYYY" date={data.release_date}></Moment></p></div>
                        </div>
                    </div>
                    <div className="movie-overview__description">
                        <div className="movie-overview__description__score">
                            <h1>{data.vote_average}/10<span>{data.vote_count} votes</span></h1>
                        </div>
                        <div className="movie-overview__description__genres">
                            {data.genres.length > 0 && data.genres.map((genre,index) => <div className="movie-overview__description__genres__genre" key={index}><p>{genre.name}</p></div>)}
                        </div>
                        <div className="movie-overview__description__production-companies">
                            {data.production_companies.length > 0 && data.production_companies.map((company,index) => <div className="movie-overview__description__production-companies__company" key={index}><img src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}/></div>)}
                        </div>
                        <p className="movie-overview__description__overview">{data.overview}</p>
                    </div>
                </div>

                <div className="movie-actors">
                    <h1 className="movie-actors__title">Diễn viên</h1>
                    <div className="movie-actors__slider">
                        <Swiper slidesPerView={6} spaceBetween={5} slidesPerGroup={3} loopFillGroupWithBlank={true} pagination={{"clickable": true,"renderBullet":() => ""}} navigation={true} className="actors-slider">
                            {cast.length > 0 && cast.map((actor,index) => (
                                <SwiperSlide key={index}>
                                    <Link href={`/person/${actor.id}`}>
                                        <div className="movie-actors__slider__slide">
                                            <div className="movie-actors__slider__slide__profile">
                                                <img className="movie-actors__slider__slide__profile__image" src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}/>
                                            </div>
                                            <p className="movie-actors__slider__slide__character">{actor.character}</p>
                                            <p className="movie-actors__slider__slide__name">{actor.name}</p>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div className="split-wrapper">
                    <div className="movie-reviews">
                        <h1 className="movie-reviews__title">Đánh giá</h1>
                        {reviews.length > 0 ? (
                            <div className="movie-reviews__list">
                                {reviews.length > 0 && reviews.map((review,index) => <MovieReview data={review} key={index}/>)}
                            </div>
                        ) : (
                            <div className="movie-reviews__empty">
                                <h1>Không có đánh giá</h1>
                            </div>
                        )}
                    </div>
                    <div className="movie-similar">
                        <h1 className="movie-similiar__title">Cùng thể loại</h1>
                        {similiarMovies.length > 0 ? (
                            <div className="movie-similiar__list">
                                {similiarMovies.length > 0 && similiarMovies.map((movie,index) => <MoviePoster isOverview={false} data={movie} key={index}/>)}
                            </div>
                        ) : (
                            <div className="movie-similiar__empty">
                                <h1>Không có phim tương tự</h1>
                            </div>
                        )}
                    </div>
                </div>
            </PageContent>
        </div>
    );
}