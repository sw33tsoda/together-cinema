import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import SwiperCore, { Pagination,Navigation } from 'swiper/core';
SwiperCore.use([Pagination,Navigation]);
import ActorImage from './../ActorImage';

type ActorsSwiperProps = {
    data:Array<ActorsListObject>,
}

interface ActorsListObject {
    id:(number | string),
    profile_path:string,
    character:string,
    name:string,
}

export default function ActorsSwiper({data}:ActorsSwiperProps) {

    return (
        <div className="movie-actors">
            <h1 className="movie-actors__title">Diễn viên</h1>
            <div className="movie-actors__swiper">
                <Swiper slidesPerView={6} spaceBetween={5} slidesPerGroup={3} loopFillGroupWithBlank={true} pagination={{"clickable": true,"renderBullet":() => ""}} navigation={true} className="actors-slider">
                    {data.length > 0 && data.map((actor,index) => (
                        <SwiperSlide key={index}>
                            <ActorImage imageOnly={false} id={actor.id} profile_path={actor.profile_path} name={actor.name} character={actor.character}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}