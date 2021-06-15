import Moment from "react-moment";
import Link from 'next/link';
import classnames from 'classnames';

type MoviePosterProps = {
    data:any,
    isOverview:boolean,
}

export default function MoviePoster({data,isOverview} : MoviePosterProps) : JSX.Element {
    const isReleased:boolean = new Date(data.release_date).getTime() <= new Date().getTime() ? true : false;
    const handleClassNames = classnames("movie-poster",{
        "movie-poster--overview": isOverview == true,
    });

    return (
        <Link href={`/movie/${data.id}`}>
            <div className={handleClassNames}>
                <img className="movie-poster__image" src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.original_title} />
                <div className="movie-poster__overlay">
                    <div className="movie-poster__overlay__info">
                        <h1>{data.original_title}</h1>
                        <p>{isReleased ? "Đã phát hành" : "Chưa phát hành"}</p>
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