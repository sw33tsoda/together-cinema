import { useRef, useState } from "react"
import classnames from 'classnames'

type InputTextProps = {
    label:string,
    input:string,
    setInput:Function,
    keyDownEvent:Function,
}

export default function InputText({label,input,setInput,keyDownEvent}:InputTextProps) : JSX.Element {
    const [onFocus,setOnFocus] = useState(false);
    const labelRef = useRef();
    const inputRef = useRef();

    const handleOnFocus = () => {
        setOnFocus(true);
    }

    const handleOnBlur = (event:any) => {
        if (event.target.value == "") {
            setOnFocus(false);
        }
    }

    const handleSetInput = (event:any) => {
        setInput(event.target.value);
    }

    const handleOnKeydown = (event:any) => {
        if (event.which == 13) {
            keyDownEvent();
        }
    }

    return (
        <div className="input-group">
            <label className={classnames("input-group__label",{"input-group__label--in-use" : onFocus})} ref={labelRef}>
                {label}
            </label>
            <input className={classnames("input-group__input",{"input-group__input--in-use" : onFocus})} ref={inputRef} onFocus={handleOnFocus} onBlur={handleOnBlur} value={input} onChange={handleSetInput} onKeyDown={handleOnKeydown}/>
        </div>
    )
}