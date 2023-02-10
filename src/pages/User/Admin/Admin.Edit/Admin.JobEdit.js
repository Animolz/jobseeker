import React, {useEffect, useMemo, useState} from 'react';
import { Row, Col, Spinner, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { motion } from 'framer-motion';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import useAuth from 'hooks/useAuth';

import 'assets/global.scss'

import AuthService from 'services/AuthService';
import { PersonalInfoEdit } from 'components/common/User/PersonalInfoEdit';
import AvatarInit from 'utils/AvatarInit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CompanyInfoEdit1 } from 'components/common/User/CompanyEditProfile/CompanyInfoEdit1';
import { CompanyInfoEdit2 } from 'components/common/User/CompanyEditProfile/CompanyInfoEdit2';
import { toast } from 'react-toastify';
import { AdminSidebar } from '../Admin.Sidebar';
import { CompanyJobEdit1 } from 'components/common/User/CompanyEditProfile/CompanyJobEdit1';
import { CompanyJobEdit2 } from 'components/common/User/CompanyEditProfile/CompanyJobEdit2';
import { CompanyJobEdit3 } from 'components/common/User/CompanyEditProfile/CompanyJobEdit3';
import axios from 'axios';
  

const JobEdit = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [axiosLoading, setAxiosLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [error, setError] = useState('');
    const [job, setJob] = useState({
        id: 0,
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
        <CompanyJobEdit1 data={job} setData={setJob} />,
        <CompanyJobEdit2 data={job} setData={setJob} data1={data1} />,
        <CompanyJobEdit3 data={job} setData={setJob} />
    ]

    const handleSubmit = async(e) => {
        e.preventDefault();
        let updatedJob = {};
        
        updatedJob.id = job?.id;
        updatedJob.title = job?.title;
        updatedJob.description = job?.description;
        updatedJob.address = job?.address;
        updatedJob.jobStartDate = new Date(job?.jobStartDate).getTime();
        updatedJob.provinceId = job?.provinceId;
        updatedJob.noOfVacancies = job?.noOfVacancies;
        updatedJob.positionId = job?.positionId;
        updatedJob.jobCategoryId = job?.jobCategoryId;
        updatedJob.jobTypeId = job?.jobTypeId;
        updatedJob.salary = job?.salary;
        updatedJob.tagsId = [];
        updatedJob.requirements = job?.requirements.map((i) => {
            return ({
                content: i?.content,
            });
        });

        if(!!updatedJob){
            try {
                setAxiosLoading(true);
                const response = await axiosPrivate.put(`admin/api/job/update`, updatedJob);
                console.log(response);
                if(response.status == 200) {
                    toast.success('Update Job Successfully!');
                    navigate(-1, { replace: true });
                }
            } catch(err) {
                console.log(err);
                toast.error('Update Job Failed! Please check your job info again');
            } finally {
                setAxiosLoading(false);
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

    const getJob = async() => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get(`admin/api/job/${id}`)
            console.log(response);
            if(response.status == 200) {
                setJob({
                    id : response?.data.data.id ,
                    title : response?.data.data.title ? response?.data.data.title : '',
                    description : response?.data.data.description ? response?.data.data.description : '',
                    address : response?.data.data.address ? response?.data.data.address : '',
                    jobStartDate : response?.data.data.jobStartDate ,
                    provinceId : response?.data.data.province.id ,
                    noOfVacancies : response?.data.data.noOfVacancies ,
                    positionId : response?.data.data.position.id ,
                    jobCategoryId : response?.data.data.jobCategory.id ,
                    jobTypeId : response?.data.data.jobType.id ,
                    salary : response?.data.data.salary ? response?.data.data.salary : '',
                    requirements : response?.data.data.requirements ,
                });
            }
        } catch(err) {
            console.log(err);
        } 
    }

    useEffect(() => {
        getJob();
        fetchData();

        return() => {
            setLoading(true);
            setError('');
            setPage(0);
            setJob({});
            setData1({});
        } 
    }, []);

    return (
        <div className='company-edit-profile'>
            <AdminSidebar jobManagementActive={true} />
            <div className='hero dashboard__hero' id='admin-hero'></div>
            <div className="admin-users-management with-sidebar-container">
                <div className='mb-4 dashboard-header admin__header' id='job-detail-management-content'>
                    <div className='title'>
                    <h4 className="m-0 py-2 h1">Admin's Job Edit</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/admin/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/admin/jobs-management'>Jobs Management</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Job Edit</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className='company-edit-profile__container'>
                    {axiosLoading && 
                        <div className='otp-send__loading d-flex justify-content-center align-items-center'>
                            <Spinner animation="border" variant="primary" className="" />
                        </div>
                    }
                    <div>
                        <Row className='p-0 m-0 h-100'>
                            <Col xs={4} className='p-5 my-4 company-edit-profile__avatar-selector'>
                                <div className='text-left text-secondary h6'><b>Edit Job Progress</b></div>
                                <div className='multistep-progress-bar__container p-0 mb-5'>
                                    <motion.div initial={{ width: 0 }} className='multistep-progress-bar__bar' style={{ backgroundColor:'#5b51d1' }}
                                        animate={ page === 0 ? { width: '33.3%' } 
                                                    : page === 1 ? { width: '66.6%' } 
                                                    : { width: '100%' } }>
                                    </motion.div>
                                </div>
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

                                {!loading && !error && !!job && (
                                    <form onSubmit={handleSubmit}>{multiStepEdit[page]}</form>
                                )} 
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div className='company-edit-profile__hero-footer' id='admin-hero'></div>
        </div>
    );
}

export default JobEdit