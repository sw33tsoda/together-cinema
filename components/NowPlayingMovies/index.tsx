import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiKey } from "../../appconfig";
import MoviesSwiper from "../MoviesSwiper";

export interface NowPlayingMoviesObject {
    adult?:boolean,
    backdrop_path?:(string | null),
    overview?:string,
    release_date?:string,
    genre_ids?:Array<number>,
    id?:number,
    original_title?:string,
    original_language?:string,
    title?:string,
    poster_path?:(string | null),
    popularity?:number,
    vote_count?:number,
    video?:boolean,
    vote_average?:number,
}

export default function NowPlayingMovies() : JSX.Element {
    const [data,setData] = useState<Array<NowPlayingMoviesObject>>([]);
    useEffect(() => {
        getNowPlayingMovies();
    },[]);
    
    const getNowPlayingMovies = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`).then((response) => {
            setData([...response.data.results.slice(0,10)])
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <React.Fragment>
            <div className="now-playing-movies">
                <MoviesSwiper data={data}/>
            </div>
        </React.Fragment>
    );
}