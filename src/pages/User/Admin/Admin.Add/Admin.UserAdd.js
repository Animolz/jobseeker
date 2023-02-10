import React, {useEffect, useMemo, useState} from 'react';
import { Row, Col, Spinner, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import useAxiosPrivate from 'hooks/useAxiosPrivate';

import 'assets/global.scss'

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AdminSidebar } from '../Admin.Sidebar';
import Textbox from 'components/form/Textbox';
import RadioButton from 'components/form/RadioButton';
import Text from 'components/form/Text';
  

const UserAdd = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [personalInfo, setPersonalInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });


    const handleSubmit = async(e) => {
        e.preventDefault();
        let data = {}

        if(!!personalInfo){
            data.username = personalInfo?.username;
            data.password = personalInfo?.password;
            data.email = personalInfo?.email;
            data.role = personalInfo?.role;

            try {
                const response = await axiosPrivate.post(`admin/api/user/add/user-info`, data);
                console.log(response);
                if(response.status == 200) {
                    toast.success('Update User Successfully!');
                    if(personalInfo?.role === 'CANDIDATE'){
                        navigate('/admin/candidates-management', { replace: true })
                    }
                    if(personalInfo?.role === 'COMPANY'){
                        navigate('/admin/companies-management', { replace: true })
                    }
                }
            } catch (err) {
                console.log(err);
                toast.error('Fail to update User! Please check the info that you enter again.');
                setPersonalInfo({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    role: '',
                });
            }
        }
    }

    useEffect(() => {
        return() => {
            setPersonalInfo({});
            setLoading(true);
            setError('');
        }
    },[]);

    return (
        <div className='company-edit-profile'>
            <AdminSidebar companyManagementActive={true} />
            <div className='hero dashboard__hero' id='admin-hero'></div>
            <div className="admin-users-management with-sidebar-container">
                <div className='mb-4 dashboard-header admin__header' id='job-detail-management-content'>
                    <div className='title'>
                    <h4 className="m-0 py-2 h1">Admin's Company Edit</h4>
                        <Breadcrumb className='ml-2'>
                            <BreadcrumbItem><Link to='/admin/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={-1}>User Management</Link></BreadcrumbItem>
                            <BreadcrumbItem active>User Adding New</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className='company-edit-profile__container'>
                    <div>
                        <div className='p-5 m-0 h-100'>
                            <form onSubmit={handleSubmit}>
                                <h1><b>Adding New User</b></h1>
                                <Textbox 
                                    id='username' 
                                    type='text'
                                    name='username' 
                                    placeholder='Enter your Username' 
                                    error='Username should be 5-15 characters minimum and not contain special character!'
                                    label='Username' 
                                    pattern='^[A-Za-z0-9]{5,15}$'
                                    value={personalInfo?.username}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, username: e.target.value })}
                                    required
                                />
                                <Textbox 
                                    id='email' 
                                    type='email'
                                    name='email' 
                                    placeholder='Enter your Email' 
                                    error='Email should be valid!'
                                    label='Email' 
                                    value={personalInfo?.email}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                    required
                                />
                                <Textbox 
                                    id='password' 
                                    type='password'
                                    name='password' 
                                    placeholder='Enter your Password' 
                                    error='Password should be 5-15 characters and include at least 1 capitalize letter and 1 number!'
                                    label='Password' 
                                    pattern='^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{5,15}$'
                                    value={personalInfo?.password}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, password: e.target.value })}
                                    required
                                />
                                <Textbox 
                                    id='confirmPassword' 
                                    type='password'
                                    name='confirmPassword' 
                                    placeholder='Enter your Password again' 
                                    error='Password does not match'
                                    label='Confirm Password' 
                                    pattern={personalInfo?.password}
                                    value={personalInfo?.confirmPassword}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, confirmPassword: e.target.value })}
                                    required
                                />
                                <div className='mb-2'><b>Are you looking for a job or looking for employees ?</b></div>
                                <div className='d-flex'>
                                    <RadioButton id='candidate' name='candidate' label='Candidate' value='CANDIDATE' isSelected={personalInfo?.role === 'CANDIDATE'} onChange={(e) => setPersonalInfo({ ...personalInfo, role: e.target.value })} />
                                    <RadioButton id='company' name='company' label='Company' value='COMPANY' isSelected={personalInfo?.role === 'COMPANY'} onChange={(e) => setPersonalInfo({ ...personalInfo, role: e.target.value })} />
                                </div>
                                <button className='btn btn-success w-25 h-25'><b>Add</b></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='company-edit-profile__hero-footer' id='admin-hero'></div>
        </div>
    );
}

export default UserAdd