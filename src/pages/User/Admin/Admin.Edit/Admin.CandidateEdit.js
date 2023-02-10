import React, {useEffect, useMemo, useState} from 'react';
import { Row, Col, Spinner, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { motion } from 'framer-motion';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

import 'assets/global.scss'

import { PersonalInfoEdit } from 'components/common/User/PersonalInfoEdit';
import AvatarInit from 'utils/AvatarInit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModalView from 'components/Modal/ModalView';
import { AdminSidebar } from '../Admin.Sidebar';
import { CandidateInfoEdit1 } from 'components/common/User/CandidateEditProfile/CandidateInfoEdit1';
import { CandidateInfoEdit2 } from 'components/common/User/CandidateEditProfile/CandidateInfoEdit2';
import { CandidateInfoEdit3 } from 'components/common/User/CandidateEditProfile/CandidateInfoEdit3';
  

const CandidateEdit = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [candidate, setCandidate] = useState();
    const [loading, setLoading] = useState(true);
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
    const [candidateInfo, setCandidateInfo] = useState({
        yearsExp: 0,
        cv: '',
        workExperienceRequests: [],
        languageRequests: [],
        qualificationRequests: [],
        skillRequests: [],
        talentRequests: [],
    });
    const [avatar, setAvatar] = useState();

    const multiStepEdit = [
        <PersonalInfoEdit data={personalInfo} setData={setPersonalInfo} />, 
        <CandidateInfoEdit1 data={candidateInfo} setData={setCandidateInfo} />,
        <CandidateInfoEdit2 data={candidateInfo} setData={setCandidateInfo} />,
        <CandidateInfoEdit3 data={candidateInfo} setData={setCandidateInfo} />
    ]


    const handleSubmit = async(e) => {
        e.preventDefault();

        if(personalInfo?.gender === 'false'){
            setPersonalInfo({ ...personalInfo, gender: false });
        } else {
            setPersonalInfo({ ...personalInfo, gender: true });
        }

        if(!!candidateInfo && !!personalInfo){
            let candidateData = {};
            candidateData.yearsExp = candidateInfo?.yearsExp;
            candidateData.languageRequests = candidateInfo?.languageRequests.map(i => {
                return ({
                    name: i?.value,
                    description: '',
                });
            });
            candidateData.qualificationRequests = candidateInfo?.qualificationRequests.map(i => {
                return ({
                    name: i?.value
                });
            })
            candidateData.talentRequests = candidateInfo?.talentRequests.map(i => {
                return ({
                    content: i?.value
                });
            })
            candidateData.workExperienceRequests = candidateInfo?.workExperienceRequests.map(i => {
                return ({
                    content: i?.content,
                    position: i?.position,
                    fromDate: new Date(i?.fromDate).getTime(),
                    toDate: new Date(i?.toDate).getTime(),
                });
            });
            candidateData.skillRequests = candidateInfo?.skillRequests.map(i => {
                return ({
                    name: i?.name,
                    level: i?.level,
                });
            })

            try {
                const response = await axiosPrivate.put(`admin/api/candidate/update-candidate-info/${id}`, candidateData);
                const response2 = await axiosPrivate.put(`admin/api/user/update-user-info/${id}`, personalInfo);
                console.log(response);
                console.log(response2);
                if(response.status == 200 && response2.status == 200){
                    toast.success('Update User Successfully!');
                    navigate(-1, { replace: true })
                }
            } catch (err) {
                console.log(err);
                toast.error('Fail to update User! Please check the info that you enter again.');
            }
        }
    }

    const onAvatarSubmit = async(e) => {
        e.preventDefault();
        let formData = new FormData();

        if(!!avatar) {
            formData.append('file', avatar);

            try {
                const response = await axiosPrivate.put(`/admin/api/user/update-user-avatar/${id}`, formData, { headers : { 'Content-Type' : 'multipart/form-data' }});
                console.log(response);
                if(response.status == 200){
                    toast.success('Update Avatar Successfully! Please login to see the changes.');
                    navigate(-1, { replace: true });
                }
            } catch(err) {
                console.log(err);
                toast.error('Updated Avatar Failed!');
            }
        }
    }

    const getUserData = async() => {
        setLoading(true);
        try{
            const response = await axiosPrivate.get(`/admin/api/user/${id}`);
            console.log(response)
            if(response?.status == 200) {
                setCandidate(response?.data.data);
                setPersonalInfo({
                    fullName: response?.data.data.fullName ? response?.data.data.fullName : '',
                    email: response?.data.data.email ? response?.data.data.email : '',
                    phone: response?.data.data.phone ? response?.data.data.phone : '',
                    dob: response?.data.data.dob,
                    gender: `${response?.data.data.gender}`,
                    address: response?.data.data.address ? response?.data.data.address : ''
                });
                setCandidateInfo({
                    yearsExp: response?.data.data.candidate.yearsExp,
                    cv: '',
                    workExperienceRequests: response?.data.data.candidate.workExperiences,
                    languageRequests: response?.data.data.candidate.languages.map(i => {return {
                        label: i?.name,
                        value: i?.name,
                    }}),
                    qualificationRequests: response?.data.data.candidate.qualifications.map(i => {return {
                        label: i?.name,
                        value: i?.name,
                        __isNew__: true,
                    }}),
                    skillRequests: response?.data.data.candidate.skills,
                    talentRequests: response?.data.data.candidate.talents.map(i => {return {
                        label: i?.content,
                        value: i?.content,
                        __isNew__: true,
                    }}),
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
            setCandidate({})
            setPersonalInfo({});
            setPage(0);
            setCandidateInfo({});
            setLoading(true);
            setError('');
        }
    },[]);

    return (
        <div className='company-edit-profile'>
            <AdminSidebar candidateManagementActive={true} />
            <div className='hero dashboard__hero' id='admin-hero'></div>
            <div className="admin-users-management with-sidebar-container">
                <div className='mb-4 dashboard-header admin__header' id='job-detail-management-content'>
                    <div className='title'>
                    <h4 className="m-0 py-2 h1">Admin's Candidate Edit</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/admin/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/admin/candidates-management'>Candidates Management</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Candidate Edit</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className='company-edit-profile__container'>
                    <div>
                        <Row className='p-0 m-0 h-100'>
                            <Col xs={4} className='p-5 my-4 company-edit-profile__avatar-selector'>
                                <div className='text-left text-secondary h6'><b>Edit Candidate Progress</b></div>
                                <div className='multistep-progress-bar__container p-0 mb-5'>
                                    <motion.div initial={{ width: 0 }} className='multistep-progress-bar__bar' style={{ backgroundColor:'#5b51d1' }}
                                        animate={ page === 0 ? { width: '25%' } 
                                                    : page === 1 ? { width: '50%' } 
                                                    : page === 2 ? { width: '75%' } 
                                                    : { width: '100%' } 
                                                }>
                                    </motion.div>
                                </div>
                                <AvatarInit avatar={candidate?.avatar} name={candidate?.username} size={300} round={true} border={'border'}/>
                                <div className='mt-3'></div>
                                <ModalView title='Change Avatar' variant='outline-secondary' size='sm' btnValue='Change Avatar' content={
                                <>
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
                                    <button onClick={() => setPage(page - 1)} className='btn btn-info text-light' disabled={page === 0} id='edit-profile__prev-btn'><b>Previous</b></button>
                                    <button onClick={() => setPage(page + 1)} className='btn btn-info text-light' disabled={page === multiStepEdit.length - 1} id='edit-profile__next-btn'><b>Next</b></button>
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

                                {!loading && !error && !!candidate?.username  && (
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

export default CandidateEdit