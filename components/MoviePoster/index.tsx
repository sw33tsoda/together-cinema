import Moment from "react-moment";
import Link from 'next/link';

export default function MoviePoster({data,isScreening}) : JSX.Element {
    return (
        <Link href={`/movie/single/${data.id}`}>
            <div className="movie-poster">
                <img className="movie-poster__image" src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.original_title} />
                <div className="movie-poster__overlay">
                    <div className="movie-poster__overlay__info">
                        <h1>{data.original_title}</h1>
                        <p>{isScreening ? "Đang chiếu" : "Sắp chiếu"}</p>
                        <p><Moment format="DD/MM/YYYY">{data.release_date}</Moment></p>
                    </div>
                    <div className="movie-poster__overlay__button-wrapper">
                        <div className="movie-poster__overlay__button-wrapper__button">
                            <i className="fas fa-ticket-alt"></i>
                        </div>
                        <div className="movie-poster__overlay__button-wrapper__button">
                            <i className="fas fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}