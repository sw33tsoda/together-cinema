
type ActorsSwiperItemProps = {
    profile_path:string,
    character:string,
    name:string,
}

export default function ActorsSwiperItem({profile_path,character,name}:ActorsSwiperItemProps) : JSX.Element {

    const handleOnError = (event:any) => {
        event.target.src="/assets/images/person.jpg";
        event.target.style.height="100%";
        event.target.style.objectFit="cover";
    }

    return (
        <div className="movie-actors__swiper__slide">
            <div className="movie-actors__swiper__slide__profile">
                <img className="movie-actors__swiper__slide__profile__image" src={`https://image.tmdb.org/t/p/w500/${profile_path}`} onError={handleOnError}/>
            </div>
            <p className="movie-actors__swiper__slide__character">{character}</p>
            <p className="movie-actors__swiper__slide__name">{name}</p>
        </div>
    );
}