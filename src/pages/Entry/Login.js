import React, { useEffect, useState } from "react";
import './css/Entry.scss'
import BackgroundImg from '../../components/common/Background/BackgroundImg';
import Textbox from '../../components/form/Textbox';
import SubmitButton from '../../components/form/SubmitButton'
import Text from '../../components/form/Text'
import axios from "axios";
import { Link } from "react-router-dom";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/public/api/v1/login',
            {
                username: username,
                password: password,
            });
            console.log('Login successfully!!!');
            setUsername('');
            setPassword('');
        }
        catch(error) {
            console.log('Login Failed!!!');
        }
    }

    return (
        <React.Fragment>
            <BackgroundImg url='images/login_background.png' content={
                <div className="container wrap-entry">
                    <span className="entry-title mb-4">Login</span>
                    <form onSubmit={handleSubmit}>
                        <Textbox 
                            id='usernameMail'
                            type='text'
                            name='username' 
                            placeholder='Enter your Username' 
                            label='Username' 
                            error='Username is required!!!'
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Text value='Forgot Password?' className='text-right'/>
                        <SubmitButton value='Login' className='submit-button'/>
                    </form>
                    <div className="txt1 w-100 login-signup-display mt-5 text-capitalize">
                        <p className="m-0">Don't have an account ? <Link to='/register' className="btn btn-success text-light">Sign up</Link></p>
                    </div>
                </div>
            }/>
        </React.Fragment>
    )
}

export default Login