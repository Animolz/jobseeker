import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import './css/JobSeaching.scss'
import 'assets/global.scss'
import Header from 'components/layout/Header'
import Card from 'components/Card/Card'
import { Link, useNavigate } from "react-router-dom";
import Footer from "components/layout/Footer";
import SearchBar from "components/common/SearchBar/SearchBar";
import { AxiosClient } from "api/AxiosClient";

const JobSeaching = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [jobs, setJobs] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const fetchJobs = async() => {
        setLoading(true);
        try{
            const response = await AxiosClient.get('public/api/job/get-list');
            if(response.status == 200){
                const res = response?.data.data.sort((a,b) => b.datePublished - a.datePublished );
                setJobs(res);
                setError('');
            }
        } catch(err) {
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchJobs();

        return () => {
            setKeyword('');
            setJobs({});
            setLoading(true);
            setError('');
        }
    }, []);

    return (
        <>
            <Header />
            <div className='hero' style={{backgroundImage:`url(/images/recruitment.jpg)`}}>
                <Container className='p-5 rounded'>
                    <h1>Looking for a job</h1>
                    <span>Here, you can find over +1.000 jobs and people hiring.</span><br/>
                    <span>Find the right job or internship for you.</span>
                </Container>
            </div>
            <Container className='mt-3 position-relative search'>
                <Link to={`/job-detail/${keyword}`} className='position-absolute search-bar__direct'><button>Search</button></Link>
                <SearchBar onChange={(e) => setKeyword(e.target.value)} handleSubmit={handleSubmit}/>
            </Container>
            {loading && (<>
                <div className="text-center m-5">
                    <Spinner animation="border" variant='info'/>
                    <p className="h4 mt-2">We are trying to get the best jobs for you. Please wait a minute!</p>
                </div></>
            )}
            
            {!loading && error && (
                <div className="text-center m-5">
                    <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                    <p className="h3 mt-2 text-danger">{error}</p>
                </div>
            )}

            {!loading && !error && jobs?.length && (
                <div className='my-5 jobs-cards__content'>
                    {jobs?.filter(job => job?.title.includes(keyword) || keyword === '')
                        .map((job) => (
                        <Link key={job?.id} to={`/job-detail/${job?.title}`} className='box-shadow-1 link--underline-none jobs-cards__link'>
                            <Card 
                                label={job?.title} 
                                info={job?.companyUser.company.companyName} 
                                url={job?.companyUser.avatar}
                                salary={!!job?.salary
                                            ? `${job?.salary} $$$`
                                            : 'Negotiable Salary'}
                                place={job?.location} 
                                position={job?.position.name} 
                                date={job?.datePublished} 
                            />
                        </Link>
                    ))}
                </div>
            )}    
            
            <Footer />
        </>
    )
}

export default JobSeaching