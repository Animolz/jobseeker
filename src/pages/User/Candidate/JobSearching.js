import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";
import './css/JobSeaching.scss'
import './css/JobDetail.scss'
import '../../../assets/global.scss'
import Header from '../../../components/layout/Header'
import Textbox from '../../../components/form/Textbox'
import SubmitButton from '../../../components/form/SubmitButton'
import Card from '../../../components/Card/Card'
import { Link } from "react-router-dom";
import Footer from "../../../components/layout/Footer";

const JobSeaching = () => {
    const [keyword, setKeyword] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(JSON.stringify({
            keyword: keyword,
        }))
    } 

    useEffect(() => {
        const fetchJobs = async() => {
            setLoading(true);
            await axios.post('http://localhost:8080/company/api/job/get',{
                title: '',
            }).then(res => {
                setError('')
                setJobs(res.data.data.content);
            }).catch(err => {
                console.log(err)
                setError(err.response.data.message);
            }).finally(() => {
                setLoading(false);
            });
        }

        fetchJobs();

        return () => {
            setKeyword('');
        }
    }, []);

    console.log(jobs);

    return (
        <>
            <Header />
            <div className='hero' style={{backgroundImage:`url(/images/recruitment.jpg)`}}>
                <Container className='p-5'>
                    <h1>Looking for a job</h1>
                    <span>Here, you can find over +1.000 jobs and people hiring.</span><br/>
                    <span>Find the right job or internship for you.</span>
                </Container>
            </div>
            <Container className='mt-3' id='search-container'>
                <form onSubmit={handleSubmit} className='search'>
                    <div id='search-input' className="d-flex justify-content-center" >
                        <div className='search-icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                        <Textbox id='searchKeyword' name='keyword' placeholder='Search job titles'
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <Link to={`/candidate/job-detail/${keyword}`}><SubmitButton value='Search' className='m-0' /></Link>
                    </div>
                </form>
            </Container>
            {loading && (<>
                <div className="text-center m-5">
                    <Spinner animation="border" variant='info' className=""/>
                    <p className="h4 mt-2">We are trying to get the best jobs for you. Please wait a minute!</p>
                </div></>
            )}
            
            {!loading && error && (
                <div className="text-center m-5">
                    <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                    <p className="h3 mt-2 text-danger">{error}</p>
                </div>
            )}


            <div className='mt-5' id='job-cards'>
                {jobs.map((job) => (
                    <div key={job.id} className='box-shadow-1 rounded'>
                        <Card 
                            label={job.title} 
                            info={job.companyUser.username} 
                            url={job.companyUser.avatar}
                            salary={job.salary}
                            place={job.location} 
                            position={job.position.name} 
                            date={job.datePublished} 
                        />
                    </div>
                ))}
            </div>
            
            <Footer />
        </>
    )
}

export default JobSeaching