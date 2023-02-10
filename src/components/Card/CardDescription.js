import React from "react";
import { Col, Row } from "react-bootstrap";

const CardDescription = (props) => {
    const { salary, place, ...inputProps } = props;

    return (
        <Row className='card__description'>
            <Col xs={3} className='mr-1'>{salary}</Col>
            <Col xs={8} className=''>{place}</Col>
        </Row>
    );
}

export default CardDescription