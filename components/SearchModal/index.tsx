import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import classnames from 'classnames';
import InputText from "../Form/InputText";
import { setToggleSearchModel } from "../../redux/slices/searchSlice";
import { useRouter } from "next/router";

export default function SearchModal() {
    const router = useRouter();
    const search = useSelector((state:RootState) => state.search);
    const dispatch:AppDispatch = useDispatch();
    const [searchInput,setSearchInput] = useState('');

    const handleSearchClassName = classnames('search-modal',{
        'search-modal--toggle-on': search.toggle,
    });

    const handleSubmitSearch = () => {
        router.push(`/search/${searchInput}`);
        dispatch(setToggleSearchModel('off'));
    }

    return (
        <div className={handleSearchClassName}>
            <div className="search-modal__wrapper">
                <div className="search-modal__wrapper__search-form">
                    <div className="search-modal__wrapper__search-form__input">
                        <InputText label="Từ khóa" input={searchInput} keyDownEvent={handleSubmitSearch} setInput={(value:string) => setSearchInput(value)}/>
                    </div>
                    <div className="search-modal__wrapper__search-form__button" onClick={handleSubmitSearch}>
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="search-modal__wrapper__search-form__button" onClick={() => dispatch(setToggleSearchModel('off'))}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>
            </div>
        </div>
    );
    
}