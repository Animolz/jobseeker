import React, { useEffect, useState } from "react";
import { MenuItem } from "react-pro-sidebar";
import { Breadcrumb, BreadcrumbItem, Col, Container, Row, Spinner } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import Moment from "react-moment";

import './css/JobsManagement.scss'

import Textbox from "../../../components/form/Textbox";
import SubmitButton from "../../../components/form/SubmitButton";
import Sidebar from '../../../components/layout/Sidebar'
import Table from "../../../components/Table/Table";
import ModalView from "../../../components/Modal/ModalView";
import BarChart from "../../../components/Chart/BarChart";
import JobBrief from "../../../components/common/Job/JobBrief";
import JobTitle from "../../../components/common/Job/JobTitle";
import JobDescription from "../../../components/common/Job/JobDescription";

import JobApi from "../../../api/JobApi";
import { JobColumns } from "../../../data/Column/JobColumn";
import COUNT_USER from '../../../data/COUNT_USER.json'

const user = ({
    "id" : 1,
    "username": "Animolz",
    "avatar": "/images/male_avatar.jpg"
})

const JobsManagement = () => {
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [job, setJob] = useState();
    const [data, setData] = useState({
        jobs: {},
        count: 0,
    });
    const [stats, setStats] = useState({
        labels: COUNT_USER.map(data => data.date), 
        datasets: [{
            label: 'Number Of Users Apply For The Job',
            data: COUNT_USER.map(data => data.number_of_users),
            backgroundColor: `rgba(` + 
                                Math.floor(Math.random() * 255) + `,` + 
                                Math.floor(Math.random() * 255) + `,` + 
                                Math.floor(Math.random() * 255) + `, 0.7)`,
            borderColor: 'rgba(200, 200, 200, 0.75)',
            hoverBorderColor: 'rgba(200, 200, 200, 1)',
            borderWidth: 1,
        }]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const getJob = async() => {
        setLoading(true);
        try {
            const response = await JobApi.getList();
            setData({
                jobs: response.data.data,
                count: response.data.data.length,
            });
            setJob(response.data.data[0]);
            setError();
        } catch(err) {
            console.log(err)
            setError(err.response.data.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        getJob();
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
            <div id='jobs-management-container' className='with-sidebar-container'>
                <Container className='pt-4' id='search-container'>
                    <form onSubmit={handleSubmit} className='search'>
                        <div id='search-input' className="d-flex justify-content-center" >
                            <div className='search-icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                            <Textbox id='searchKeyword' name='keyword' onChange={(e) => setKeyword(e.target.value)} placeholder='Search job titles'/>
                            <Link to={`/job-detail/${keyword}`}><SubmitButton value='Search' className='m-0' /></Link>
                        </div>
                    </form>
                </Container>
                <div className='my-4 dashboard-header' id='jobs-management-content'>
                    <div className='title'>
                        <h4 className="m-0 py-2">Company's Jobs Management</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/company/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Jobs Management</BreadcrumbItem>
                        </Breadcrumb>
                        <p className=''><button className='btn btn-info'>+ Create new</button></p>
                        <div className='text-light text-center d-flex'>
                            <p className='m-0'>{data.count}</p><span>Jobs</span>
                        </div>
                    </div>
                    {loading && (
                        <div className="text-center" id="error-message">
                            <Spinner animation="border" variant='info' className=""/>
                            <p className="h3 mt-2">Something is stuck. Please wait while we clearing the way!</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="text-center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">{error}</p>
                        </div>
                    )}

                    {!loading && !error && !data.jobs && (
                        <div className="text-center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">There's something wrong. Please reload the page or return to the previous page!</p>
                        </div>
                    )}

                    {!loading && !error && data.jobs.length && (
                        <>
                            <div className="bg-light mt-3 table-custom box-shadow-1 rounded">
                                <Table data={data.jobs} columns={JobColumns} size={6} setValue={setJob} id='jobs-table'/>
                            </div>
                            <div id='job-detail-info' className="mt-4">
                                <Row>
                                    {job && (
                                    <Col className='p-0'>
                                        <div className='p-4 box-shadow-1' id='full-detail'>
                                            <div id='detail' className='pb-4 border-bottom'>
                                                <div className='title mb-2'>
                                                    <h3 className='m-0'>{job.title}</h3>
                                                    <p className='m-0'>{job.companyUser.company.companyName}</p>
                                                    <p className='m-0'>{job.province.nameEn}</p>
                                                </div>
                                                <JobBrief job={job} />
                                            </div>
                                            <div className='pt-3 border-top text-right'>
                                                <ModalView id='job-detail-modal' variant='outline-secondary' size='lg' btnSize='sm' btnValue='View Info' centered 
                                                    title={job.companyUser.username}
                                                    content={(
                                                        <>
                                                            <JobTitle job={job} />
                                                            <JobBrief job={job} />
                                                            <p className='time mt-2'><i className="fa-solid fa-clock text-primary"></i> Posted <Moment fromNow>{job.datePublished}</Moment></p>
                                                            <JobDescription job={job} />
                                                        </>
                                                    )} 
                                                />
                                                <Link className='btn btn-success ml-3' to={`/company/jobs-management/job-detail/${job.id}`}>View Detail</Link>
                                            </div>
                                        </div>
                                    </Col>
                                    )}
                                    <Col className='' id='job-candidates'>
                                        <BarChart data={stats} width='100%' height='45%'/>
                                    </Col>
                                </Row>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default JobsManagement