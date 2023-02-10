import { AxiosClient } from "api/AxiosClient";
import Header from "components/layout/Header";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AvatarInit from "utils/AvatarInit";
import './css/CompanyViewProfile.scss'
import FormatDate from "utils/FormatDate";
import useAuth from "hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import Moment from "react-moment";
import { NoValue } from "components/common/NoValue";

const CompanyViewProfile = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [comment, setComment] = useState('');
    const [cLoading, setCLoading] = useState(false)
    const [comments, setComments] = useState({});
    const [tab, setTab] = useState(0);

    const handleTab = (e) => {
        e.preventDefault();

        if(e.currentTarget.id === 'company-profile__jobs-tab'){
            setTab(0);
        }
        if(e.currentTarget.id === 'company-profile__info-tab'){
            setTab(1);
        }
    }

    const sendComment = async(e) => {
        e.preventDefault();

        try {
            setCLoading(true);
            const response = await axiosPrivate.post('candidate/api/comment/add', {
                companyUserId: id,
                content: comment,
            })
            if(response.status == 200) {
                getComments();
                toast.success('Comment Success!');
            }
        } catch(err) {
            console.log(err);
            toast.error('Comment Failed!');
        } finally {
            setCLoading(false);
        }
    }

    const getCompany = async() => {
        setLoading(true);

        try {
            const response = await AxiosClient.get(`public/api/user/${id}`);
            console.log(response);
            if(response.status == 200) {
                setCompany(response?.data.data);
                setError('');
            }
        } catch(err) {
            console.log(err);
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    }

    const getComments = async() => {
        setLoading(true);

        try {
            const response = await AxiosClient.get(`public/api/comment/${id}`);
            console.log(response);
            if(response.status == 200){
                setComments(response?.data.data.sort((a,b) => b?.createdDate - a?.createdDate));
                
            }
        } catch(err) {
            console.log(err);
            if(err?.response.status == 404){
                toast.warning('There are no comments!')
            }
            if(err?.response.status == 400){
                toast.error('Can not get comments!')
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCompany();
        getComments();
    }, []);

    return (
        <div className="company-profile">
            <Header />
            <div className='hero edit-profile__hero-header'></div>
            <Container>
            {loading && (<>
                <div className="text-center m-5">
                    <Spinner animation="border" variant='info'/>
                    <p className="h4 mt-2">Spinning around to wait for data!</p>
                </div></>
            )}
            
            {!loading && error && (
                <div className="text-center m-5">
                    <i className="fa-solid fa-circle-xmark fa-3x text-danger"></i>
                    <p className="h3 mt-2 text-danger">{error}</p>
                </div>
            )}

            {!loading && !error && company && (
                <>
                <Row className="company-profile__container">
                    <Col xs={4} className='company-profile__user-info'>
                        <div className="border-bottom text-center">
                            <AvatarInit avatar={company?.avatar} name={company?.fullName} size={250} round={true} border='border'/>
                            <div className='h3 mt-2'><b>{company?.company.companyName}</b></div>
                        </div>
                        <div className="border-top border-bottom py-4 px-3">
                            <div className="h5 text--overflow"><i class="fa-solid fa-phone"></i><b className="text-secondary"><NoValue value={company?.company.contactTel} /></b></div>
                            <div className="h5 my-3 text--overflow"><i class="fa-solid fa-envelope"></i><b className="text-secondary"><NoValue value={company?.company.contactEmail} /></b></div>
                            <div className="h5 text--overflow"><i class="fa-solid fa-link"></i>
                                <a href={company?.company.link} target='_blank' className="link--underline-none text-secondary">
                                    <b><NoValue value={company?.company.link} /></b>
                                </a>        
                            </div>
                        </div>
                    </Col>
                    <Col xs={8} className='company-profile__user-detail pl-4 border-left'>
                        <div className="d-flex company-profile__tabs">
                            <button className="btn active" id='company-profile__jobs-tab' onClick={handleTab}><b>Jobs</b></button>
                            <button className="btn" id="company-profile__info-tab" onClick={handleTab}><b>Information</b></button>
                        </div>
                        <div className="mt-3">
                            <label className="h5 ml-2"><b>Introduction</b></label>
                            <div>
                                <i class="fa-solid fa-quote-left fa-2x w-100"></i>
                                <p className="my-0 mx-4 text-secondary"><b>{company?.company.introduction}</b></p>
                                <i class="fa-solid fa-quote-right fa-2x w-100 text-right"></i>
                            </div>
                            <label className="h5 ml-2"><b>Other Infomations</b></label>
                            <ul className="ml-4">
                                <li className="text-secondary"><b>Founded in {FormatDate.fYear(company?.company.foundedYear)}</b></li>
                                <li className='text-secondary'><b>Our company has over {company?.company.companySize} employess</b></li>
                                <li className='text-secondary'><b>Our headquarters is at {company?.company.headquarters} employess</b></li>
                                <li className='text-secondary'><b>Contact us at {company?.company.contactAddress}</b></li>
                            </ul>
                        </div>
                    </Col>
                </Row>

                <div className="mt-5 border p-4 rounded d-flex company-profile-comments__container box-shadow-1">
                    {cLoading && 
                        <div className='otp-send__loading d-flex justify-content-center align-items-center'>
                            <Spinner animation="border" variant="primary" className="" />
                        </div>
                    }
                    <div className="text-center mr-2">
                        <AvatarInit avatar={auth?.avatar} name={auth?.username} size={70} round={true} />
                        <div className="h5 mt-3"><b>{auth?.username}</b></div>
                    </div>
                    <div className="w-100 text-right">
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={5} className='h-auto p-2'/>
                        <div className="mt-2">
                            <button className='btn btn-success' onClick={sendComment}><b>Send</b></button>
                            <button className='btn btn-danger ml-2' onClick={() => setComment('')}><b>Cancel</b></button>
                        </div>
                    </div>
                </div>
                <div className="company-profile-comments__container">
                    {comments?.length && comments?.map(c => 
                        <>
                            <div className="box-shadow-1 my-4 p-3 rounded">
                                <div><b>{c?.content}</b></div>
                                <div className="d-flex align-items-center mt-4 justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <AvatarInit avatar={c?.avatar} name={c?.fullName} size={50} round={true} />
                                        <div className="ml-2 text-secondary"><b>{c?.fullName}</b></div>
                                    </div>
                                    <div className="text-secondary"><b><i class="fa-regular fa-clock mr-2"></i><Moment fromNow>{c?.createdDate}</Moment></b></div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                </>
            )}
            </Container>
        </div>
    );
}

export default CompanyViewProfile