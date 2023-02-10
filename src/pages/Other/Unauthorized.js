import React from "react";
import 'assets/global.scss'
import './css/Unauthorized.scss'

export const Unauthorized = () => {
    return (
        <div className="unauthorized">
            <div className="hero unauthorized__hero"></div>
            <div className="position-absolute element--center text-center">
                <i class="fa-solid fa-lock fa-10x mb-4"></i>
                <p className='h1 mt-5 mb-4'><b>Access to this page is restricted</b></p>
                <p>Please check with the site admin if you believe this is a mistake.</p>
            </div>
        </div>
    );
}