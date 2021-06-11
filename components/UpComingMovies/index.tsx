import axios from "axios";
import { useEffect, useState } from "react";
import MoviePoster from "../MoviePoster";

export default function UpComingMovies({maxItem}) : JSX.Element {
    const [page,setPage] = useState(1);
    const [data,setData] = useState([]);
    useEffect(() => {
        const api = async () => {
            await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=acfc608a0a45e9649228005e83f3a421&language=en-US&page=${page}`).then((response) => {
                setData([...response.data.results.slice(0,maxItem)]);
            }).catch((error) => {   
                console.log(error);
            })
        }
        api();
    },[page]);
    return (
        <div className="movies-list">
            {data.length > 0 && data.map((movie,index) => <MoviePoster key={index} isScreening={false} data={movie}/>)}
        </div>
    );
}