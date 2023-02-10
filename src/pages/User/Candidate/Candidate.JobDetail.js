import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";

import './css/JobDetail.scss'

import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { JobCardAction } from '../../../components/Dropdowns/JobCardAction'
import JobBrief from "../../../components/common/Job/JobBrief";
import JobDescription from "../../../components/common/Job/JobDescription";
import JobTitle from "../../../components/common/Job/JobTitle";
import SearchBar from "components/common/SearchBar/SearchBar";
import ReactPaginate from "react-paginate";
import AuthService from "services/AuthService";
import { toast } from "react-toastify";


const JobDetail = () => {
    const {kw} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
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
    const [jobs, setJobs] = useState({});
    const [job, setJob] = useState();
    const [data, setData] = useState({
        cates: [],
        position: [],
        province: [],
        type: [],
    });
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = {};
        setFilters({});
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

    const handleClick = async(e) => {
        e.preventDefault();
        await setJob(jobs.content.filter(i => i.id === parseInt(e.currentTarget.id))[0]);
        window.scroll({
            top: 150, 
            behavior: "smooth"
        });

        console.log(location);
    }

    const handleApply = async(id) => {
        if(window.confirm('Do you want to apply for this job ?')){
            try {
                const response = await axiosPrivate.post(`candidate/api/apply-job/send/${id}`);
                console.log(response);
                if(response.status == 200){
                    toast.success('Apply job successfully!');
                }
            } catch(err) {
                console.log(err);
                toast.error('Can not apply job!');
            }
        }
    }
    
    const onPageChange = (e) => {
        setPage(parseInt(e.selected + 1));
        window.scroll({
            top: 0, 
            behavior: "smooth"
        });
    }

    const getJobs = async() => {
        try {
            const response = await axiosPrivate.post(`public/api/job/get?page=${page}`, { ...filters });
            if(response.status == 200){
                console.log(response)
                setJobs(response?.data.data);
                setJob(response?.data.data.content[0]);
                setCount(response?.data.data.size);
                setPageCount(response?.data.data.totalPages);
                setError();
            }
        } catch (err) {
            console.log(err)
            setError(err.response.data.message);
        }
        setLoading(false);
    }

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

    useEffect(() => {
        getJobs();
    }, [filters, page]);

    useEffect(() => {
        fetchData();

        return () => {
            setLoading(true);
            setError('');
            setSearchData({});
            setLocation('');
            setCount(0);
            setFilters({});
            setJobs({});
            setJob({});
            setData({});
            setPageCount(0);
            setPage(0);
        }
    }, []);

    return (
        <>
            <Header />
            <Container className='mt-3'>
                <form>
                    <SearchBar onChange={(e) => setSearchData({...searchData, keyword:e.target.value})} onClick={handleSubmit}/>
                    <div className='advanced-search'>
                        <div className="advanced-search__container d-flex w-100 justify-content-between mt-2">
                            <div id='jobCate' className="advanced-search__inner">
                                <div className='advanced-search__icon'>
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
                            <div id='jobPosition' className="advanced-search__inner">
                                <div className="advanced-search__icon">
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
                            <div id='jobType' className="advanced-search__inner">
                                <div className="advanced-search__icon">
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
                            <div id='location' className="advanced-search__inner">
                                <div className="advanced-search__icon">
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
            <div className="candidate-jobs">
                <Row className="candidate-jobs__container">
                    <Col xs={5} className='p-3 pb-0 candidate-jobs__cards-view'>
                        <p className='m-0 mb-4'><Link to='/login'>Post your resume here</Link> to find a job that suit you!</p>
                        <div id='jobs-cards-action' className='d-flex justify-content-between'>
                            <span><strong>Sort by:</strong> relavance - date</span>
                            <span className='text-secondary'>{count} jobs is available</span>
                        </div>
                        <div className='candidate-jobs__inner'>
                            {loading && (
                                <div className="text-center m-5">
                                    <Spinner animation="border" variant='info'/>
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
                                        <div className='candidate-jobs-view__detail p-4' onClick={handleClick} key={index} id={job.id}>
                                            <div className='candidate-jobs-view__detail-title'>
                                                <h1>{job.title}</h1>
                                                <p>{job.companyUser.company.companyName}</p>
                                                <p>{job.province.nameEn}</p>
                                                <div id='cd-1' className='card-option'>
                                                    <JobCardAction />
                                                </div>
                                            </div>
                                            <JobBrief job={job} />
                                            <div className='candidate-jobs-view__detail-description'>
                                            {job.requirements.slice(0,1).map((req, index) => (
                                                <p key={index} className='text-muted'>{req.content}</p>
                                            ))}
                                            </div>
                                            <p className='time m-0'><i class="fa-regular fa-clock"></i> Posted <Moment fromNow>{job.datePublished}</Moment></p>
                                        </div>
                                    ))}
                                    {pageCount !== 1 
                                    && <ReactPaginate 
                                            className="d-flex candidate-jobs-view__pagination"
                                            breakLabel="..."
                                            nextLabel={<i class="fa-solid fa-angles-right"></i>}
                                            onPageChange={onPageChange}
                                            pageRangeDisplayed={5}
                                            pageCount={pageCount}
                                            previousLabel={<i class="fa-solid fa-angles-left"></i>}
                                            renderOnZeroPageCount={null}

                                    />}
                                </>
                            )}
                        </div>
                    </Col>
                    <Col xs={7} className='job-detail-note'>
                        {job && (
                            <>
                                <div className='bg-light p-4 job-detail-note__container'>
                                    <div className='job-detail-note__view text-left'>
                                        <JobTitle job={job} />
                                        {auth?.role === 'CANDIDATE' && <button className='btn btn-info  mr-2' onClick={() => handleApply(job?.id)}><b className="text-light">Apply Now</b></button>}
                                        {(auth?.role === 'COMPANY' ||  auth?.role === 'ADMIN') && <></>}
                                        {!auth && <Link to='/login' className='btn btn-secondary'><b>Login to Apply</b></Link>}
                                        <Link to={`/company-profile/${job?.companyUser.id}`} className='btn btn-outline-secondary'>View Company Profile</Link>
                                        <JobBrief job={job} />
                                        <p className='time mt-2'><i class="fa-regular fa-clock"></i> Posted <Moment fromNow>{job.datePublished}</Moment></p>
                                        <JobDescription job={job} />
                                    </div>
                                </div>
                            </>
                        )}
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
} 

export default JobDetail