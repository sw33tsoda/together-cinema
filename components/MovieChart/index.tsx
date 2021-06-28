import axios from "axios";
import { useEffect, useState } from "react";
import { apiKey } from "../../appconfig";
import MoviePoster from "../MoviePoster";

export default function MovieChart() {
    const [data,setData] = useState([]);

    useEffect(() => {
        getNowPlayingMovies();
    },[]);
    
    const getNowPlayingMovies = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`).then((response) => {
            setData([...response.data.results.slice(0,10)])
        }).catch((error) => {
            console.log(error);
        })
    }

    console.log(data);

    return (
        <div className="movie-chart">
            <div className="movie-chart__top-three">
                {data.length > 0 && data.slice(0,3).map((movie,index) => (
                    <div className="movie-chart__top-item" key={index}>
                        <div className="movie-chart__top-item-poster">
                            <MoviePoster isOverview={true} data={movie}/>
                            <div className="movie-chart__chart-position">
                                {index+1}
                            </div>
                        </div>
                        <div className="movie-chart__top-item-stats">
                            <p>{movie.original_title}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="movie-chart__the-rest">

            </div>
        </div>
    );
}