import React, { useState } from "react";
import './css/Entry.scss'
import BackgroundImg from '../../components/common/Background/BackgroundImg';
import Textbox from '../../components/form/Textbox';
import SubmitButton from '../../components/form/SubmitButton'
import RadioButton from "../../components/form/RadioButton";
import axios from "axios";
import { Link } from "react-router-dom";
import Text from "../../components/form/Text";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState(""); 

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/public/api/v1/signup',
            {
                username: username,
                email: email,
                password: password,
                role: role,
            });
            console.log('User Register Successfully!!!')
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setRole('');
        }
        catch(error) {
            console.log('User Register Failed!!!');
        }
    } 

    return (
        <React.Fragment>
            <BackgroundImg url='images/signup_background.png' content={
                <form onSubmit={handleSubmit}>
                    <div className="container wrap-entry">
                        <p className="entry-title m-0">Sign Up</p>
                        <p className="mb-4 text-secondary">Please fill in this form to create an account!</p>
                        <Textbox 
                            id='username' 
                            type='text'
                            name='username' 
                            placeholder='Enter your Username' 
                            error='Username should be 5-15 characters minimum and not contain special character!'
                            label='Username' 
                            pattern='^[A-Za-z0-9]{5,15}$'
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Textbox 
                            id='confirmPassword' 
                            type='password'
                            name='confirmPassword' 
                            placeholder='Enter your Password again' 
                            error='Password doesn`t match'
                            label='Confirm Password' 
                            pattern={password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Text value='Are you looking for a job or looking for employees?'  className=''/>
                        <div className='d-flex'>
                            <RadioButton id='candidate' name='candidate' label='Candidate' value='CANDIDATE' isSelected={role === 'CANDIDATE'} onChange={(e) => setRole(e.target.value)} />
                            <RadioButton id='company' name='company' label='Company' value='COMPANY' isSelected={role === 'COMPANY'} onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <SubmitButton value='Sign Up' className='signup-btn'/>
                        <div className="txt1 w-100 login-signup-display mt-5 text-capitalize">
                            <p className="m-0">Already have an account ? <Link to='/login' className="btn btn-info text-light">Login here</Link></p>
                        </div>
                    </div>
                </form>
            }/>
        </React.Fragment>
    )
} 

export default Signup