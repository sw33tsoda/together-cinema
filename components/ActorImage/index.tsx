import Link from 'next/link';
import React from 'react';
type ActorImageProps = {
    profile_path?:string,
    character?:string,
    name?:string,
    id?:(number | string),
    imageOnly?:boolean,
}

export default function ActorImage({profile_path,character,name,id,imageOnly}:ActorImageProps) : JSX.Element {

    const handleOnError = (event:any) => {
        event.target.src="/assets/images/person.jpg";
        event.target.style.height="100%";
        event.target.style.objectFit="cover";
    }

    return (
        <Link href={`/person/${id}`}>
            <div className="movie-actors__swiper__slide">
                <div className="movie-actors__swiper__slide__profile">
                    <img className="movie-actors__swiper__slide__profile__image" src={`https://image.tmdb.org/t/p/w500/${profile_path}`} onError={handleOnError}/>
                </div>
                {imageOnly || (
                    <React.Fragment>
                        <p className="movie-actors__swiper__slide__character">{character}</p>
                        <p className="movie-actors__swiper__slide__name">{name}</p>
                    </React.Fragment>
                )}
            </div>
        </Link>
    );
}