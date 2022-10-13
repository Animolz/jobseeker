import React, {useEffect, useState} from 'react';
import './css/EditProfile.scss'
import { Row, Col } from "react-bootstrap";
import Header from "../../../components/layout/Header";
import Textbox from '../../../components/form/Textbox'
import RadioButton from '../../../components/form/RadioButton'
import AvatarEditor from 'react-avatar-editor'
import SubmitButton from '../../../components/form/SubmitButton';
  

const EditProfile = () => {
    var editor = '';
    const [image, setImage] = useState({
        img: null,
        zoom: 1,
        croppedImg: null,
        isDisable: true,
    });
    const [avatar, setAvatar] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState(0);
    const [address, setAddress] = useState('');

    const avatarInit = () => { 
        if(!avatar){
            if(parseInt(gender) === 0){
                setImage({
                    ...image,
                    img: '/images/male_avatar.jpg',
                });
            }else if(parseInt(gender) === 1){
                setImage({
                    ...image,
                    img: '/images/female_avatar.jpg',
                })
            }
        }
        else {
            setImage({
                ...image,
                img: avatar,
            });
        }
    }

    const handleNewImage = async(e) => {
        let imgUrl = URL.createObjectURL(e.target.files[0]);
        await setImage({
            ...image,
            img: imgUrl,
            isDisable: false,
        });
    }

    const changeScale = (e) => {
        setImage({
            ...image,
            zoom: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (setEditorRef) {
            const canvasScaled = editor.getImageScaledToCanvas();
            const croppedImg = canvasScaled.toDataURL();
      
            setImage({
              ...image,
              croppedImg: croppedImg,
            });
          }

        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('dob', birth);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('avatar', image.croppedImg);

        console.log(Object.fromEntries(formData.entries()));
    }

    const setEditorRef = (ed) => {
        editor = ed;
    }

    useEffect(() => {
        avatarInit();
    },[]);

    return (
        <>
            <Header />
            <div className='hero' id='profile-hero'></div>
            <div id='edit-profile-container'>
                <form onSubmit={handleSubmit}>
                    <Row className='p-0 m-0'>
                        <Col xs={4} className='p-5 my-4' id='avatar-selector'>
                            <AvatarEditor
                                ref={setEditorRef}
                                image={image.img}
                                width={250}
                                height={250}
                                border={0}
                                borderRadius={125}
                                color={[255, 255, 255, 0.6]} // RGBA
                                scale={parseInt(image.zoom)}
                                rotate={0}
                                className='rounded bg-secondary mt-5'
                            />
                            <input type="file" name="file-input" id="file-input" className="file-input__input" onChange={handleNewImage}/>
                            <label className="file-input__label d-block w-50 mx-auto" htmlFor="file-input">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="upload"
                                    className="svg-inline--fa fa-upload fa-w-16"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                <path
                                    fill="currentColor"
                                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                ></path>
                                </svg>
                                <span>Upload file</span>
                            </label>
                            <div className='d-flex justify-content-center align-items-center'>
                                <span className='mr-2'><strong>-</strong></span>
                                <input type='range' name='scale' onChange={changeScale} min={1} max={10} step={1} defaultValue={image.zoom} className='slider' disabled={image.isDisable}/>
                                <span className='ml-2'><strong>+</strong></span>
                            </div>
                            <SubmitButton value='Save Profile' className='edit-profile-button btn btn-info'/>
                        </Col>
                        <Col xs={8} className='p-4' id='edit-profile-inputs'>
                            <div className='text-center w-100 h2'><span><strong>Edit your profile</strong></span></div>
                            <Textbox 
                                id='fullname' 
                                type='text'
                                name='fullname' 
                                error='Fullname should be 5-20 characters minimum and not contain special character or number!'
                                label='Fullname' 
                                value={fullname}
                                pattern='^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$'
                                onChange={(e) => setFullname(e.target.value)}
                                required
                            />
                            <Textbox 
                                id='email' 
                                type='email'
                                name='email' 
                                error='Email should be valid!'
                                label='Email'
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Textbox 
                                id='phone' 
                                type='text'
                                name='phone' 
                                error='Phone number should be 10 numbers minimum and not contain character or special character!'
                                label='Phone'
                                value={phone}
                                pattern='^[0-9]{10,}$'
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <Textbox 
                                id='birth' 
                                type='date'
                                name='birth' 
                                error='Date of birth should not be empty!'
                                label='Date of birth' 
                                onChange={(e) => setBirth(e.target.value)}
                                required
                            />
                            <Textbox 
                                id='address' 
                                type='text'
                                name='address' 
                                error='Address should not be empty!'
                                label='Address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <div className='d-flex mt-4 gender-select'>
                                <span className='mr-2'>Gender:</span>
                                <RadioButton id='male' name='gender' label='Male' value={0} isSelected={parseInt(gender) === 0} onChange={(e) => setGender(e.target.value)} />
                                <RadioButton id='female' name='gender' label='Female' value={1} isSelected={parseInt(gender) === 1} onChange={(e) => setGender(e.target.value)} />
                            </div>
                        </Col>
                    </Row>
                </form>
            </div>
            <div className='hero2' id='profile-hero'></div>
        </>
    );
}

export default EditProfile