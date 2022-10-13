import React from "react";
import './css/Card.scss'
import { Row, Col } from 'react-bootstrap'
import UserAvatar from "../common/User/UserAvatar";
import CardInfo from "../Card/CardInfo"
import CardDescription from "../Card/CardDescription"
import Moment from "react-moment";

const Card = (props) => {
    const { url, label, info, salary, place, position, date, ...inputProps } = props;

    return (
        <div className='card mb-2'>
            <Row className='no-gutters'>
                <Col xs={3} className='useravatar p-0' style={{backgroundImage: `url(${url})`}}>
                </Col>
                <Col xs={9} className='p-0'>
                    <div className='card-body'>
                        <CardInfo label={label} info={info} position={position}/>
                        <CardDescription salary={salary} place={place} />
                        <p className='time m-0'>Posted <Moment fromNow>{date}</Moment></p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Card