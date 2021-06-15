import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiKey } from '../../appconfig';
import Nav from '../../components/Nav';
import LocaleCode from 'locale-code';
import classnames from 'classnames';
import Select from '../../components/Form/Select';

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
    const [filter,setFilter] = useState({
        type:'movie',
        language:languages[0].value,
        page:1,
        include_adult:'false',
        year:years[0].value,
    });

    useEffect(() => {
        const getSearchResult = async () => {
            axios.get(`https://api.themoviedb.org/3/search/${filter.type}?api_key=${apiKey}&language=${filter.language}&query=${router.query.query}&page=${filter.page}&include_adult=${filter.include_adult}&year=${filter.year}`).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })
        }
        getSearchResult();
    },[router.query.query,filter]);

    const handleRadioClasses = (type:string) => classnames('radio__container__radio-button',{
        'radio__container__radio-button--active': type == filter.type
    });

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
                                        <div className={handleRadioClasses(type.slug)} onClick={() => setFilter({...filter,type:type.slug})}>
                                            <p>{type.name}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="search-result__wrapper__filter__group">
                            <p className="search-result__wrapper__filter__group__title">Ngôn ngữ</p>
                            <Select handleSetState={(value:string) => setFilter({...filter,language:value})} selected={filter.language} data={languages}/>
                        </div>
                        <div className="search-result__wrapper__filter__group">
                            <p className="search-result__wrapper__filter__group__title">Năm</p>
                            <Select handleSetState={(value:string) => setFilter({...filter,year:value})} selected={filter.year} data={years}/>
                        </div>
                    </div>

                    <div className="search-result__wrapper__results-list">
                        <h1>result</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}