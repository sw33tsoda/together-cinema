import axios from "axios";
import React, { useEffect, useState } from "react";
import MoviePoster from "../MoviePoster";
import { apiKey } from "../../appconfig";

type MoviesListProps = {
    maxItem:number,
    status:string,
}

export default function MoviesList({maxItem,status}:MoviesListProps) : JSX.Element {
    const [page,setPage] = useState(1);
    const [data,setData] = useState([]);
    useEffect(() => {
        const api = async () => {
            await axios.get(`https://api.themoviedb.org/3/movie/${status}?api_key=${apiKey}&language=en-US&page=${page}`).then((response) => {
                if (response.data.results)
                    setData([...response.data.results.slice(0,maxItem)]);
            }).catch((error) => {   
                console.log(error);
            })
        }
        api();
    },[page]);
    return (
        <React.Fragment>
            <div className="movies-list">
                {data.length > 0 && data.map((movie,index) => <MoviePoster key={index} data={movie} isOverview={false}/>)}
            </div>
        </React.Fragment>
    );
}