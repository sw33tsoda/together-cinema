import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { apiKey } from '../../appconfig';
import Nav from '../../components/Nav';
import LocaleCode from 'locale-code';
import classnames from 'classnames';
import Select from '../../components/Form/Select';
import Link from 'next/link';
import Moment from 'react-moment';

const languages = LocaleCode.getLanguages(['en-US','de-DE','fr-FR','pt-PT','es-ES','ja-JP','zh-CN','ko-KR','vi-VN']).map((language) => ({label:language.name,value:language.code}));
const years = Array.from({length:new Date().getFullYear() - 1900}).map((year:number,index:number) => {
    const value = (1900 + (index + 1)).toString();
    return {label:value,value:value};
}).reverse();

languages.unshift({label:"Bất kỳ",value:""});
years.unshift({label:"Bất kỳ",value:""});

const types  = [
    {name:'Phim',slug:'movie'},
    {name:'Diễn viên',slug:'person'},
    {name:'Hãng',slug:'company'}
];

export default function SearchResult() {
    const router = useRouter();
    const [result,setResult] = useState([]);
    const [filter,setFilter] = useState({
        type:'movie',
        language:languages[0].value,
        include_adult:'false',
        year:years[0].value,
    });
    const [pagination,setPagination] = useState({
        page:1,
        total_pages:0,
        total_results:0,
    });

    console.log(pagination);

    useEffect(() => {
        getSearchResult('first-load');
    },[router.query.query,filter]);
    
    const getSearchResult = async (action:string) => {
        await axios.get(`https://api.themoviedb.org/3/search/${filter.type}?api_key=${apiKey}&language=${filter.language}&query=${router.query.query}&page=${action == 'load-more' ? pagination.page + 1 : pagination.page}&include_adult=${filter.include_adult}&year=${filter.year}`).then((response) => {
            const { results, page, total_pages, total_results } = response.data;
            setPagination({page,total_pages,total_results});
            if (action == 'first-load') {
                setResult([...results]);
                // setPagination({...pagination,page:1});
            };
            if (action == 'load-more') setResult([...result,...results]);
        }).catch((error) => {
            console.log(error);
        })
    }
    
    const handleLoadMore = () => {
        getSearchResult('load-more');
    }

    const handleRadioClasses = (type:string) => classnames('radio__container__radio-button',{
        'radio__container__radio-button--active': type == filter.type
    });

    const handleSetFilter = (filterType:string,value:string) => {
        const newFilter = filter;
        filter[filterType] = value;
        setPagination({...pagination,page:1});
        setFilter({...newFilter});
    }

    return (
        <div>
            <Head>
                <title>Kết quả tìm kiếm</title>
            </Head>
            <Nav/>

            <div className="search-result">
                <div className="search-result__keywords">
                    <h1>Tìm kiếm</h1>
                    <p>{router.query.query}</p>
                </div>
                <div className="search-result__wrapper">
                    <div className="search-result__wrapper__filter">
                        <div className="search-result__wrapper__filter__group">
                            <p className="search-result__wrapper__filter__group__title">Tôi muốn tìm</p>
                            <div className="radio">
                                {types.map((type,index) => (
                                    <label className="radio__container" key={index}>
                                        <div className={handleRadioClasses(type.slug)} onClick={() => handleSetFilter('type',type.slug)}>
                                            <p>{type.name}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="search-result__wrapper__filter__group">
                            <p className="search-result__wrapper__filter__group__title">Ngôn ngữ</p>
                            <Select handleSetState={(value:string) => handleSetFilter('language',value)} selected={filter.language} data={languages}/>
                        </div>
                        <div className="search-result__wrapper__filter__group">
                            <p className="search-result__wrapper__filter__group__title">Năm</p>
                            <Select handleSetState={(value:string) => handleSetFilter('year',value)} selected={filter.year} data={years}/>
                        </div>
                    </div>

                    <div className="search-result__wrapper__results-list">
                        <h1 className="search-result__wrapper__results-list__title">Kết quả ({result.length})</h1>
                        <div className="search-result__wrapper__results-list__list">
                            {(filter.type == "movie" && result.length > 0) && result.map((result,index) => (
                                <Link href={`/movie/${result.id}`} key={index}>
                                    <div className="result">
                                        <div className="result__title">
                                            <h1>{result.original_title} (<Moment format="YYYY" date={result.release_date}></Moment>)</h1>
                                        </div>
                                        <div className="result__overview">
                                            {result.overview && result.overview.length > 0 ? (
                                                <p>{result.overview.slice(0,300)}{result.overview.length > 300 && "..."}</p>
                                            ) : (
                                                <p>Không có mô tả.</p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {(filter.type == "person" && result.length > 0) && result.map((result,index) => (
                                <Link href={`/person/${result.id}`} key={index}>
                                    <div className="result">
                                        <div className="result__title">
                                            <h1>{result.name}</h1>
                                        </div>
                                        <div className="result__overview">
                                            {result.known_for && result.known_for.length && result.known_for.every(ele => ele.original_name == undefined) > 0 ? (
                                                <p>Được biết đến qua {result.known_for.map((movie,index) => movie.original_title !== undefined && `${movie.original_title}${(index !== result.known_for.length - 1) ? ", " : "."}`)}</p>
                                            ) : (
                                                <p>Không xác định.</p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))} 

                            {(filter.type == "company" && result.length > 0) && result.map((result,index) => (
                                <Link href={`/company/${result.id}`} key={index}>
                                    <div className="result">
                                        <div className="result__title">
                                            <h1>{result.name}</h1>

                                        </div>
                                        <div className="result__overview">
                                            {result.origin_country && result.origin_country.length > 0 ? (
                                                <p>{LocaleCode.getCountryName(`en-${result.origin_country}`)}</p>
                                            ) : (
                                                <p>Không xác định.</p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))} 
                        </div>
                        {pagination.page < pagination.total_pages && <div className="search-result__wrapper__results-list__load-more" onClick={handleLoadMore}>
                            <p>Tải thêm kết quả</p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}