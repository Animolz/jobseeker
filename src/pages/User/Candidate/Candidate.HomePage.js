import SearchBar from "components/common/SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../../components/layout/Header";
import './css/HomeCandidate.scss'

const CandidateHomePage = () => {
    return (
        <>
            <Header></Header>
            <div className='candidate-home__hero' style={{backgroundImage: `url(/images/home-banner-1.jpg)`}}>
                <div className="candidate-home__content">
                    <h1 className='candidate-home__title'>CONNECT-E</h1>
                    <p className="p-0 candidate-home__text mt-5">
                        Lorem ipsum dolor sit amet. Est perspiciatis vero At veniam rerum eos necessitatibus 
                        blanditiis non explicabo mollitia id placeat dolore id iusto nihil. Est enim nisi 
                        aut fugit impedit ut maxime quidem. Et omnis quas sed eius culpa ex tenetur neque 
                        id velit quae aut dolorum velit aut assumenda incidunt nam reprehenderit fugit.
                    </p>
                    <Link to='/candidate/job-searching' className="btn btn-info mt-5">GET STARTED</Link>
                </div>
            </div>
        </>
    );
}

export default CandidateHomePage