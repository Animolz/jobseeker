import React, { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Col, Container, Row, Spinner } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import Moment from "react-moment";
import useAxiosPrivate from "hooks/useAxiosPrivate";

import './css/JobsManagement.scss'
import 'assets/global.scss'

import ModalView from "../../../components/Modal/ModalView";
import BarChart from "../../../components/Chart/BarChart";
import JobBrief from "../../../components/common/Job/JobBrief";
import JobTitle from "../../../components/common/Job/JobTitle";
import JobDescription from "../../../components/common/Job/JobDescription";

import { JobColumns } from "../../../data/Column/Company.JobColumn";
import MaterialTable from "material-table";
import { toast } from "react-toastify";
import FormatDate from "utils/FormatDate";
import { ComapnySidebar } from "./Company.Sidebar";

const JobsManagement = () => {
    const axiosPrivate = useAxiosPrivate();
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [job, setJob] = useState();
    const [jobs, setJobs] = useState({
        data: {},
        count: 0,
    });
    const [stats, setStats] = useState({});

    const handleRowClick = (e, rowData) => {
        setJob(rowData);
    } 

    const getJob = async() => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get('company/api/job/get-list');
            console.log(response);
            if(response.status == 200){
                const res = response?.data.data.sort((a,b) => b.datePublished - a.datePublished );
                setJobs({
                    data: res,
                    count: response?.data.data.length,
                });
                setJob(response?.data.data[0]);
                setError();
            }
        } catch(err) {
            console.log(err)
            setError(err?.response.data.message);
        }
        setLoading(false);
    }

    const statNumberCandidatesApplied = async() => {
        try {
            const response = await axiosPrivate.get(`company/api/stat/job-applied/${job?.id}`);
            if(response?.status == 200){
                console.log(response);
                let labels = [];
                let data = [];
                response?.data.data.forEach(element => {
                    labels.push(FormatDate.fFullDate(element?.date));
                    data.push(element?.counter);
                });

                setStats({
                    labels: labels, 
                    datasets: [{
                        label: 'Number Of Users Apply For The Job',
                        data: data,
                        backgroundColor: `rgba(` + 
                                            Math.floor(Math.random() * 255) + `,` + 
                                            Math.floor(Math.random() * 255) + `,` + 
                                            Math.floor(Math.random() * 255) + `, 0.7)`,
                        borderColor: 'rgba(200, 200, 200, 0.75)',
                        hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        borderWidth: 1,
                    }]
                });
            }
        } catch(err) {
            toast.error('Can not get stat for the current Job!');
        }
    }

    useEffect(() => {
        getJob();

        return() => {
            setKeyword('');
            setLoading(true);
            setError('');
            setJob({});
            setJobs({});
            setStats({});
        }
    }, []);

    useEffect(() => {
        statNumberCandidatesApplied()
    },[job])

    return (
        <>
            <ComapnySidebar jobsManagementActive={true} />
            <div className='hero dashboard__hero'></div>
            <div className='with-sidebar-container jobs-management'>
                <div className='mb-4 dashboard-header'>
                    <div className='title'>
                        <h4 className="m-0 py-2 h1">Company's Jobs Management</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/company/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Jobs Management</BreadcrumbItem>
                        </Breadcrumb>
                        <Link to='/company/add-job' className='btn btn-info text-light'><b>+ Create new</b></Link>
                        <div className='text-light text-center d-flex'>
                            <p className='m-0'>{jobs?.count}</p><span>Jobs</span>
                        </div>
                    </div>
                    {loading && (
                        <div className="text-center element--center" id="error-message">
                            <Spinner animation="border" variant='info'/>
                            <p className="h3 mt-2">Something is stuck. Please wait while we clearing the way!</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="text-center element--center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">{error}</p>
                        </div>
                    )}

                    {!loading && !error && !jobs?.data && (
                        <div className="text-center element--center" id="error-message">
                            <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                            <p className="h3 mt-2 text-danger">There's something wrong. Please reload the page or return to the previous page!</p>
                        </div>
                    )}

                    {!loading && !error && jobs?.data.length && (
                        <>
                            <div className="bg-light mt-3 table-custom box-shadow-1 rounded clickable-table">
                                {jobs?.data.length && <MaterialTable data={jobs?.data} columns={JobColumns} title='Jobs'
                                    options={{
                                        minBodyHeight: '23rem',
                                        pageSizeOptions: [],
                                        pageSize: 5,
                                        rowStyle: {
                                        },
                                        headerStyle: {
                                            backgroundColor: '#525252',
                                            color: '#fff',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    onRowClick={handleRowClick}
                                />}
                            </div>
                            <div className="mt-4 jobs-detail__content">
                                <Row>
                                    {job && (
                                    <Col className='p-0'>
                                        <div className='jobs-management__inner box-shadow-1 p-3'>
                                            <div className='pb-4 border-bottom jobs-management__detail '>
                                                <div className='jobs-management__detail-title mb-2'>
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
                                        {stats?.datasets && (<BarChart data={stats} width='100%' height='42%'/>)}
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