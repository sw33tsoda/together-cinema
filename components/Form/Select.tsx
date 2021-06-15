import { useEffect, useRef, useState } from "react";
import classnames from 'classnames';

type SelectProps = {
    selected:string,
    handleSetState:Function,
    data:Array<any>,
}

function Select({data,selected,handleSetState}:SelectProps) {
    const [isShow,setIsShow] = useState<boolean>(false);
    const dropdownListRef = useRef(null);

    useEffect(() => {
        const handleSetIsShow = (event:any) => {
            if (dropdownListRef.current && !dropdownListRef.current.contains(event.target)) {
                setIsShow(false);
            }
        }

        document.addEventListener("mousedown", handleSetIsShow);

        return () => {
            document.removeEventListener("mousemove", handleSetIsShow);
        }
    },[]);

    const handleShowListClasses = classnames("select-group__options-list",{
        "select-group__options-list--show":isShow,
    });

    const handleSelectedItem = (value:string) => classnames("select-group__options-list__option",{
        "select-group__options-list__option--active":selected == value,
    })

    const selectedItemName = data.find(item => {
        return item.value == selected;
    }).label;

    const handleSelect = (value:string) => {
        handleSetState(value);
        setIsShow(false);
    }

    return (
        <div className="select-group">
            <div className="select-group__selected" onClick={() => setIsShow(true)}>
                <div className="select-group__selected__name">
                    <p>{selectedItemName}</p>
                </div>
                <div className="select-group__selected__show">
                    <i className="fas fa-caret-down"></i>
                </div>
            </div>
            <div className={handleShowListClasses} ref={dropdownListRef}>
                {data.map((value,index) => (
                    <div className={handleSelectedItem(value.value)} key={index} onClick={() => handleSelect(value.value)}><p>{value.label}</p></div>
                ))}
            </div>
        </div>
    );
}

export default Select;