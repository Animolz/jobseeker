import React from "react";

const CardInfo = (props) => {
    const { info, label, position, ...inputProps } = props;

    return (
        <span className='card__info'>
            <p className='m-0 w-100'><strong>{label}</strong></p>
            <p className='m-0 w-100 text-secondary'>{position}</p>
            <p className='mb-0 w-100 text-muted'>{info}</p>
        </span>
    );
} 

export default CardInfo