import React, { useEffect, useState } from "react";
import { MenuItem } from "react-pro-sidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Container, Row, Spinner } from "react-bootstrap";
import Moment from "react-moment";
import { toast } from 'react-toastify'
import { motion } from "framer-motion";
import useAxiosPrivate from "hooks/useAxiosPrivate";

import './css/JobDetailManagement.scss'
import 'tippy.js/dist/tippy.css';
import facebook from 'assets/facebook-icon.svg'
import zalo from 'assets/zalo-icon.svg'
import instagram from 'assets/instagram-icon.svg'

import ModalView from "../../../components/Modal/ModalView";
import JobTitle from "../../../components/common/Job/JobTitle";
import JobBrief from "../../../components/common/Job/JobBrief";
import JobDescription from "../../../components/common/Job/JobDescription";
import AvatarInit from "utils/AvatarInit";
import { NoValue } from "components/common/NoValue";

import { CandidateColumns } from "../../../data/Column/Company.CandidateColumn";
import MaterialTable from "material-table";
import { ComapnySidebar } from "./Company.Sidebar";
import Tippy from "@tippyjs/react";

const JobDetailManagement = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
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
    const [pagination, setPagination] = useState(0);

    const approve = async() => {
        if(window.confirm('Do you wanna approve this candidate ?') == true){
            try {
                const response = await axiosPrivate.put(`company/api/apply-job/approve/${candidate?.id}`)
                console.log(response);
                if(response.status == 200){
                    getCandidates();
                    toast.success('Approve Successfully!');
                }
            } catch(err) {
                console.log(err);
                toast.error('Approve Failed!');
            }
        }
    }

    const decline = async() => {
        if(window.confirm('Do you wanna decline this candidate ?') == true){
            try {
                const response = await axiosPrivate.put(`company/api/apply-job/block/${candidate?.id}`)
                console.log(response);
                if(response.status == 200){
                    getCandidates();
                    toast.success('Decline Successfully!');
                }
            } catch(err) {
                console.log(err);
                toast.error('Decline Failed!');
            }
        }
    }

    const handleRowClick = (e, rowData) => {
        setCandidate(rowData);
    } 

    const deleteJob = async(e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete(`company/api/job/delete/${job?.data.id}`);
            console.log(response);
            if(response.status == 200) {
                toast.success('Delete Job Successfully!');
                navigate(-1, { replace: true });
            }
        } catch(err) {
            console.log(err);
            toast.error('Delete Job Failed!');
        }
    }

    const paginationClick = (e) => {
        if(e.currentTarget.id == 0) {
            setPagination(1);
        }
        if(e.currentTarget.id == 1) {
            setPagination(0);
        }
    }

    const UserContact = () => {
        return (
            <motion.div initial={{ y: -50, opacity:0 }} animate={{ y: 0, opacity: 1}} className='h-100' >
                <button id={0} onClick={paginationClick} className="bg-info border-0 company-user-detail__step-button">
                    <i class="fa-solid fa-caret-right fa-2x text-light"></i>
                </button>
                <div className='d-flex ml-4 position-relative'>
                    <AvatarInit avatar={candidate?.candidateUser.avatar} name={candidate?.candidateUser.fullName} size={150} round={true} border='border'/>
                    <div className='mt-2 company-user-detail__content'>
                        <p className='company-user-detail__content-title mb-1'>{candidate?.candidateUser.fullName}</p>
                        <div className='company-user-detail__content-skills'>
                            {candidate?.candidateUser.candidate.skills.length
                                ? candidate?.candidateUser.candidate.skills?.map(skill => <span className="">{skill?.name}</span>)
                                : <span className="">Candidate does not have any skills</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="w-100 mt-3 px-4 py-3 w-100"><a href={candidate?.candidateUser.candidate.cv} target="_blank" className="btn btn-info w-100"><b>CV</b></a></div>
                <Row className='company-user-detail__contact'>
                    <Col xs={4} className="p-0 text-center px-2">
                        <div className="element--center text-center w-100">
                            <i class="fa-solid fa-house fa-2x text-light"></i>
                        </div>
                        <p><NoValue value={candidate?.candidateUser.address} /></p>
                    </Col>
                    <Col xs={4} className="p-0 text-center px-2">
                        <div className="element--center text-center w-100">
                            <i class="fa-solid fa-phone fa-2x text-light"></i>
                        </div>
                        <p><NoValue value={candidate?.candidateUser.phone} /></p>
                    </Col>
                    <Col xs={4} className="bg-danger p-0 text-center px-2">
                        <div className="element--center w-100">
                            <i class="fa-solid fa-envelope fa-2x text-light"></i>
                        </div>    
                        <p><NoValue value={candidate?.candidateUser.email} /></p>
                    </Col>
                </Row>
            </motion.div>  
        );
    }

    const UserSocialMedia = () => {
        return (
            <motion.div initial={{ y: -50, opacity:0 }} animate={{ y: 0, opacity: 1}} className='h-100' la>
                <button id={1} onClick={paginationClick} className="position-absolute bg-info border-0 company-user-detail__step-button">
                    <i class="fa-solid fa-caret-left fa-2x text-light"></i>
                </button>
                <div className='company-user-detail__social-hero'></div>
                <div className='d-flex pt-5 pr-3 position-relative justify-content-end'>
                    <div className='company-user-detail__social-inner'>
                        <p className='company-user-detail__social-title mb-1'>{candidate?.candidateUser.fullName}</p>
                    </div>
                    <AvatarInit avatar={candidate?.candidateUser.avatar} name={candidate?.candidateUser.fullName} size={50} round={true} border='border'/>
                </div>
                <div className='company-user-detail__about px-3'>
                    <i class="fa-solid fa-quote-left fa-2x w-100"></i>
                    <p className="mb-0 mx-4 text-secondary">Lorem ipsum dolor sit amet. Ad beatae fuga et eaque galisum in 
                        voluptatem enim ut dicta iure. Sed nihil magni ut assumenda 
                        nemo sit mollitia dolorem. Ut quasi sequi qui quia totam qui 
                        culpa voluptatum aut nisi maiores rem debitis nihil sit dolorum 
                        libero.
                    </p>
                    <i class="fa-solid fa-quote-right fa-2x w-100 text-right"></i>
                </div>
                <div className='company-user-detail__social-ref w-100'>
                    <div className='d-flex'><img src={facebook} className='text-light'/>
                        {!!candidate?.candidateUser.candidate.references[0] 
                            ? <a className="link--underline-none" href={candidate?.candidateUser.candidate.references[0].link} target='_blank'>{candidate?.candidateUser.candidate.references[0].link}</a>
                            : <a className="link--underline-none">Nothing to display.</a>
                        }
                    </div>
                    <div className='d-flex'><img src={instagram}/>
                        {!!candidate?.candidateUser.candidate.references[1] 
                            ? <a className="link--underline-none" href={candidate?.candidateUser.candidate.references[1].link} target='_blank'>{candidate?.candidateUser.candidate.references[1].link}</a>
                            : <a className="link--underline-none">Nothing to display.</a>
                        }
                    </div>
                    <div className='bg-danger d-flex'><img src={zalo}/>
                        {!!candidate?.candidateUser.candidate.references[2] 
                            ? <a className="link--underline-none" href={candidate?.candidateUser.candidate.references[2].link} target='_blank'>{candidate?.candidateUser.candidate.references[2].link}</a>
                            : <a className="link--underline-none">Nothing to display.</a>
                        }
                    </div>
                    <div className='bg-light'></div>
                </div>
            </motion.div>  
        );
    }

    const getJob = async() => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get(`company/api/job/${id}`);
            setJob({
                data: response.data.data,
                error: '',
            })
        } catch (err) {
            console.log(err)
            setJob({
                ...job,
                error: err.response.data.message,
            });
        } finally {
            setLoading(false);
        };
    }

    const getCandidates = async() => {
        setLoading();
        try {
            const response = await axiosPrivate.get(`company/api/apply-job/job/${id}`);
            console.log(response);
            if(response.status == 200){
                setCandidates({
                    count:response.data.data.length,
                    data:response.data.data,
                    error: '',
                });
                setCandidate(response?.data.data[0]);
            }
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
        getJob();
        getCandidates();

        return() => {
            setLoading(true);
            setCandidates({});
            setCandidate({});
            setJob({});
            setPagination(0);
        }
    }, []);   

    return (
        <>
            <ComapnySidebar jobsManagementActive={true} />
            <div className='hero dashboard__hero'></div>
            <div id='job-detail-management-container' className='with-sidebar-container'>
                <div className='mb-4 dashboard-header' id='job-detail-management-content'>
                    <div className='title'>
                        <h4 className="m-0 py-2 h1">Company's Job Detail Management</h4>
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
                            <div className="text-center element--center" id="error-message">
                                <Spinner animation="border" variant='info'/>
                                <p className="h3 mt-2">Waiting is the key to success</p>
                            </div>
                        )}

                        {!loading && job.error && (
                            <div className="text-center element--center" id="error-message">
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
                                        title={job?.data.companyUser.username}
                                        content={(
                                            <>
                                                <JobTitle job={job?.data} />
                                                <JobBrief job={job?.data} />
                                                <p className='time mt-2'><i className="fa-solid fa-clock text-primary"></i> Posted <Moment fromNow>{job?.data.datePublished}</Moment></p>
                                                <JobDescription job={job?.data} />
                                            </>
                                        )} 
                                    />
                                    <Link className='btn btn-primary' to={`/company/edit-job/${job?.data.id}`}><i className="fa-solid fa-pen mr-2 text-light"></i>Update</Link>
                                    <div className='mt-1 border-top'><button className='btn btn-danger' onClick={deleteJob}><i className="fa-solid fa-trash-can mr-2 text-light"></i>Delete</button></div>
                                </Col>
                            </Row>
                        )}
                    </div>
                    {!loading && !job.error && !candidates.error && (
                        <>
                            <Row className='mt-5'>
                                <Col xs={5} className='company-user-detail pl-0 pr-3'>
                                    {!!candidate && <>
                                        <div className='company-user-detail__container w-100 h-100 rounded box-shadow-1 rounded'>
                                            <div className='apply-job__action position-absolute '>
                                                <Tippy content='APPROVE' placement="bottom"><button className="btn btn-success mr-3" onClick={approve}><i class="fa-solid fa-check fa-2x"></i></button></Tippy>
                                                <Tippy content='BLOCKED' placement="bottom"><button className="btn btn-danger" onClick={decline}><i class="fa-solid fa-xmark fa-2x"></i></button></Tippy>
                                            </div>
                                            {pagination === 0
                                                ?  <UserContact />
                                                :  <UserSocialMedia />
                                            }
                                        </div>
                                    </>
                                    }
                                </Col>
                                <Col xs={7} className='rounded box-shadow-1 p-0 clickable-table'>
                                    {!!candidates?.data && 
                                        <MaterialTable data={candidates?.data} columns={CandidateColumns} title='Candidates'
                                        options={{
                                            minBodyHeight: '20rem',
                                            pageSizeOptions: [],
                                            pageSize: 3,
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
                                        />
                                    }
                                </Col>
                            </Row>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default JobDetailManagement