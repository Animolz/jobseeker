import React, { useEffect, useMemo, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Col, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { ComapnySidebar } from "./Company.Sidebar";
import { motion } from "framer-motion";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";
import AvatarInit from "utils/AvatarInit";
import { CompanyJobEdit1 } from "components/common/User/CompanyEditProfile/CompanyJobEdit1";
import { CompanyJobEdit2 } from "components/common/User/CompanyEditProfile/CompanyJobEdit2";
import { CompanyJobEdit3 } from "components/common/User/CompanyEditProfile/CompanyJobEdit3";
import axios from "axios";
import { toast } from "react-toastify";

const JobAddCompany = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [error, setError] = useState('');
    const [newJob, setNewJob] = useState({
        title: '',
        description: '',
        address: '',
        jobStartDate: 0,
        provinceId: 0,
        noOfVacancies: 0,
        positionId: 0,
        jobCategoryId: 0,
        jobTypeId: 0,
        salary: 0,
        requirements: [],
    });
    const [data1, setData1] = useState({
        cates: [],
        position: [],
        province: [],
        type: [],
    });

    const multiStepEdit = [
        <CompanyJobEdit1 data={newJob} setData={setNewJob} />,
        <CompanyJobEdit2 data={newJob} setData={setNewJob} data1={data1} />,
        <CompanyJobEdit3 data={newJob} setData={setNewJob} />
    ]

    const handleSubmit = async(e) => {
        e.preventDefault();
        let newJobData = {};
        
        newJobData.title = newJob?.title;
        newJobData.description = newJob?.description;
        newJobData.address = newJob?.address;
        newJobData.jobStartDate = new Date(newJob?.jobStartDate).getTime();
        newJobData.provinceId = newJob?.provinceId;
        newJobData.noOfVacancies = newJob?.noOfVacancies;
        newJobData.positionId = newJob?.positionId;
        newJobData.jobCategoryId = newJob?.jobCategoryId;
        newJobData.jobTypeId = newJob?.jobTypeId;
        newJobData.salary = newJob?.salary;
        newJobData.requirements = newJob?.requirements.map((i) => {
            return ({
                content: i?.content,
            });
        });

        if(!!newJobData){
            try {
                const response = await axiosPrivate.post(`company/api/job/insert`, { ...newJobData });
                console.log(response);
                if(response.status == 200) {
                    toast.success('Add job successfully!');
                    navigate('/company/jobs-management', { replace: true });
                }
            } catch(err) {
                console.log(err);
                toast.error('Add job Failed! Please check your job info again');
                setNewJob({
                    title: '',
                    description: '',
                    address: '',
                    jobStartDate: 0,
                    provinceId: 0,
                    noOfVacancies: 0,
                    positionId: 0,
                    jobCategoryId: 0,
                    jobTypeId: 0,
                    salary: 0,
                    requirements: [],
                });
                setPage(0);
            }
        }
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
                    setData1({
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
        fetchData();

        return() => {
            setLoading(true);
            setError('');
            setPage(0);
            setNewJob({});
            setData1({});
        } 
    }, []);

    return (
        <>
            <ComapnySidebar />
            <div className='hero dashboard__hero'></div>
            <div className='with-sidebar-container'>
                <div className='mb-4 dashboard-header'>
                    <div className='title'>
                        <h4 className="m-0 py-2 h1">Adding new Job</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/company/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/company/job-add'>Add new job</Link></BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className='company-edit-profile__container'>
                    <div>
                        <Row className='p-0 m-0 h-100'>
                            <Col xs={4} className='p-5 my-4 company-edit-profile__avatar-selector'>
                                <div className='text-left text-secondary h6'><b>Add New Job Progress</b></div>
                                <div className='multistep-progress-bar__container p-0 mb-3'>
                                    <motion.div initial={{ width: 0 }} className='multistep-progress-bar__bar' style={{ backgroundColor:'#5b51d1' }}
                                        animate={ page === 0 ? { width: '33.3%' } 
                                                    : page === 1 ? { width: '66.6%' } 
                                                    : { width: '100%' } }>
                                    </motion.div>
                                </div>
                                <div className='text-danger align-self-left mb-2'><b>PLEASE FILL ALL THE INFORMATION!</b></div>
                                <AvatarInit avatar={auth?.avatar} name={auth?.username} size={300} round={true} border={'border'}/>
                                <div className='company-edit-profile__action d-flex justify-content-around mt-5'>
                                    <button onClick={() => setPage(page - 1)} className='btn btn-info text-light' disabled={page === 0} id='edit-job__prev-btn'><b>Previous</b></button>
                                    <button onClick={() => setPage(page + 1)} className='btn btn-info text-light' disabled={page === multiStepEdit.length - 1} id='edit-job__next-btn'><b>Next</b></button>
                                </div>
                            </Col>
                            <Col xs={8} className='p-4 company-edit-profile__inputs'>
                                {loading && (<>
                                    <div className="text-center m-5">
                                        <Spinner animation="border" variant='info'/>
                                        <p className="h4 mt-2">Loading yourself onto the page!</p>
                                    </div></>
                                )}
                
                                {!loading && error && (
                                    <div className="text-center m-5">
                                        <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                                        <p className="h3 mt-2 text-danger">{error}</p>
                                    </div>
                                )}

                                {!loading && !error && !!auth && (
                                    <form onSubmit={handleSubmit}>{multiStepEdit[page]}</form>
                                )} 
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div className='company-edit-profile__hero-footer'></div>
        </>
    );
}

export default JobAddCompany