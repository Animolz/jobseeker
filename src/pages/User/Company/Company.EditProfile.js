import React, {useEffect, useMemo, useState} from 'react';
import { Row, Col, Spinner, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { motion } from 'framer-motion';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import useAuth from 'hooks/useAuth';

import './css/EditProfileCompany.scss'
import 'assets/global.scss'

import AuthService from 'services/AuthService';
import { PersonalInfoEdit } from 'components/common/User/PersonalInfoEdit';
import AvatarInit from 'utils/AvatarInit';
import { ComapnySidebar } from './Company.Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { CompanyInfoEdit1 } from 'components/common/User/CompanyEditProfile/CompanyInfoEdit1';
import { CompanyInfoEdit2 } from 'components/common/User/CompanyEditProfile/CompanyInfoEdit2';
import { toast } from 'react-toastify';
import ModalView from 'components/Modal/ModalView';
  

const EditProfile = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [axiosLoading, setAxiosLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [error, setError] = useState('');
    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        address: '',
    });
    const [companyInfo, setCompanyInfo] = useState({
        companyName: '',
        companySize: 0,
        contactTel: '',
        contactEmail: '',
        contactAddress: '',
        introduction: '',
        foundedYear: null,
        headquarters: '',
        link: '',
        industryId: [],
    });
    const [avatar, setAvatar] = useState();

    const multiStepEdit = [
        <PersonalInfoEdit data={personalInfo} setData={setPersonalInfo} />, 
        <CompanyInfoEdit1 data={companyInfo} setData={setCompanyInfo} />,
        <CompanyInfoEdit2 data={companyInfo} setData={setCompanyInfo} /> 
    ]

    const nextPage = () => {
        setPage(page + 1);
    }

    const prevPage = () => {
        setPage(page - 1)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log(personalInfo);
        console.log(companyInfo);

        if(!!personalInfo && !!companyInfo){
            let companyData = {};
            let industriesArray = new Array();
            companyData.companyName = companyInfo?.companyName;
            companyData.companySize = companyInfo?.companySize;
            companyData.contactTel = companyInfo?.contactTel;
            companyData.contactEmail = companyInfo?.contactEmail;
            companyData.contactAddress = companyInfo?.contactAddress;
            companyData.introduction = companyInfo?.introduction;
            companyData.foundedYear = new Date(companyInfo?.foundedYear).getFullYear();
            companyData.headquarters = companyInfo?.headquarters;
            companyData.link = companyInfo?.link;
            companyInfo?.industryId.forEach(i => industriesArray.push(i?.id));
            companyData.industryId = industriesArray;
            console.log(companyData)

            try {
                setAxiosLoading(true);
                const response = await axiosPrivate.put(`company/api`, { ...companyData });
                const response2 = await axiosPrivate.put(`authed/api/user/update-profile-info`, personalInfo);
                console.log(response);
                console.log(response2);
                if(response.status == 200 && response2.status == 200){
                    toast.success('Update User Successfully!');
                    navigate('/company/home', { replace: true })
                }
            } catch (err) {
                console.log(err);
                toast.error('Fail to update User! Please check the info that you enter again.');
            } finally {
                setAxiosLoading(false);
            }
        }
    }

    const onAvatarSubmit = async(e) => {
        e.preventDefault();
        let formData = new FormData();

        if(!!avatar) {
            formData.append('file', avatar);

            try {
                setAxiosLoading(true);
                const response = await axiosPrivate.put(`authed/api/user/update-user-avatar`, formData, { headers : { 'Content-Type' : 'multipart/form-data' }});
                console.log(response);
                if(response.status == 200){
                    setAuth({});    
                    toast.success('Update Avatar Successfully! Please login to see the changes.');
                    navigate('/login', { replace: true });
                }
            } catch(err) {
                console.log(err);
                toast.error('Updated Avatar Failed!');
            } finally {
                setAxiosLoading(false);
            }
        }
    }

    const getUserData = async() => {
        setLoading(true);
        try{
            const response = await axiosPrivate.get(`auth/current-user`);
            console.log(response)
            if(response?.status == 200) {
                setPersonalInfo({
                    fullName: response?.data.data.fullName ? response?.data.data.fullName : '',
                    email: response?.data.data.email ? response?.data.data.email : '',
                    phone: response?.data.data.phone ? response?.data.data.phone : '',
                    dob: response?.data.data.dob,
                    gender: `${response?.data.data.gender}`,
                    address: response?.data.data.address ? response?.data.data.address : ''
                });
                setCompanyInfo({
                    companyName: response?.data.data.company.companyName ? response?.data.data.company.companyName : '',
                    companySize: response?.data.data.company.companySize,
                    contactEmail: response?.data.data.company.contactEmail ? response?.data.data.company.contactEmail : '',
                    contactTel: response?.data.data.company.contactTel ? response?.data.data.company.contactTel : '',
                    contactAddress: response?.data.data.company.contactAddress ? response?.data.data.company.contactAddress : '',
                    foundedYear: new Date(response?.data.data.company.foundedYear),
                    headquarters: response?.data.data.company.headquarters ? response?.data.data.company.headquarters : '',
                    introduction: response?.data.data.company.introduction ? response?.data.data.company.introduction : '',
                    link: response?.data.data.company.link ? response?.data.data.company.link : '',
                    industryId: response?.data.data.company.industries.map(i => {
                        return ({
                            id: i?.id,
                            value: i?.name,
                            label: i?.name
                        });
                    })
                });
            }
        } catch(err){
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserData();

        return() => {
            setPersonalInfo({});
            setPage(0);
            setCompanyInfo({});
            setLoading(true);
            setError('');
        }
    },[]);

    return (
        <div className='company-edit-profile'>
            <ComapnySidebar />
            <div className='hero dashboard__hero'></div>
            <div className='with-sidebar-container'>
                <div className='mb-4 dashboard-header'>
                    <div className='title'>
                        <h4 className="m-0 py-2 h1">Company's Edit Profile</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/company/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/company/jobs-management'>Jobs Management</Link></BreadcrumbItem>
                            <BreadcrumbItem active>New Job</BreadcrumbItem>
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
                                <div className='text-left text-secondary h6'><b>Edit Profile Progress</b></div>
                                <div className='multistep-progress-bar__container p-0 mb-5'>
                                    <motion.div initial={{ width: 0 }} className='multistep-progress-bar__bar' style={{ backgroundColor:'#5b51d1' }}
                                        animate={ page === 0 ? { width: '33.3%' } 
                                                    : page === 1 ? { width: '66.6%' } 
                                                    : { width: '100%' } }>
                                    </motion.div>
                                </div>
                                <AvatarInit avatar={auth?.avatar} name={auth?.username} size={300} round={true} border={'border'}/>
                                <div className='mt-3'></div>
                                <ModalView title='Change Avatar' variant='outline-secondary' size='sm' btnValue='Change Avatar' content={
                                <>
                                    {axiosLoading && 
                                        <div className='otp-send__loading d-flex justify-content-center align-items-center'>
                                            <Spinner animation="border" variant="primary" className="" />
                                        </div>
                                    }
                                    <div className="text-center">
                                        {avatar && (
                                            <div>
                                                <img alt="not fount" width={"150px"} height={'auto'} src={URL.createObjectURL(avatar)} className='mb-3 border rounded' />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id='file'
                                            name="myImage"
                                            onChange={(event) => {
                                                setAvatar(event.target.files[0]);
                                            }}
                                        />
                                        <label for="file">Choose A File</label>
                                        <button className='btn btn-success d-block w-100' onClick={onAvatarSubmit}><b>Submit</b></button>
                                    </div>
                                </>
                            } />
                                <div className='company-edit-profile__action d-flex justify-content-around mt-3'>
                                    <button onClick={prevPage} className='btn btn-info text-light' disabled={page === 0} id='edit-profile__prev-btn'><b>Previous</b></button>
                                    <button onClick={nextPage} className='btn btn-info text-light' disabled={page === multiStepEdit.length - 1} id='edit-profile__next-btn'><b>Next</b></button>
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

                                {!loading && !error && !!auth?.username  && (
                                    <form onSubmit={handleSubmit}>{multiStepEdit[page]}</form>
                                )} 
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div className='company-edit-profile__hero-footer'></div>
        </div>
    );
}

export default EditProfile