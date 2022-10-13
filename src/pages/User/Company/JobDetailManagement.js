import React, { useEffect, useState } from "react";
import { MenuItem } from "react-pro-sidebar";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Container, Row, Spinner } from "react-bootstrap";
import Moment from "react-moment";
import { toast } from 'react-toastify'

import './css/JobDetailManagement.scss'

import Table from "../../../components/Table/Table";
import Sidebar from '../../../components/layout/Sidebar'
import ModalView from "../../../components/Modal/ModalView";
import JobTitle from "../../../components/common/Job/JobTitle";
import JobBrief from "../../../components/common/Job/JobBrief";
import JobDescription from "../../../components/common/Job/JobDescription";
import Textbox from "../../../components/form/Textbox";
import SubmitButton from "../../../components/form/SubmitButton";

import JobApi from "../../../api/JobApi";

import { CandidateColumns } from "../../../data/Column/CandidateColumn";

const user = ({
    "id" : 1,
    "username": "Animolz",
    "avatar": "/images/male_avatar.jpg"
})

const JobDetailManagement = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [candidates, setCandidates] = useState({
        count: 0,
        data: undefined,
        error: '',
    });
    const[candidate, setCandidate] = useState();
    const [job, setJob] = useState({
        data: undefined,
        error: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const getData = async() => {
        setLoading(true);
        try {
            const response1 = await JobApi.getById(id);
            setJob({
                data: response1.data.data,
                error: '',
            })
        } catch (err) {
            console.log(err)
            setJob({
                ...job,
                error: err.response.data.message,
            });
        };

        try {
            const response = await JobApi.getCandidates(id);
            setCandidates({
                count:response.data.data.length,
                data:response.data.data,
                error: '',
            });
        } catch (err) {
            console.log(err)
            setCandidates({
                ...candidates,
                error: err.response.data.message,
            });
        } finally {
            setLoading(false);
        };
    }

    useEffect(() => {
        getData();
    }, []);    

    return (
        <>
            <Sidebar children={(
                <>
                    <MenuItem icon={<i className="fa-solid fa-house"></i>}>
                        <Link to='/company/home'>Home</Link>
                    </MenuItem>
                    <MenuItem active icon={(<i className="fa-solid fa-briefcase"></i>)}>
                        <Link to='/company/jobs-management'>Jobs Management</Link>
                    </MenuItem>
                    <MenuItem icon={(<i className="fa-solid fa-chart-line"></i>)}>Statistical Report</MenuItem>
                </>
                )}
                user={user}
            />
            <div className='hero' id='hero-jobs-management'></div>
            <div id='job-detail-management-container' className='with-sidebar-container'>
                <Container className='pt-4' id='search-container'>
                    <form onSubmit={handleSubmit} className='search'>
                        <div id='search-input' className="d-flex justify-content-center" >
                            <div className='search-icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                            <Textbox id='searchKeyword' name='keyword' onChange={(e) => setKeyword(e.target.value)} placeholder='Search job titles'/>
                            <Link to={`/job-detail/${keyword}`}><SubmitButton value='Search' className='m-0' /></Link>
                        </div>
                    </form>
                </Container>
                <div className='my-4 dashboard-header' id='job-detail-management-content'>
                    <div className='title'>
                        <h4 className="m-0 py-2">Company's Job Detail Management</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/company/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/company/jobs-management'>Jobs Management</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Job Detail Management</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='text-light text-center d-flex'>
                            <p className='m-0'>{candidates.count}</p><span>Candidates Apply</span>
                        </div>
                    </div>
                    <div id='job-detail-view'>
                        {loading && (
                            <div className="text-center" id="error-message">
                                <Spinner animation="border" variant='info' className=""/>
                                <p className="h3 mt-2">Waiting is the key to success</p>
                            </div>
                        )}

                        {!loading && job.error && (
                            <div className="text-center" id="error-message">
                                <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                                <p className="h3 mt-2 text-danger">{job.error}</p>
                            </div>
                        )}

                        {!loading && !job.error && candidates.error && toast.warning(candidates.error, { toastId: '' })}

                        {!loading && !job.error && job.data && (
                            <Row id='' className="mt-5 p-5 bg-light rounded box-shadow-1">
                                <Col xs={5} className='border-right'><JobTitle job={job.data} /></Col>
                                <Col xs={5} className='border-right border-left'>
                                    <JobBrief job={job.data} />
                                    <p className='time mt-2'><i className="fa-solid fa-clock text-primary"></i> Posted <Moment fromNow>{job.data.datePublished}</Moment></p>
                                </Col>
                                <Col xs={2} className='border-left text-center'>
                                    <p className='m-0 p-2 h5 border-bottom'><b>Action</b></p>
                                    <ModalView id='job-detail-modal' variant='secondary' size='lg' btnSize='' btnValue='View Info' icon={(<i className="fa-solid fa-circle-info mr-2 text-light"></i>)} centered 
                                        title={job.data.companyUser.username}
                                        content={(
                                            <>
                                                <JobTitle job={job.data} />
                                                <JobBrief job={job.data} />
                                                <p className='time mt-2'><i className="fa-solid fa-clock text-primary"></i> Posted <Moment fromNow>{job.data.datePublished}</Moment></p>
                                                <JobDescription job={job.data} />
                                            </>
                                        )} 
                                    />
                                    <button className='btn btn-primary'><i className="fa-solid fa-pen mr-2 text-light"></i>Update</button>
                                    <div className='mt-1 border-top'><button className='btn btn-danger'><i className="fa-solid fa-trash-can mr-2 text-light"></i>Delete</button></div>
                                </Col>
                            </Row>
                        )}
                    </div>
                    {!loading && !job.error && !candidates.error && (
                            <>
                                <Row className='mt-5'>
                                    <Col xs={5}>Candidate Profile and action</Col>
                                    <Col xs={7} className='bg-light rounded box-shadow'><Table data={candidates.data} columns={CandidateColumns} size={5} /></Col>
                                </Row>
                            </>
                    )}
                </div>
            </div>
        </>
    );
}

export default JobDetailManagement