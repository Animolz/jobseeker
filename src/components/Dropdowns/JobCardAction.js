import React from "react";
import './css/JobCardAction.scss'
import { Accordion, Col, Row } from "react-bootstrap";

export const JobCardAction = () => {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header className="h6 text-right"></Accordion.Header>
                <Accordion.Body className='accordion-action'>
                    <button className="btn btn-light">
                        <Row>
                            <Col xs={3} className='p-0 text-left'></Col>
                            <Col className='p-0 text-left'><span>Save Job</span></Col>
                        </Row>
                    </button>
                    <button className="btn btn-light">
                        <Row>
                            <Col xs={3} className='p-0 text-left'></Col>
                            <Col className='p-0 text-left'><span>Report Job</span></Col>
                        </Row>
                    </button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}