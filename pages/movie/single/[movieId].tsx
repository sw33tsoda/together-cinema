import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MoviePoster from '../../../components/MoviePoster';
import Nav from '../../../components/Nav';

export default function movieOverview() : JSX.Element {
    const router = useRouter();
    const [data,setData] = useState({
        backdrop_path:'',
        original_title:'',
        overview:'',
        genres:[],
        spoken_languages:[],
        production_companies:[],
        vote_average:0,
        vote_count:0,
    });
    useEffect(() => {
        const api = async () => {
            await axios.get(`https://api.themoviedb.org/3/movie/${router.query.movieId}?api_key=acfc608a0a45e9649228005e83f3a421&language=en-US`).then((response) => {
                setData({...response.data});
            }).catch((error) => {
                console.log(error);
            });
        }
        api();
    });

    return (
        <div>
            <Nav/>
            <div className="movie-overview">
                <div className="movie-overview__backdrop" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`}}/>
                <div className="movie-overview__poster">
                    <MoviePoster data={data} isScreening={false}/>
                </div>
                <div className="movie-overview__title">
                    <h1>{data.original_title}</h1>
                </div>
                <div className="movie-overview__description">
                    <div className="movie-overview__description__score">
                        <h1>{data.vote_average}/10<sup>{data.vote_count} votes</sup></h1>
                    </div>
                    <div className="movie-overview__description__genres">
                        {data.genres.length > 0 && data.genres.map((genre,index) => <div className="movie-overview__description__genres__genre" key={index}><p>{genre.name}</p></div>)}
                    </div>
                    <div className="movie-overview__description__production-companies">
                        {data.production_companies.length > 0 && data.production_companies.map((company,index) => <div className="movie-overview__description__production-companies__company"><img src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}/></div>)}
                    </div>
                    <div className="movie-overview__description__spoken-languages">
                        {data.spoken_languages.length > 0 && data.spoken_languages.map((language,index) => <div className="movie-overview__description__spoken-languages__language" key={index}><p>{language.english_name}</p></div>)}
                    </div>
                    <p className="movie-overview__description__overview">{data.overview}</p>
                </div>
            </div>
        </div>
    );
}