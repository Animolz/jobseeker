import React from "react";
import './css/form.scss'

const RadioButton = (props) => {
    const {isSelected, label, onChange, ...inputProps} = props
    
    return (
        <p className='RadioButton'>
            <input type='radio'
                {...inputProps}
                onChange={onChange}
                checked={isSelected}
                className='mr-2' 
            />
            <label htmlFor={inputProps.id}>{label}</label>
        </p>
    )
}

export default RadioButton