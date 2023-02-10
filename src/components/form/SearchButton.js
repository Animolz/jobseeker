import React from "react";
import './css/SearchButton.scss';

const SearchButton = (props) => {
    const { className, onClick, ...inputProps } = props;

    return (
        <>
            <div className="search-btn__container">
                <button className={`search-btn__btn ${className}`}  type="submit" onClick={onClick}>
                    <input {...inputProps}  type="button" name="submit" className="search-btn__input"/>
                </button>
            </div>
        </>
    );
}

export default SearchButton