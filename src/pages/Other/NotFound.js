import React from "react";
import 'assets/global.scss'
import './css/NotFound.scss'
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="notfound">
            <div className="hero notfound__hero"></div>
            <div className="position-absolute element--center text-center">
                <span className="notfound__title"><b>4</b></span><Spinner animation="border" variant="dark"/><span className="notfound__title"><b>4</b></span>
                <p className='h1 mt-5 mb-4'><b>[ page not found ]</b></p>
                <Link to={-1} className='mt-5 mb-4 btn btn-secondary btn-lg'><b> Go back</b></Link>
            </div>
        </div>
    );
}