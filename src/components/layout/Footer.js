import React from "react";
import { Col, Row } from "react-bootstrap";
import './css/Footer.scss'
import zalo from '../../assets/zalo.svg'
import facebook from '../../assets/facebook.svg'

const Footer = () => {
    return (
        <div className='footer-container container'>
            <Row>
                <Col className="">
                    <p className="m-0 text-secondary">&copy; 2022 - 2022 <strong className='text-secondary'>Connect-e, We recommend jobs and employees</strong></p>
                </Col>
                <Col className='pt-3 text-right'>
                    <h4><b>Follow Us</b></h4>
                    <ul className='social-media-contact'>
                        <li><a href='https://www.facebook.com/photo/?fbid=1663460687378580&set=a.286665705058092'><img src={facebook} width={27} height={27} /></a></li>
                        <li><a href='https://zalo.me/pc' target='_blank'><img src={zalo} width={30} height={30} /> </a></li>
                    </ul>
                    <h4><b>Follow Us</b></h4>
                    <ul className=''>
                        <li><span><b className='text-secondary'>Tel: 09999999999</b></span></li>
                        <li><span><b className='text-secondary'>Email: nemnguyen69@gmail.com</b></span></li>
                    </ul>
                </Col>
            </Row>
        </div>
    );
}

export default Footer