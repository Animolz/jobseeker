import React, { useState } from "react";
import './css/Entry.scss'
import BackgroundImg from '../../components/common/Background/BackgroundImg';
import Textbox from '../../components/form/Textbox';
import SubmitButton from '../../components/form/SubmitButton'
import RadioButton from "../../components/form/RadioButton";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Text from "../../components/form/Text";
import { AxiosClient } from "api/AxiosClient";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState(""); 

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await AxiosClient.post('auth/signup',
            {
                username: username,
                email: email,
                password: password,
                role: role,
            });
            if(response.status == 200){
                toast.success('Sign Up Successfully! Please login to your new account.');
                navigate('/login', { replace: true });
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setRole('');   
            } 
        } catch(err) {
            console.log(err);
            if(err?.response.data.email){
                toast.error(err?.response.data.email)
            }
            if(err?.response.data.username){
                toast.error(err?.response.data.username)
            }
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setRole('');  
        } finally {
            setLoading(false);
        }
    } 

    return (
        <React.Fragment>
            <BackgroundImg url='images/signup_background.png' content={
                    <div className="container entry">
                        {loading && 
                            <div className='otp-send__loading d-flex justify-content-center align-items-center rounded'>
                                <Spinner animation="border" variant="primary" className="" />
                            </div>
                        }
                        <p className="entry__title m-0">Sign Up</p>
                        <p className="mb-4 text-secondary">Please fill in this form to create an account!</p>
                        <form onSubmit={handleSubmit}>
                        <Textbox 
                            id='username' 
                            type='text'
                            name='username' 
                            placeholder='Enter your Username' 
                            error='Username should be 5-15 characters minimum and not contain special character!'
                            label='Username' 
                            pattern='^[A-Za-z0-9]{5,15}$'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <Textbox 
                            id='email' 
                            type='email'
                            name='email' 
                            placeholder='Enter your Email' 
                            error='Email should be valid!'
                            label='Email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Textbox 
                            id='password' 
                            type='password'
                            name='password' 
                            placeholder='Enter your Password' 
                            error='Password should be 5-15 characters include 1 capitalize letter and 1 number!'
                            label='Password' 
                            pattern='^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{5,15}$'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Textbox 
                            id='confirmPassword' 
                            type='password'
                            name='confirmPassword' 
                            placeholder='Enter your Password again' 
                            error='Password does not match'
                            label='Confirm Password' 
                            pattern={password}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Text value='Are you looking for a job or looking for employees?'  className=''/>
                        <div className='d-flex'>
                            <RadioButton id='candidate' name='candidate' label='Candidate' value='CANDIDATE' isSelected={role === 'CANDIDATE'} onChange={(e) => setRole(e.target.value)} />
                            <RadioButton id='company' name='company' label='Company' value='COMPANY' isSelected={role === 'COMPANY'} onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <SubmitButton value='Sign Up' className='entry-signup__btn'/>
                        </form>
                        <div className="txt1 w-100 login-signup-display mt-5 text-capitalize">
                            <p className="m-0">Already have an account ? <Link to='/login' className="btn btn-info text-light"><b>Login here</b></Link></p>
                        </div>
                    </div>
            }/>
        </React.Fragment>
    )
} 

export default Signup