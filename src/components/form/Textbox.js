import React, { useState } from "react";
import './css/form.scss';

const Textbox = (props) => {
    const { label, id, error, onChange, ...inputProps } = props;
    const [focused, setFocused] = useState(false);

    const handleFocused = (e) => {
        setFocused(true);
    }

    return(
        <div className="textbox__wrapper validate-input" id={id}>
            <label className="txt1">{label}</label>
            <input className="textbox__input" 
                {...inputProps} 
                onChange={onChange} 
                onBlur={handleFocused} 
                focused={focused.toString()}
                onFocus={() => inputProps.name === 'confirmPassword' && setFocused(true)}/>
            <span className="position-absolute error-message">{error}</span>
        </div>
    );
}

export default Textbox