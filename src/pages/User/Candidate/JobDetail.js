import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";

import JobApi from "../../../api/JobApi";

import SubmitButton from "../../../components/form/SubmitButton";
import Textbox from "../../../components/form/Textbox";
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import AccordionCus from '../../../components/Accordion/AccordionCus'
import JobBrief from "../../../components/common/Job/JobBrief";
import JobDescription from "../../../components/common/Job/JobDescription";
import JobTitle from "../../../components/common/Job/JobTitle";


const JobDetail = () => {
    const {kw} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchData, setSearchData] = useState({
        keyword:'',
        jobPosition:0,
        jobCate:0,
        jobType:0,
        province:0,
    });
    const [location, setLocation] = useState('');
    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState({
        title:kw,
    });
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState();
    const [data, setData] = useState({
        cates: [],
        position: [],
        province: [],
        type: [],
    });

    const handleSubmit = (e) => {
        const params = {};
        setFilters({});
        e.preventDefault();
        setLoading(true);
        if(searchData.keyword !== null){
            params.title = searchData.keyword;
        }

        if(parseInt(searchData.jobPosition) !== 0){
            params.positionId=parseInt(searchData.jobPosition);
        }

        if(parseInt(searchData.jobCate) !== 0){
            params.categoryId=parseInt(searchData.jobCate);
        }

        if(parseInt(searchData.jobType) !== 0){
            params.jobTypeId=parseInt(searchData.jobType);
        }

        if(parseInt(searchData.province) !== 0){
            params.provinceId=parseInt(searchData.province);
        }

        setFilters(params);
    } 

    const getJobs = async() => {
        try {
            const response = await JobApi.getAll(filters);
            setJobs(response.data.data);
            setJob(response.data.data.content[0]);
            setCount(response.data.data.size);
            setError();
        } catch (err) {
            console.log(err)
            setError(err.response.data.message);
        }
        setLoading(false);
    }

    const handleClick = async(e) => {
        e.preventDefault();
        await setJob(jobs.content.filter(i => i.id === parseInt(e.currentTarget.id))[0]);
        window.scroll({
            top: 150, 
            behavior: "smooth"
        });

        console.log(location);
    }

    useEffect(() => {
        getJobs();
    }, [filters]);

    useEffect(() => {
        const fetchData = async(e) => {    
            let catesUrl = 'http://localhost:8080/public/api/job-category';
            let typeUrl = 'http://localhost:8080/public/api/job-type';
            let positionUrl = 'http://localhost:8080/public/api/job-position';
            let provinceUrl = 'https://provinces.open-api.vn/api/';
            let getCates = axios.get(catesUrl);
            let getType = axios.get(typeUrl);
            let getPosition = axios.get(positionUrl);
            let getProvince = axios.get(provinceUrl);

            setLoading(true);
            await axios.all([getCates, getPosition, getProvince, getType]).then(
                axios.spread((...allData) => {
                        setData({
                            cates: allData[0].data.data,
                            position: allData[1].data.data,
                            province: allData[2].data,
                            type: allData[3].data.data,
                        })
                    })
                ).catch(err => {
                    console.log(err)
                    setError(err.response.data.message);
                }).finally(() => {
                    setLoading(false);
                });
        }

        fetchData();

        return () => {
        }
    }, []);

    return (
        <>
            <Header />
            <Container className='mt-3' id='search-container'>
                <form onSubmit={handleSubmit} className='search'>
                    <div id='search-input' className="d-flex justify-content-center" >
                        <div className='search-icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                        <Textbox id='searchKeyword' name='keyword' placeholder='Search job titles' 
                        onChange={(e) => {setSearchData({
                            ...searchData,
                            keyword: e.target.value,
                        });
                        }} />
                        <SubmitButton value='Search' className='m-0' onClick={handleSubmit}/>
                    </div>
                    <div className='advanced-search'>
                        <div className="search-option d-flex w-100 justify-content-between mt-2">
                            <div id='jobCate' className="search-option-container">
                                <div className='icon'>
                                    <i className="fa-solid fa-building"></i>
                                </div>
                                <select value={searchData.jobCate} className='form-control' 
                                    onChange={(e) => setSearchData({
                                        ...searchData,
                                        jobCate: e.target.value,
                                    })}
                                >
                                    <option value='0'>--All Job Categories--</option>
                                    {data.cates.map((cate, index) => (
                                        <option key={index} value={cate.id}>{cate.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div id='jobPosition' className="search-option-container">
                                <div className="icon">
                                    <i className="fa-solid fa-people-line"></i>
                                </div>
                                <select value={searchData.jobPosition} className='form-control' 
                                    onChange={(e) => setSearchData({
                                        ...searchData,
                                        jobPosition: e.target.value,
                                    })}
                                >
                                    <option value='0'>--All Job Position--</option>
                                    {data.position.map((position, index) => (
                                        <option key={index} value={position.id}>{position.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div id='jobType' className="search-option-container">
                                <div className="icon">
                                    <i className="fa-solid fa-business-time"></i>
                                </div>
                                <select value={searchData.jobType} className='form-control' 
                                    onChange={(e) => setSearchData({
                                        ...searchData,
                                        jobType: e.target.value,
                                    })}
                                >
                                    <option value='0'>--All Job Types--</option>
                                    {data.type.map((type, index) => (
                                        <option key={index} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div id='location' className="search-option-container">
                                <div className="icon">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <select value={searchData.province} className='form-control' 
                                    onChange={(e) => setSearchData({
                                        ...searchData,
                                        province: e.target.value,
                                    })}
                                >
                                    <option value='0'>--All province--</option>
                                    {data.province.map((province, index) => (
                                        <option key={index} value={province.code}>{province.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
            <div id='job-detail-container'>
                <Row>
                    <Col xs={5} className='p-3' id='jobs-cards'>
                        <p className='m-0 mb-4'><Link to='/login'>Post your resume here</Link> to find a job that suit you!</p>
                        <div id='jobs-cards-action' className='d-flex justify-content-between'>
                            <span><strong>Sort by:</strong> relavance - date</span>
                            <span className='text-secondary'>{count} jobs is available</span>
                        </div>
                        <div className='cards-container'>
                            {loading && (
                                <div className="text-center m-5">
                                    <Spinner animation="border" variant='info' className=""/>
                                    <p className="h3 mt-2">We are trying to get the best jobs for you. Please wait a minute!</p>
                                </div>
                            )}

                            {!loading && error && (
                                <div className="text-center m-5">
                                    <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                                    <p className="h3 mt-2 text-danger">{error}</p>
                                </div>
                            )}

                            {!loading && !error && jobs.size && (
                                <>
                                {jobs.content.map((job, index) => (
                                    <div className='card-detail p-4' onClick={handleClick} key={index} id={job.id}>
                                        <div className='title '>
                                            <h1>{job.title}</h1>
                                            <p>{job.companyUser.company.companyName}</p>
                                            <p>{job.province.nameEn}</p>
                                            <div id='cd-1' className='card-option'>
                                                <AccordionCus />
                                            </div>
                                        </div>
                                        <JobBrief job={job} />
                                        <div className='description'>
                                        {job.requirements.slice(0,1).map((req, index) => (
                                            <p key={index} className='text-muted'>{req.content}</p>
                                        ))}
                                        </div>
                                        <p className='time m-0'>Posted <Moment fromNow>{job.datePublished}</Moment></p>
                                    </div>
                                ))}
                                </>
                            )}
                        </div>
                    </Col>
                    <Col xs={7} className='' id='job-full-detail'>
                        {job && (
                            <div id='sticky-job-detail' className='bg-light p-4'>
                                <div id='detail'>
                                    <JobTitle job={job} />
                                    <Link to='/'><SubmitButton value='Apply Now' className='btn btn-info'/></Link>
                                    <JobBrief job={job} />
                                    <p className='time mt-2'>Posted <Moment fromNow>{job.datePublished}</Moment></p>
                                    <JobDescription job={job} />
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
} 

export default JobDetail