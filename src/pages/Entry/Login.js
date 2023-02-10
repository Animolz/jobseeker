import React, { useEffect, useRef, useState } from "react";
import './css/Entry.scss'
import BackgroundImg from '../../components/common/Background/BackgroundImg';
import Textbox from '../../components/form/Textbox';
import SubmitButton from '../../components/form/SubmitButton'
import Text from '../../components/form/Text'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { toast } from "react-toastify";
import useAuth from "hooks/useAuth";
import ModalView from "components/Modal/ModalView";
import { AxiosClient } from "api/AxiosClient";
import OtpInput from 'react-otp-input';
import { Spinner } from "react-bootstrap";

const Login = (props) => {
    const navigate = useNavigate()
    const { setAuth, persist, setPersist } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [forgotPw, setForgotPw] = useState({
        email: '',
        otp: '',
        token: '',
        newPw: '',
        confirmPw: '',
        loading: false,
    });
    const [flag, setFlag] = useState({
        sendOTP: true,
        enterOTP: false,
        resetPw: false,
    });

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await AuthService.login({
                username:username, 
                password:password,
            });
            console.log(response);
            if(response.status == 200){
                const role = response?.data.data.role;
                const accessToken = response?.data.data.accessToken;
                const avatar = response?.data.data.avatar;
                const username = response?.data.data.username;
                const refreshToken = response?.data.data.refreshToken;
                setAuth({ role, accessToken, avatar, username, refreshToken });

                if(!!response?.data.data.role) {
                    if(response?.data.data.role === 'COMPANY'){
                        navigate('/company/home', { replace:true });
                    }
                    if(response?.data.data.role === 'ADMIN'){
                        navigate('/admin/home', { replace:true });
                    }
                    if(response?.data.data.role === 'CANDIDATE') {
                        navigate(-1, { replace: true });
                    }
                }
                setUsername('');
                setPassword('');
                setForgotPw({
                    email: '',
                    otp: '',
                    token: '',
                    newPw: '',
                    confirmPw: '',
                    loading: false,
                });
                setFlag({
                    sendOTP: true,
                    enterOTP: false,
                    resetPw: false,
                });
            }
        } catch(error) {
            if(error?.response.data.message) {
                toast.error(error?.response.data.message);
            }
            else {
                toast.error('Login Failed!!!');
            }
            setPassword('');
            setForgotPw({
                email: '',
                otp: '',
                token: '',
                newPw: '',
                confirmPw: '',
                loading: false,
            });
            setFlag({
                sendOTP: true,
                enterOTP: false,
                resetPw: false,
            });
        }
    }

    const sendOtp = async(e) => {
        e.preventDefault();
        setForgotPw({
            ...forgotPw,
            loading: true,
        });
        
        try {
            const response = await AxiosClient.post('auth/forgot-password', {
                email: forgotPw?.email,
            });
            console.log(response);
            if(response.status == 200) {
                setFlag({
                    sendOTP: false,
                    enterOTP: true,
                    resetPw: false,
                });
            }
        } catch(err) {
            console.log(err)
            setForgotPw({
                email: '',
                otp: '',
                newPw: '',
                confirmPw: '',
                token: '',
            });
        } finally {
            setForgotPw({
                ...forgotPw,
                loading: false,
            });
        }
    }

    const confirmOtp = async(e) => {
        e.preventDefault();

        try {
            const response = await AxiosClient.post('auth/validate-otp', {
                email: forgotPw?.email,
                otp: forgotPw?.otp,
            });
            console.log(response);
            if(response.status == 200){
                setForgotPw({
                    ...forgotPw,
                    email: '',
                    otp: '',
                    token: response?.data.data,
                });
                setFlag({
                    sendOTP: false,
                    enterOTP: false,
                    resetPw: true,
                });
            }
        } catch(err) {
            console.log(err);
            toast.error('You enter wrong OTP! Please try again.');
            setFlag({
                sendOTP: true,
                enterOTP: false,
                resetPw: false,
            });
            setForgotPw({
                email: '',
                otp: '',
                token: '',
                newPw: '',
                confirmPw: '',
            });
        }
    }

    const changePw = async(e) => {
        e.preventDefault();

        try{
            const response = await AxiosClient.post(`auth/reset-password?token=${forgotPw?.token}`, {
                newPassword: forgotPw?.newPw,
            });
            console.log(response);
            if(response.status == 200){
                toast.success('Change Password Successfully! Please login with your account.');
            }
        } catch(err) {
            console.log(err);
            setFlag({
                sendOTP: true,
                enterOTP: false,
                resetPw: false,
            });
            setForgotPw({
                email: '',
                otp: '',
                token: '',
                newPw: '',
                confirmPw: '',
            })
            toast.error('Change Password Failed!')
        }
    }

    const togglePersist = () => {
            setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist]);

    return (
        <React.Fragment>
            <BackgroundImg url='images/login_background.png' content={
                <div className="container entry">
                    <span className="entry__title mb-4">Login</span>
                    <form onSubmit={handleSubmit}>
                        <Textbox 
                            id='usernameMail'
                            type='text'
                            name='username' 
                            placeholder='Enter your Username or Email' 
                            label='Username or Email' 
                            error='Username or Email is required!!!'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <Textbox 
                            id='password' 
                            type='password'
                            name='password' 
                            placeholder='Enter your Password' 
                            label='Password'
                            error='Password is required!!!' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className='d-flex justify-content-between text-center align-items-center'>
                            <div className='persistCheck ml-2 d-flex checkbox-rect'>
                                <input 
                                    type = 'checkbox'
                                    id = 'checkbox-rect1'
                                    onChange = {togglePersist}
                                    checked = {persist}
                                    className='mr-2'
                                    name="check"
                                />
                                <label htmlFor="checkbox-rect1" className="m-0"><b>Remember Me</b></label>
                            </div>
                        </div>
                        <SubmitButton value='Login' className='entry-login__btn'/>
                    </form>
                    <div id='forgot-password__btn'>
                                <ModalView title='Forgot Password ?' variant='' size='lg' btnSize='' btnValue={<b>Forgot Password ?</b>} centered
                                    content={
                                        <>  
                                            {forgotPw?.loading && 
                                                <div className='otp-send__loading d-flex justify-content-center align-items-center'>
                                                    <Spinner animation="border" variant="primary" className="" />
                                                </div>
                                            }
                                            
                                            {flag?.sendOTP &&
                                                <form onSubmit={sendOtp}>
                                                    <Textbox 
                                                        id='email' 
                                                        type='text'
                                                        name='email' 
                                                        error='Email should be valid!'
                                                        label={<b>Please enter your email to receive an OTP!</b>}
                                                        value={forgotPw?.email} 
                                                        pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                                                        onChange={(e) => setForgotPw({ ...forgotPw, email: e.target.value })}
                                                        required
                                                    />
                                                    <div className="w-100 text-right"><button className="btn btn-info mt-3"><b>Send OTP</b></button></div>
                                                </form>
                                            }

                                            {flag?.enterOTP && 
                                                <form onSubmit={confirmOtp}>
                                                    <OtpInput 
                                                        isInputNum 
                                                        separator={<b></b>} 
                                                        numInputs={6}
                                                        value={forgotPw?.otp} 
                                                        onChange={(otp) => setForgotPw({ ...forgotPw, otp: otp})} 
                                                        inputStyle='mx-3 otp-input'
                                                        containerStyle='otp-inputs justify-content-center'
                                                    />
                                                    <div className="w-100 text-center mt-3">
                                                        <b>Your OTP will be expired in 3 minutes</b>
                                                    </div>
                                                    <div className="w-100 text-right"><button className="btn btn-info"><b>Confirm OTP</b></button></div>
                                                </form>
                                            }

                                            {flag?.resetPw &&
                                                <form onSubmit={changePw}>
                                                    <Textbox 
                                                        id='password' 
                                                        type='password'
                                                        name='password' 
                                                        placeholder='Enter your New Password' 
                                                        error='Password should be 5-15 characters and include at least 1 capitalize letter and 1 number!'
                                                        label={<b>Password</b>} 
                                                        pattern='^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{5,15}$'
                                                        value={forgotPw?.newPw}
                                                        onChange={(e) => setForgotPw({ ...forgotPw, newPw: e.target.value })}
                                                        required
                                                    />
                                                    <div className="mt-3"></div>
                                                    <Textbox 
                                                        id='confirmPassword' 
                                                        type='password'
                                                        name='confirmPassword' 
                                                        placeholder='Enter your Password again' 
                                                        error='Password doesn`t match'
                                                        label={<b>Confirm Password</b>} 
                                                        pattern={forgotPw?.newPw}
                                                        value={forgotPw?.confirmPw}
                                                        onChange={(e) => setForgotPw({ ...forgotPw, confirmPw: e.target.value })}
                                                        required
                                                    />
                                                    <div className="w-100 text-right"><button className="btn btn-info mt-3"><b>Change Password</b></button></div>
                                                </form>
                                            }
                                        </>
                                    }
                                />
                            </div>
                    <div className="txt1 w-100 login-signup-display mt-3 text-capitalize">
                        <p className="m-0">Don't have an account ? <Link to='/register' className="btn btn-success text-light"><b>Sign up</b></Link></p>
                    </div>
                </div>
            }/>
        </React.Fragment>
    )
}

export default Login