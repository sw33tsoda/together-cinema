import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiKey } from '../../appconfig';
import Nav from '../../components/Nav';
import Moment from 'react-moment';
import MoviePoster from '../../components/MoviePoster';
import PageContent from '../../layouts/PageContent';
import ActorImage from '../../components/ActorImage';

// type PersonOverviewProps = {
//     personId:number,
// }

interface PersonOverviewObject {
    birthday?:(string | null),
    known_for_department?:string,
    deathday?:(null | string),
    id?:number,
    name?:string,
    also_known_as?:Array<string>,
    gender?:number,
    biography?:string,
    popularity?:number,
    place_of_birth?:(string | null),
    profile_path?:(string | null),
    adult?:boolean,
    imdb_id?:string,
    homepage?:(null | string),
}

interface PersonRelatedMoviesObject {
    character?:string,
    credit_id?:string,
    release_date?:string,
    vote_count?:number,
    video?:boolean,
    adult?:boolean,
    title?:string,
    genre_ids?:Array<number>,
    original_language?:string,
    original_title?:string,
    popularity?:number,
    id?:number,
    backdrop_path?:(string | null),
    overview?:string,
    poster_path?:(string | null),
}

export default function PersonOverview() : JSX.Element {
    const router = useRouter();
    const [data,setData] = useState<PersonOverviewObject>({
        name:'',
        also_known_as:[],
        biography:'',
    });

    const [relatedMovies,setRelatedMovies] = useState<Array<PersonRelatedMoviesObject>>([]);
    
    useEffect(() => {
        getPersonOverview();
        getRelatedMovies();
    },[router.query.personId]);

    const getPersonOverview = async () : Promise<void> => {
        if (router.query.personId) {
            await axios.get(`https://api.themoviedb.org/3/person/${router.query.personId}?api_key=${apiKey}&language=en-US`).then((response) => {
                setData({...response.data});
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    
    const getRelatedMovies = async () : Promise<void> => {
        await axios.get(`https://api.themoviedb.org/3/person/${router.query.personId}/movie_credits?api_key=${apiKey}&language=en-US`).then((response) => {
            if (response.data.cast.length > 0)
                setRelatedMovies([...response.data.cast]);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <Head>
                <title>{data.name}</title>
            </Head>
            <Nav/>
            <PageContent>
                <div className="person-overview">
                    <div className="person-overview__profile">
                        <ActorImage imageOnly={true} id={data.id} profile_path={data.profile_path} name={data.name}/>
                    </div>
                    <div className="person-overview__information">
                        <div className="person-overview__information__name">
                            <h1>{data.name}</h1>
                        </div>
                        <div className="person-overview__information__wrapper">
                            <div className="person-overview__information__wrapper__additional">
                                <h1>Ngày sinh</h1>
                                <p><Moment format="DD/MM/YYYY" date={data.birthday}></Moment></p>
                            </div>
                            <div className="person-overview__information__wrapper__additional">
                                <h1>Nơi sinh</h1>
                                <p>{data.place_of_birth}</p>
                            </div>
                            <div className="person-overview__information__wrapper__additional">
                                <h1>Nghề nghiệp</h1>
                                <p>{data.known_for_department}</p>
                            </div>
                        </div>
                        <div className="person-overview__information__wrapper">
                            <div className="person-overview__information__wrapper__additional">
                                <h1>Tiểu sử</h1>
                                <p>{data.biography.length > 0 ? data.biography + "." : "Không có."}</p>
                            </div>
                            <div className="person-overview__information__wrapper__additional">
                                <h1>Các tên gọi khác</h1>
                                <p>{data.also_known_as.length > 0 ? data.also_known_as.join(', ') + "." : "Không có."}</p>
                            </div>
                            <div className="person-overview__information__wrapper__additional">
                                <h1>Lượt thích</h1>
                                <p>{data.popularity}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="person-related-movies">
                    <div className="person-related-movies__title">
                        <h1>Phim đã tham gia</h1>
                    </div>
                    <div className="person-related-movies__list">
                        {relatedMovies.length > 0 ? (
                            relatedMovies.map((movie,index) => (
                                <div className="person-related-movies__list__movie">
                                    <div className="person-related-movies__list__movie__poster">
                                        <MoviePoster isOverview={false} data={movie} key={index}/>
                                    </div>
                                    <p className="person-related-movies__list__movie__cast">{movie.character}</p>
                                </div>
                            ))
                        ) : (
                            <p>Chưa tham gia phim nào.</p>
                        )}
                    </div>
            </div>
            </PageContent>
        </div>
    );
}