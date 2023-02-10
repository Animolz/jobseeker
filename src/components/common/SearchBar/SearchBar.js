import SearchButton from "components/form/SearchButton";
import Textbox from "components/form/Textbox";
import React from "react";
import './css/SearchBar.scss'



const SearchBar = (props) => {
    return (
    <div className='search-bar'>
        <div className="d-flex justify-content-center search-bar-container" >
            <div className='search-bar__icon'><i className="fa-solid fa-magnifying-glass"></i></div>
            <Textbox id='searchKeyword' name='keyword' placeholder='Search job titles'
                onChange={props?.onChange}
            />
            <SearchButton value='Search' className='m-0' onClick={props?.onClick} />
        </div>
    </div>
    );
}

export default SearchBar