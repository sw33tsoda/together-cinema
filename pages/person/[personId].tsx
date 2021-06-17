import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiKey } from '../../appconfig';
import Nav from '../../components/Nav';
import Moment from 'react-moment';

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

export default function PersonOverview() : JSX.Element {
    const router = useRouter();
    const [data,setData] = useState<PersonOverviewObject>({
        name:'',
        also_known_as:[],
    });
    
    useEffect(() => {
        getPersonOverview();
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

    console.log(data);

    return (
        <div>
            <Head>
                <title>{data.name}</title>
            </Head>
            <Nav/>
            <div className="person-overview">
                <div className="person-overview__profile">
                    <img src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`} alt={data.name} />
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
                            <p>{data.biography}</p>
                        </div>
                        {data.also_known_as.length > 0 && (
                            <div className="person-overview__information__wrapper__additional">
                                <h1>Các tên gọi khác</h1>
                                <p>{data.also_known_as.join(', ')}.</p>
                            </div>
                        )}
                        <div className="person-overview__information__wrapper__additional">
                            <h1>Lượt thích</h1>
                            <p>{data.popularity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}